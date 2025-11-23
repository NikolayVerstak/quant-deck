import type { FactorKey } from '@/lib/constants'

export type FactorGradesNow = {
    [key in FactorKey]: { current: string }
}

export type FactorGrades3M = {
    [key in FactorKey]: string
}

export interface FactorGrades6M {
    data: Array<[FactorKey, string]>
}

export type FactorGradesPeriod = 'now' | '3M' | '6M'

export type FactorGrades = FactorGradesNow | FactorGrades3M | FactorGrades6M

export interface NormalizedFactorGrade {
    factor: FactorKey
    grade: string
}

export interface AllFactorGrades {
    now: NormalizedFactorGrade[]
    threeMonthsAgo: NormalizedFactorGrade[]
    sixMonthsAgo: NormalizedFactorGrade[]
}

export interface GroupedFactorGrade {
    factor: FactorKey
    now: string
    threeMonthsAgo: string
    sixMonthsAgo: string
}
