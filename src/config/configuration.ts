import "dotenv/config"
import { z } from "zod"

interface IEnvs {
    DB_URL: string
    API_URL: string
}


const EnvsSchema = z.object({
    DB_URL: z.string(),
    API_URL: z.string()
})

const { success, data, error } = EnvsSchema.safeParse(process.env)

if (error) {
    throw new Error("envs is required")
    process.exit(1)
}


const envs = data as IEnvs

export default () => ({
    uri: envs.DB_URL,
    apiUrl: envs.API_URL
});