import KoaRouter from 'koa-router'
import { uploadFile, mergeFile, verifyFile } from './upload'

const router = new KoaRouter()

// upload
router.post('/upload', uploadFile)
router.post('/merge', mergeFile)
router.post('/verify', verifyFile)


export default router