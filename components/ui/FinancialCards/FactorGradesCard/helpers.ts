import { FACTOR_ORDER } from '@/lib/constants'
import type { AllFactorGrades, GroupedFactorGrade } from '@/types/factor-grades'

export function groupFactorGrades(data: AllFactorGrades): GroupedFactorGrade[] {
    const nowMap = Object.fromEntries(data.now.map(item => [item.factor, item.grade]))

    const threeMMap = Object.fromEntries(
        data.threeMonthsAgo.map(item => [item.factor, item.grade])
    )

    const sixMMap = Object.fromEntries(
        data.sixMonthsAgo.map(item => [item.factor, item.grade])
    )

    return FACTOR_ORDER.map(factor => ({
        factor,
        now: nowMap[factor] ?? '-',
        threeMonthsAgo: threeMMap[factor] ?? '-',
        sixMonthsAgo: sixMMap[factor] ?? '-',
    }))
}
