export type ErrorMsg = {
  /** 错误状态码 0表示成功 */
  dhy_error_code: 0 | 40001
  /** 错误信息：ok 表示成功 */
  dhy_error_msg: "ok" | string
}


export const RErrorMsg = function (state: boolean, msg: string): ErrorMsg {
  return {
    "dhy_error_code": state ? 0 : 40001,
    "dhy_error_msg": state ? "ok" : msg
  }
}


export const middlewareError = async (ctx: any, next: any) => {
  try {
    await next()
  }
  catch (err: any) {
    console.error(err)
    ctx.response.status = 400
    ctx.response.body = RErrorMsg(false, err.message)
  }
}