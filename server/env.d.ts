import { string, number } from "zod"
import { Secret } from "jsonwebtoken"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number

      PGDATABASE: string
      PGUSER: string
      PGPASSWORD: string
      PGPORT: number
      PGHOST: string

      ACCESS_TOKEN_SECRET: Secret;
      REFRESH_TOKEN_SECRET: Secret;
    }
  }
}

export { }