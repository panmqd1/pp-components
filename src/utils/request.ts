/**
 * 按照数量并发请求，返回所有请求的响应
 * @param urls 请求地址数组
 * @param maxNum 请求并发数
 * @returns 请求返回
 */
export function concurrentRequest(urls: string[], maxNum: number) {
  // 常规判空
  if (!urls?.length) {
    return Promise.resolve([])
  }
  return new Promise((resolve) => {
    // 所有请求的返回
    const responses: Response[] = []
    // 发起请求的索引
    let requestIndex = 0
    // 完成请求的数量
    let finishCount = 0
    // 单个请求的函数
    async function singleRequest() {
      if (requestIndex >= urls.length) {
        return
      }
      const i = requestIndex
      const url = urls[requestIndex++]
      const res = await fetch(url)
      responses[i] = res
      finishCount++
      if (finishCount === urls.length) {
        resolve(responses)
        return
      }
      // 发送下一请求
      singleRequest()
    }
    // maxNum并发数量
    for (let index = 0; index < Math.min(maxNum, urls.length); index++) {
      singleRequest()
    }
  })
}
