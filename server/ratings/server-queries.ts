import { API_CONFIG } from '@/lib/api/config'
import { fetcher } from '@/lib/api/fetcher'
import type { RatingsSummary } from '@/types/ratings'

export async function getRatingsSummary(): Promise<RatingsSummary> {
    return fetcher<RatingsSummary>(API_CONFIG.ENDPOINTS.RATINGS_SUMMARY)
}
