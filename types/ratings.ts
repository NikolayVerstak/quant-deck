export interface Rating {
    rating: string
    score: number
}

export interface RatingsSummary {
    SA_Analysts: Rating
    Wall_Street: Rating
    Quant: Rating
}
