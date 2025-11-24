import {
    mockFactorGrades,
    mockFactorGrades3M,
    mockFactorGrades6M,
    mockFactorGradesNow,
} from '@/__tests__/tests-utils/mocks'
import { API_CONFIG } from '@/lib/api/config'
import { fetcher } from '@/lib/api/fetcher'
import {
    getFactorGradesNow,
    getFactorGrades3M,
    getFactorGrades6M,
    getAllFactorGrades,
} from '@/server/factor-grades/client-queries'
import { normalizeFactorGrades } from '@/server/factor-grades/helpers'

jest.mock('@/lib/api/fetcher')
jest.mock('@/server/factor-grades/helpers')

const mockFetcher = fetcher as jest.MockedFunction<typeof fetcher>
const mockNormalizeFactorGrades = normalizeFactorGrades as jest.MockedFunction<
    typeof normalizeFactorGrades
>

describe('Factor Grades Client Queries', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getFactorGradesNow', () => {
        it('should fetch and return now factor grades', async () => {
            mockFetcher.mockResolvedValue(mockFactorGradesNow)

            const result = await getFactorGradesNow()

            expect(mockFetcher).toHaveBeenCalledWith(
                API_CONFIG.ENDPOINTS.FACTOR_GRADES_NOW
            )
            expect(result).toEqual(mockFactorGradesNow)
        })

        it('should propagate errors', async () => {
            const error = new Error('Network error')
            mockFetcher.mockRejectedValue(error)

            await expect(getFactorGradesNow()).rejects.toThrow('Network error')
        })
    })

    describe('getFactorGrades3M', () => {
        it('should fetch and return 3M factor grades', async () => {
            mockFetcher.mockResolvedValue(mockFactorGrades3M)

            const result = await getFactorGrades3M()

            expect(mockFetcher).toHaveBeenCalledWith(
                API_CONFIG.ENDPOINTS.FACTOR_GRADES_3M
            )
            expect(result).toEqual(mockFactorGrades3M)
        })
    })

    describe('getFactorGrades6M', () => {
        it('should fetch and return 6M factor grades', async () => {
            mockFetcher.mockResolvedValue(mockFactorGrades6M)

            const result = await getFactorGrades6M()

            expect(mockFetcher).toHaveBeenCalledWith(
                API_CONFIG.ENDPOINTS.FACTOR_GRADES_6M
            )
            expect(result).toEqual(mockFactorGrades6M)
        })
    })

    describe('getAllFactorGrades', () => {
        it('should fetch all periods in parallel', async () => {
            mockFetcher
                .mockResolvedValueOnce(mockFactorGradesNow)
                .mockResolvedValueOnce(mockFactorGrades3M)
                .mockResolvedValueOnce(mockFactorGrades6M)

            mockNormalizeFactorGrades
                .mockReturnValueOnce(mockFactorGrades.now)
                .mockReturnValueOnce(mockFactorGrades.threeMonthsAgo)
                .mockReturnValueOnce(mockFactorGrades.sixMonthsAgo)

            const result = await getAllFactorGrades()

            expect(mockFetcher).toHaveBeenCalledTimes(3)
            expect(mockFetcher).toHaveBeenNthCalledWith(
                1,
                API_CONFIG.ENDPOINTS.FACTOR_GRADES_NOW
            )
            expect(mockFetcher).toHaveBeenNthCalledWith(
                2,
                API_CONFIG.ENDPOINTS.FACTOR_GRADES_3M
            )
            expect(mockFetcher).toHaveBeenNthCalledWith(
                3,
                API_CONFIG.ENDPOINTS.FACTOR_GRADES_6M
            )

            expect(mockNormalizeFactorGrades).toHaveBeenCalledTimes(3)
            expect(mockNormalizeFactorGrades).toHaveBeenNthCalledWith(1, {
                data: mockFactorGradesNow,
                period: 'now',
            })
            expect(mockNormalizeFactorGrades).toHaveBeenNthCalledWith(2, {
                data: mockFactorGrades3M,
                period: '3M',
            })
            expect(mockNormalizeFactorGrades).toHaveBeenNthCalledWith(3, {
                data: mockFactorGrades6M,
                period: '6M',
            })

            expect(result).toEqual({
                now: mockFactorGrades.now,
                threeMonthsAgo: mockFactorGrades.threeMonthsAgo,
                sixMonthsAgo: mockFactorGrades.sixMonthsAgo,
            })
        })

        it('should handle one endpoint failing', async () => {
            mockFetcher
                .mockResolvedValueOnce(mockFactorGradesNow)
                .mockRejectedValueOnce(new Error('3M endpoint failed'))
                .mockResolvedValueOnce({ data: [] })

            await expect(getAllFactorGrades()).rejects.toThrow('3M endpoint failed')
        })
    })
})
