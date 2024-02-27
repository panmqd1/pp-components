import  "/src/plugins/spark-md5.min.js";
import { createChunk } from "/src/utils/file.ts";

onmessage = async (e) => {
  const { file, startIndex, endIndex, chunkSize } = e.data;

  const chunks = [];

  for (let i = startIndex; i < endIndex; i++) {
    chunks.push(await createChunk(file, i, chunkSize));
  }

  self.postMessage(chunks);
};

export default self;
