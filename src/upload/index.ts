import fs from 'node:fs'
import path from 'node:path'

// 临时文件目录，用于存储上传的文件
export const UPLOAD_TEMP_DIR = path.resolve(__dirname, '../../temp')
export const UPLOAD_TARGET_DIR = path.resolve(__dirname, '../../target')

// 创建临时文件夹
export const createUploadDir = (hash: string) => {
  const dir = path.resolve(UPLOAD_TEMP_DIR, hash)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
}

// 创建目标文件夹
export const createTargetDir = () => {
  const dir = path.resolve(__dirname, '../../target')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
}

// 合并切片
export const mergeChunks = async (fileHash: string, fileName: string) => {
  const targetPath = createTargetDir()
  const cachePath = createUploadDir(fileHash)
  const ext = path.extname(fileName)

  const files = fs.readdirSync(cachePath)
  // 切片排序
  files.sort((a, b) => Number(a.split('-').slice(-1)) - Number(b.split('-').slice(-1)))

  // 创建可写流，目标文件不存在时创建
  const writeStream = fs.createWriteStream(`${targetPath}/${fileHash}${ext}`)

  // 保证切片合并顺序
  const writeChunk = async (file: string) => {
    return new Promise((resolve, reject) => {
      const chunkPath = `${cachePath}/${file}`
      const readStream = fs.createReadStream(chunkPath)

      readStream.on('data', (chunk) => {
        writeStream.write(chunk)
      })

      readStream.on('end', () => {
        resolve('success')
        console.log(`chunk ${file} write finish`)
      })

      readStream.on('error', (err) => {
        console.error('readStream error:', err)
        writeStream.close()
        reject(err)
      })
    })
  }

  // 监听错误
  writeStream.on('error', (err) => {
    console.error('writeStream error:', err)
    writeStream.close()
  })

  // 监听写入完成
  writeStream.on('finish', () => {
    console.log('writeStream finish')
    // fs.rm(cachePath, { recursive: true }, err => console.log('delete temp dir error:', err))
  })

  for (const file of files) {
    await writeChunk(file)
  }

  // 关闭可写流
  writeStream.close()
}

export { UploadChunk, successUpload, failUpload, verifyUpload } from './data'

