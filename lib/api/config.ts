import { env } from '../env'

export const API_CONFIG = {
    BASE_URL: env.API_BASE_URL,
    ENDPOINTS: {
        USER: '/user',
        RATINGS_SUMMARY: '/ratings-summary',
        FACTOR_GRADES_NOW: '/factor-grades/now',
        FACTOR_GRADES_3M: '/factor-grades/3m',
        FACTOR_GRADES_6M: '/factor-grades/6m',
        QUANT_RANKING: '/quant-ranking',
    },
} as const
