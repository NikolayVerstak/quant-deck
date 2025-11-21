export interface Rank {
    rank: number
    total: number
}

export interface Rankings {
    overall: Rank
    sector: Rank
    industry_specific: Rank
}

export interface QuantRanking {
    sector: string
    industry: string
    rankings: Rankings
}
