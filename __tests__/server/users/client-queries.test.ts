import { mockPremiumUser } from '@/__tests__/tests-utils/mocks'
import { API_CONFIG } from '@/lib/api/config'
import { fetcher } from '@/lib/api/fetcher'
import { getUser } from '@/server/user/client-queries'

jest.mock('@/lib/api/fetcher')

const mockFetcher = fetcher as jest.MockedFunction<typeof fetcher>

describe('Users Client Queries', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should fetch and return user data', async () => {
        mockFetcher.mockResolvedValue(mockPremiumUser)

        const result = await getUser()

        expect(mockFetcher).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.USER)
        expect(result).toEqual(mockPremiumUser)
    })

    it('should propagate errors', async () => {
        const error = new Error('Network error')
        mockFetcher.mockRejectedValue(error)

        await expect(getUser()).rejects.toThrow('Network error')
    })
})
