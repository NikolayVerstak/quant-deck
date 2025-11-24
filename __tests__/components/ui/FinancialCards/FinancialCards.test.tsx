import { screen, waitFor } from '@testing-library/react'

import {
    mockPremiumUser,
    mockNonPremiumUser,
    mockQuantRanking,
    mockRatingsSummary,
    mockFactorGrades,
} from '@/__tests__/tests-utils/mocks'
import { renderWithQueryClient } from '@/__tests__/tests-utils/renderWithClient'
import { FinancialCards } from '@/components/ui/FinancialCards'
import { getAllFactorGrades } from '@/server/factor-grades/client-queries'
import { getQuantRanking } from '@/server/quant-ranking/client-queries'
import { getRatingsSummary } from '@/server/ratings/client-queries'
import { getUser } from '@/server/user/client-queries'

jest.mock('@/server/user/client-queries')
jest.mock('@/server/ratings/client-queries')
jest.mock('@/server/factor-grades/client-queries')
jest.mock('@/server/quant-ranking/client-queries')

const mockGetUser = getUser as jest.MockedFunction<typeof getUser>
const mockGetQuantRanking = getQuantRanking as jest.MockedFunction<typeof getQuantRanking>
const mockGetRatingsSummary = getRatingsSummary as jest.MockedFunction<
    typeof getRatingsSummary
>
const mockGetAllFactorGrades = getAllFactorGrades as jest.MockedFunction<
    typeof getAllFactorGrades
>

describe('FinancialCards', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('Premium User', () => {
        beforeEach(() => {
            mockGetUser.mockResolvedValue(mockPremiumUser)
            mockGetQuantRanking.mockResolvedValue(mockQuantRanking)
            mockGetRatingsSummary.mockResolvedValue(mockRatingsSummary)
            mockGetAllFactorGrades.mockResolvedValue(mockFactorGrades)
        })

        it('renders all cards for premium users', async () => {
            renderWithQueryClient(<FinancialCards />)

            expect(await screen.findByText('Quant Ranking')).toBeInTheDocument()
            expect(await screen.findByText('Ratings Summary')).toBeInTheDocument()
            expect(await screen.findByText('Factor Grades')).toBeInTheDocument()
        })
    })

    describe('Non-Premium User', () => {
        beforeEach(() => {
            mockGetUser.mockResolvedValue(mockNonPremiumUser)
            mockGetQuantRanking.mockResolvedValue(mockQuantRanking)
        })

        it('renders only Quant Ranking card', async () => {
            renderWithQueryClient(<FinancialCards />)

            expect(await screen.findByText('Quant Ranking')).toBeInTheDocument()
            expect(screen.queryByText('Ratings Summary')).toBeNull()
            expect(screen.queryByText('Factor Grades')).toBeNull()
        })

        it('does not call premium endpoints', async () => {
            renderWithQueryClient(<FinancialCards />)

            await waitFor(() => {
                expect(mockGetUser).toHaveBeenCalled()
                expect(mockGetQuantRanking).toHaveBeenCalled()
            })

            expect(mockGetRatingsSummary).not.toHaveBeenCalled()
            expect(mockGetAllFactorGrades).not.toHaveBeenCalled()
        })
    })
})
