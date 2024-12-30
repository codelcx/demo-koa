import Koa from 'koa'
import Cors from '@koa/cors'
import koaBody from 'koa-body'
// import bodyParser from 'koa-bodyparser'
import router from './router'
import { port } from './config'
import { logger } from './logger'
// import { middlewareLog } from './middleware/logger'
import { middlewareError } from './middleware/error'

const app = new Koa()


// middleware
app.use(middlewareError)
app.use(Cors({ origin: '*' }))
// app.use(bodyParser()) 
app.use(koaBody({
  multipart: true,
  json: true,
  formidable: {
    multiples: true,
  }
}))

// app.use(middlewareLog)
app.use(router.routes())


// error handle
app.on('error', async (err: any, ctx: any) => {
  console.error(err)
  logger.error(`uncaught error:${err}`)
  ctx.status = 500
})

// listen
app.listen(port, () => {
  console.info(`Server is running on ${port} port`)
})