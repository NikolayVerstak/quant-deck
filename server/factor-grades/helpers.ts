import type { FactorKey } from '@/lib/constants'
import { FACTOR_ORDER } from '@/lib/constants'
import type {
    FactorGradesNow,
    FactorGrades3M,
    FactorGrades6M,
    FactorGradesPeriod,
    NormalizedFactorGrade,
    FactorGrades,
} from '@/types/factor-grades'

export interface NormalizeFactorGradesParams {
    data: FactorGrades
    period: FactorGradesPeriod
}

export function normalizeFactorGrades({
    data,
    period,
}: NormalizeFactorGradesParams): NormalizedFactorGrade[] {
    switch (period) {
        case 'now':
            const nowData = data as FactorGradesNow
            return FACTOR_ORDER.map(factor => ({
                factor,
                grade: nowData[factor].current,
            }))

        case '3M':
            const threeMData = data as FactorGrades3M
            return FACTOR_ORDER.map(factor => ({
                factor,
                grade: threeMData[factor],
            }))

        case '6M':
            const sixMData = (data as FactorGrades6M).data
            const gradesObj = Object.fromEntries(
                sixMData.map(([k, v]) => [k, v] as const)
            ) as Record<FactorKey, string>

            return FACTOR_ORDER.map(factor => ({
                factor,
                grade: gradesObj[factor],
            }))
    }
}
