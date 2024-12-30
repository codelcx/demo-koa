
enum PreStatus {
  审核 = 20,
  调剂 = 30,
  复核 = 40,
  泡药 = 50,
  煎药 = 60,
  沉淀 = 62,
  浓缩 = 64,
  领料 = 66,
  收膏 = 68,
  包装 = 70,
  凉膏 = 72,
  发货 = 80,
}

export type PreStatusValue = `${PreStatus}`
export type PreStatusKey = keyof typeof PreStatus


export type SJHCDATA = {
  /** 处方号 */
  prenum: string
  /** 医院名称 */
  hospitalname: string
  /** 状态 */
  prestatus: PreStatusKey
  /** 处方状态 */
  prestatusnum: PreStatusValue
  /** 开始时间 yyy-MM-dd HH:mm:ss */
  operatestarttime: string
  /** 结束时间 yyy-MM-dd HH:mm:ss */
  operateendtime: string
  /** 操作人 */
  operatorname: string
  /** 药包数量 */
  packagecount: string
  /** 复核图片数量 */
  imagecount: string
  /** 复核图片地址 */
  imageurl: string
  /** 备注 */
  remark: string
  /** 快递单号 */
  expressno: string
  /** 快递公司 */
  expresscompany: string
  /** 煎药机ID */
  machineid: string
  /** 煎药机名称 */
  machinename: string
  /** 医院处方号 */
  hospitalpspnum: string
  /** 处方类型 0门诊 1住院 */
  ptype: number
  /** 条码内容 */
  barcode: string
}