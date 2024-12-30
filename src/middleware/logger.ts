import { logger } from '../logger'


export const middlewareLog = async (ctx: any, next: any) => {
  const start = new Date().getTime();
  const method = ctx.method;
  const url = ctx.url;
  const contentType = ctx.get('content-type');
  logger.info(`请求开始: ${method} ${url} (${contentType})`);
  // Log the request body
  const body = ctx.request.body;
  const bodyType = typeof body;
  if (typeof body !== 'string') {
    logger.info(`接受请求参数(${bodyType}): \n ${JSON.stringify(body, null, 2)}`);
  } else {
    logger.info(`接受请求参数(${bodyType}): \n ${ctx.request.body}`);
  }

  // Call the next middleware
  await next();
  const ms = new Date().getTime() - start;
  // Log the request time and status
  logger.info(`请求完成: \n ${JSON.stringify(ctx.body)}(${ctx.status})${ms}ms`); };
