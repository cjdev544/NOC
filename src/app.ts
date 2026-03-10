import { MongoDB } from './data/mongo/index'
import { envs } from './plugins/envs.plugin'
import { Server } from './presentation/server'
;(async () => {
  main()
})()

async function main() {
  await MongoDB.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  })
  // Server.start()
}
