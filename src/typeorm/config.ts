import "reflect-metadata"
import { DataSource } from 'typeorm'
import { SJHC } from './entity/SJHC'
import { DBCONFIG } from "../config"
import { logger } from "../logger"

const THICKMODE = DBCONFIG.ORACLECLIENTLIBDIR ? { 'libDir': DBCONFIG.ORACLECLIENTLIBDIR } : false


export const Source = new DataSource({
  type: "oracle",
  username: DBCONFIG.USERNAME,
  password: DBCONFIG.PASSWORD,
  extra: {
    connectString: DBCONFIG.CONNECTIONSTRING,
  },
  thickMode: THICKMODE,
  logging: false,
  entities: [SJHC],
})

export const AppDataSource = Source.initialize()
  .then(() => logger.info("Data Source has been initialized"))
  .catch((err) => { 
    logger.error("Error during Data Source initialization", err) 
    console.error("Error during Data Source initialization", err) 
  })