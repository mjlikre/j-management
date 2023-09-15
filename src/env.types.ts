export interface IEnv {
  SECRET_KEY: string
  /* General ENV */
  PROJECT_NAME: string
  /* Database ENV */
  DB_PORT: number
  DB_AUTH: string
  DB: string
  DB_HOST: string
  DATABASE_URL: string
}
