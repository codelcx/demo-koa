// 切片类型
export type UploadChunk = {
  /**  文件hash */
  fileHash: string
  /**  文件大小 kb */
  fileSize: number
  /**  文件名 */
  fileName: string
  /**  文件切片 */
  chunkFile: Blob
  /**  文件切片索引 */
  chunkIndex: number
  /**  文件切片hash：fileHash-chunkIndex */
  chunkHash: string
  /**  文件切片个数 */
  chunkNum: number
  /**  文件切片大小 */
  chunkSize: number
  /**  是否已上传 */
  finish: boolean
  /** 取消请求 */
  cancel: Function | null
}

// 响应数据格式
interface UploadResponse {
  data?: any
  message: string
  code: -1 | 0// 0: 成功，-1: 失败
}

interface verifyUpload extends UploadResponse {
  data: {
    needUpload: boolean
    uploadedList: string[]
  }
}

export const successUpload: UploadResponse = {
  code: 0,
  message: 'success',
}

export const failUpload: UploadResponse = {
  code: -1,
  message: 'error',
}


export const verifyUpload: verifyUpload = {
  code: 0,
  message: 'success',
  data: {
    needUpload: true,
    uploadedList: [],
  }
}