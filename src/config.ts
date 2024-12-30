import dotenv from 'dotenv'
import path from 'path'

// env
dotenv.config()
dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true })

// port
export const port = process.env.SERVER_API_TARGET_PORT || 3000

// db
const DB_USERNAME = process.env.DB_USERNAME || 'dhy_sjhc'
const DB_PASSWORD = process.env.DB_PASSWORD || 'dhy_sjhc'
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '192.168.1.194:1521/ORCLPDB1'
const ORACLE_CLIENT_LIBDIR = process.env.ORACLE_CLIENT_LIBDIR

export const DBCONFIG = {
  USERNAME: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  CONNECTIONSTRING: DB_CONNECTION_STRING,
  ORACLECLIENTLIBDIR: ORACLE_CLIENT_LIBDIR
}
