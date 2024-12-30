import fs from 'node:fs'
import path from 'node:path'
import type { ParameterizedContext } from 'koa'
import {
  createUploadDir, mergeChunks,
  UPLOAD_TEMP_DIR, UPLOAD_TARGET_DIR,
  successUpload, failUpload, verifyUpload, type UploadChunk
} from '../upload'


// 文件上传
export const uploadFile = async (ctx: ParameterizedContext) => {
  try {
    const data = ctx.request.body as UploadChunk
    const files = ctx.request.files?.chunkFile
    if (!data) return ctx.response.body = failUpload

    // 临时目录
    const { fileHash, chunkHash } = data
    const cachePath = createUploadDir(fileHash)

    // 二进制文件切片
    const chunkFile = Array.isArray(files) ? files[0] : files
    if (!chunkFile) return ctx.response.body = failUpload

    // 保存文件
    const content = fs.readFileSync(chunkFile.filepath)
    fs.writeFileSync(`${cachePath}/${chunkHash}`, content)

    ctx.response.body = successUpload
  }

  catch (err) {
    console.error('upload err:', err)
    ctx.response.body = failUpload
  }
}

// 文件合并
export const mergeFile = async (ctx: ParameterizedContext) => {
  try {
    const data = ctx.request.body as UploadChunk
    const { fileHash, fileName } = data

    await mergeChunks(fileHash, fileName)
    ctx.response.body = successUpload
  }

  catch (err) {
    console.error('merge err:', err)
    ctx.response.body = failUpload
  }
}

// 文件校验
export const verifyFile = async (ctx: ParameterizedContext) => {
  try {
    const data = ctx.request.body as UploadChunk
    const { fileHash, fileName } = data

    const ext = path.extname(fileName)
    const targetPath = path.join(UPLOAD_TARGET_DIR, `${fileHash}${ext}`)

    if (!fs.existsSync(targetPath)) {
      const cachePath = path.join(UPLOAD_TEMP_DIR, fileHash)
      const files = fs.existsSync(cachePath) ? fs.readdirSync(cachePath) : []
      const result = { needUpload: true, uploadChunkList: files }
      return ctx.response.body = Object.assign(verifyUpload, { data: result })
    }
    else {
      const result = { needUpload: false, uploadChunkList: [] }
      return ctx.response.body = Object.assign(verifyUpload, { data: result })
    }
  }
  catch (err) {
    console.error('verify err:', err)
    return ctx.response.body = verifyUpload
  }
}