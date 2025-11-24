import { mockQuantRanking } from '@/__tests__/tests-utils/mocks'
import { API_CONFIG } from '@/lib/api/config'
import { fetcher } from '@/lib/api/fetcher'
import { getQuantRanking } from '@/server/quant-ranking/client-queries'

jest.mock('@/lib/api/fetcher')

const mockFetcher = fetcher as jest.MockedFunction<typeof fetcher>

describe('Factor Grades Client Queries', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should fetch and return quant ranking data', async () => {
        mockFetcher.mockResolvedValue(mockQuantRanking)

        const result = await getQuantRanking()

        expect(mockFetcher).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.QUANT_RANKING)
        expect(result).toEqual(mockQuantRanking)
    })

    it('should propagate errors', async () => {
        const error = new Error('Network error')
        mockFetcher.mockRejectedValue(error)

        await expect(getQuantRanking()).rejects.toThrow('Network error')
    })
})
