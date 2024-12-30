import { AppDataSource, Source } from '../config'
import { SJHC } from '../entity/SJHC'
import { SJHCDATA } from '../types/SJHC'

export const createSJHC = async (data: SJHCDATA) => {
  return AppDataSource.then(async () => {
    const result = await Source.query("SELECT SEQ_DHY_SJHC.NEXTVAL FROM DUAL")
    const jlxh = result[0].NEXTVAL

    const sjhc = new SJHC()
    Object.assign(sjhc, data, { jlxh, jlsj: new Date() })

    const sjhcRepository = Source.getRepository(SJHC)
    await sjhcRepository.save(sjhc)
    console.log('data insert success')
    return [true, null] as const
  })
    .catch((error) => {
      console.log('data insert error', error)
      return [false, error] as const
    })
}


export const findSJHC = async () => {
  return AppDataSource.then(async () => {
    const sjhcRepository = Source.getRepository(SJHC)
    const data = await sjhcRepository.find()
    return data
  }).catch((error) => console.log(error))
}