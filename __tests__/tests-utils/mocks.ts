import type {
    AllFactorGrades,
    FactorGrades3M,
    FactorGrades6M,
    FactorGradesNow,
} from '@/types/factor-grades'
import type { QuantRanking } from '@/types/quant-ranking'
import type { RatingsSummary } from '@/types/ratings'

export const mockPremiumUser = { premium: true }
export const mockNonPremiumUser = { premium: false }

export const mockQuantRanking = {
    sector: 'Information Technology',
    industry: 'Technology Hardware, Storage and Peripherals',
    rankings: {
        overall: { rank: 50, total: 1000 },
        sector: { rank: 10, total: 200 },
        industry_specific: { rank: 5, total: 50 },
    },
} as QuantRanking

export const mockRatingsSummary = {
    SA_Analysts: { rating: 'buy', score: 4 },
    Wall_Street: { rating: 'hold', score: 3.2 },
    Quant: { rating: 'buy', score: 4.8 },
} as RatingsSummary

export const mockFactorGradesNow = {
    Valuation: { current: 'A+' },
    Growth: { current: 'B' },
    Profitability: { current: 'A' },
    Momentum: { current: 'C' },
    Revisions: { current: 'B+' },
} as FactorGradesNow

export const mockFactorGrades3M = {
    Valuation: 'A',
    Growth: 'B-',
    Profitability: 'A-',
    Momentum: 'C+',
    Revisions: 'B',
} as FactorGrades3M

export const mockFactorGrades6M = {
    data: [
        ['Valuation', 'B+'],
        ['Growth', 'C'],
        ['Profitability', 'B+'],
        ['Momentum', 'C'],
        ['Revisions', 'B-'],
    ],
} as FactorGrades6M

export const mockFactorGrades = {
    now: [
        { factor: 'Valuation', grade: 'A+' },
        { factor: 'Growth', grade: 'B' },
        { factor: 'Profitability', grade: 'A' },
        { factor: 'Momentum', grade: 'C' },
        { factor: 'Revisions', grade: 'B+' },
    ],
    threeMonthsAgo: [
        { factor: 'Valuation', grade: 'A' },
        { factor: 'Growth', grade: 'B-' },
        { factor: 'Profitability', grade: 'A-' },
        { factor: 'Momentum', grade: 'C+' },
        { factor: 'Revisions', grade: 'B' },
    ],
    sixMonthsAgo: [
        { factor: 'Valuation', grade: 'B+' },
        { factor: 'Growth', grade: 'C' },
        { factor: 'Profitability', grade: 'B+' },
        { factor: 'Momentum', grade: 'C' },
        { factor: 'Revisions', grade: 'B-' },
    ],
} as AllFactorGrades
