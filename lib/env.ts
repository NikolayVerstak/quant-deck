import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
import 'dotenv/config'

export const env = createEnv({
    server: {
        API_BASE_URL: z.string(),
    },
    runtimeEnv: {
        API_BASE_URL: process.env.API_URL,
    },
})
