import { API_CONFIG } from '@/lib/api/config'
import { fetcher } from '@/lib/api/fetcher'
import type { QuantRanking } from '@/types/quant-ranking'

export async function getQuantRanking(): Promise<QuantRanking> {
    return fetcher<QuantRanking>(API_CONFIG.ENDPOINTS.QUANT_RANKING)
}
