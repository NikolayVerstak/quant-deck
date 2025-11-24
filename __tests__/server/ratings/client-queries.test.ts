import { mockRatingsSummary } from '@/__tests__/tests-utils/mocks'
import { API_CONFIG } from '@/lib/api/config'
import { fetcher } from '@/lib/api/fetcher'
import { getRatingsSummary } from '@/server/ratings/client-queries'

jest.mock('@/lib/api/fetcher')

const mockFetcher = fetcher as jest.MockedFunction<typeof fetcher>

describe('Ratings Client Queries', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should fetch and return ratings summary data', async () => {
        mockFetcher.mockResolvedValue(mockRatingsSummary)

        const result = await getRatingsSummary()

        expect(mockFetcher).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.RATINGS_SUMMARY)
        expect(result).toEqual(mockRatingsSummary)
    })

    it('should propagate errors', async () => {
        const error = new Error('Network error')
        mockFetcher.mockRejectedValue(error)

        await expect(getRatingsSummary()).rejects.toThrow('Network error')
    })
})
