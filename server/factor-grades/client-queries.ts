'use server'

import { normalizeFactorGrades } from './helpers'

import { API_CONFIG } from '@/lib/api/config'
import { fetcher } from '@/lib/api/fetcher'
import type {
    AllFactorGrades,
    FactorGrades3M,
    FactorGrades6M,
    FactorGradesNow,
} from '@/types/factor-grades'

export async function getFactorGradesNow(): Promise<FactorGradesNow> {
    return fetcher<FactorGradesNow>(API_CONFIG.ENDPOINTS.FACTOR_GRADES_NOW)
}

export async function getFactorGrades3M(): Promise<FactorGrades3M> {
    return fetcher<FactorGrades3M>(API_CONFIG.ENDPOINTS.FACTOR_GRADES_3M)
}

export async function getFactorGrades6M(): Promise<FactorGrades6M> {
    return fetcher<FactorGrades6M>(API_CONFIG.ENDPOINTS.FACTOR_GRADES_6M)
}

export async function getAllFactorGrades(): Promise<AllFactorGrades> {
    const [now, threeMonthsAgo, sixMonthsAgo] = await Promise.all([
        getFactorGradesNow(),
        getFactorGrades3M(),
        getFactorGrades6M(),
    ])

    return {
        now: normalizeFactorGrades({ data: now, period: 'now' }),
        threeMonthsAgo: normalizeFactorGrades({ data: threeMonthsAgo, period: '3M' }),
        sixMonthsAgo: normalizeFactorGrades({ data: sixMonthsAgo, period: '6M' }),
    }
}
