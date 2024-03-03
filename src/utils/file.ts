import { createWorker } from "./worker";

export type SplitOptionsType = {
  // 是否开启大文件分片
  enable: boolean;
  // 每一个分片的大小，值为 0 时无效，优先级高于 chunkCount
  chunkSize?: number;
  // 一共分几片，值为 0 时无效
  chunkCount?: number;
};

export type ChunkType = {
  index: number;
  startBit: number;
  endBit: number;
  blob: Blob;
  hash: number;
};

// NOTE 仅作为参考，worker不调用此方法
// 创建单一分片
export const createChunk = (
  file: File,
  index: number,
  chunkSize: number
): Promise<ChunkType> => {
  return new Promise((resolve) => {
    const startBit = index * chunkSize;
    const endBit = (index + 1) * chunkSize;
    const blob = file.slice(startBit, endBit);

    // @ts-ignore
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      spark.append(e.target?.result);
      resolve({
        index,
        startBit,
        endBit,
        blob,
        hash: spark.end(),
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
};

export const cutFile = (
  file: File,
  options: SplitOptionsType
): Promise<ChunkType[]> => {
  return new Promise(async (resolve) => {
    if (!file) {
      resolve([]);
    }

    let _chunkSize = 0;
    let _chunkCount = 0;

    const { chunkSize = 0, chunkCount = 0 } = options;

    // chunkSize 有效，chunkCount 无效
    if (chunkSize > 0 && chunkCount <= 0) {
      _chunkSize = chunkSize;
      _chunkCount = Math.ceil(file.size / _chunkSize);
    }
    // chunkCount 有效，chunkSize 无效
    else if (chunkSize <= 0 && chunkCount > 0) {
      _chunkCount = chunkCount;
      _chunkSize = Math.ceil(file.size / _chunkCount);
    }
    // chunkCount 无效，chunkSize 无效
    else {
      _chunkSize = 20 * 1024 * 1024;
      _chunkCount = Math.ceil(file.size / _chunkSize);
    }

    const chunks: ChunkType[] = [];

    // 启用的worker线程数量
    const DEFAULT_THREAD_COUNT = navigator.hardwareConcurrency || 4;
    const THREAD_COUNT =
      DEFAULT_THREAD_COUNT > _chunkCount ? _chunkCount : DEFAULT_THREAD_COUNT;
    // 每个线程处理多少个切片，切片数 / 线程数
    const threadChunkCount = Math.ceil(_chunkCount / THREAD_COUNT);

    // 当前是第几线程
    let threadIndex = 0;
    // 剩余的任务数
    let remaining = _chunkCount;
    // 已完成任务的线程数
    let terminatedThreadCount = 0;
    // 开启worker线程处理
    while (remaining > 0) {
      // 内联worker，无法import，因此需要 type = classic ，使用 importScripts
      // worker无法传递方法，所以需要把方法都定义在内联里面
      const worker = createWorker(() => {
        // @ts-ignore
        importScripts(
          `https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.2/spark-md5.min.js`
        );

        // @ts-ignore
        const createChunk = (file, index, chunkSize) => {
          return new Promise((resolve) => {
            const startBit = index * chunkSize;
            const endBit =
              (index + 1) * chunkSize > file.size
                ? file.size
                : (index + 1) * chunkSize;
            const blob = file.slice(startBit, endBit);

            // @ts-ignore
            const spark = new SparkMD5.ArrayBuffer();
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
              spark.append(e.target?.result);
              resolve({
                index,
                startBit,
                endBit,
                blob,
                hash: spark.end(),
              });
            };
            fileReader.readAsArrayBuffer(blob);
          });
        };

        onmessage = async (e) => {
          const { file, startIndex, endIndex, chunkSize } = e.data;
          const chunks = [];

          for (let i = startIndex; i < endIndex; i++) {
            chunks.push(await createChunk(file, i, chunkSize));
          }

          self.postMessage(chunks);
        };
      });

      // 当前线程需要处理的分片索引范围
      const startIndex = threadIndex * threadChunkCount;
      // 最后一个线程需要处理的切片可能不足 threadChunkCount 个
      const endIndex =
        (threadIndex + 1) * threadChunkCount > _chunkCount
          ? _chunkCount
          : (threadIndex + 1) * threadChunkCount;

      worker.postMessage({
        file,
        startIndex,
        endIndex,
        chunkSize: _chunkSize,
      });

      worker.onmessage = (e) => {
        const threadChunks: ChunkType[] = e.data || [];
        for (let i = 0; i < threadChunks.length; i++) {
          const chunk: ChunkType = threadChunks[i];
          chunks[chunk.index] = chunk;
        }

        // 结束线程
        worker.terminate();

        // 关闭线程数++
        terminatedThreadCount++;

        // 当关闭线程数 === threadIndex 时，所有切片完成，resolve()
        if (terminatedThreadCount === threadIndex) {
          resolve(chunks);
        }
      };

      threadIndex++;
      remaining -= threadChunkCount;
    }
  });
};

// 获取文件后缀名
export const getFileSuffix = (fileName: string): string => {
  const nameArr = fileName?.split(".");
  return "." + nameArr[nameArr.length - 1];
};
