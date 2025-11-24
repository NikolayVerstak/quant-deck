import {
    mockFactorGrades3M,
    mockFactorGrades6M,
    mockFactorGradesNow,
} from '@/__tests__/tests-utils/mocks'
import { FACTOR_ORDER } from '@/lib/constants'
import { normalizeFactorGrades } from '@/server/factor-grades/helpers'

describe('normalizeFactorGrades', () => {
    it('should return normalized array with factor and grade for "now" period', () => {
        const result = normalizeFactorGrades({ data: mockFactorGradesNow, period: 'now' })

        expect(result).toHaveLength(FACTOR_ORDER.length)
        expect(result.map(r => r.factor)).toEqual(FACTOR_ORDER)
        result.forEach(item => expect(item).toHaveProperty('grade'))
    })

    it('should return normalized array with factor and grade for "3M" period', () => {
        const result = normalizeFactorGrades({ data: mockFactorGrades3M, period: '3M' })

        expect(result).toHaveLength(FACTOR_ORDER.length)
        expect(result.map(r => r.factor)).toEqual(FACTOR_ORDER)
        result.forEach(item => expect(item).toHaveProperty('grade'))
    })

    it('should return normalized array with factor and grade for "6M" period', () => {
        const result = normalizeFactorGrades({ data: mockFactorGrades6M, period: '6M' })

        expect(result).toHaveLength(FACTOR_ORDER.length)
        expect(result.map(r => r.factor)).toEqual(FACTOR_ORDER)
        result.forEach(item => expect(item).toHaveProperty('grade'))
    })
})
