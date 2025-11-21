export const FACTOR_ORDER = [
    'Valuation',
    'Growth',
    'Profitability',
    'Momentum',
    'Revisions',
] as const

export type FactorKey = (typeof FACTOR_ORDER)[number]
