import { screen } from '@testing-library/react'

import { mockPremiumUser, mockRatingsSummary } from '@/__tests__/tests-utils/mocks'
import { renderWithQueryClient } from '@/__tests__/tests-utils/renderWithClient'
import { RatingsSummaryCard } from '@/components/ui/FinancialCards'
import { getRatingsSummary } from '@/server/ratings/client-queries'
import { getUser } from '@/server/user/client-queries'

jest.mock('@/server/ratings/client-queries')
jest.mock('@/server/user/client-queries')

const mockGetRatingsSummary = getRatingsSummary as jest.MockedFunction<
    typeof getRatingsSummary
>
const mockGetUser = getUser as jest.MockedFunction<typeof getUser>

describe('RatingsSummaryCard', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockGetUser.mockResolvedValue(mockPremiumUser)
    })

    describe('Success', () => {
        beforeEach(() => {
            mockGetRatingsSummary.mockResolvedValue(mockRatingsSummary)
        })

        it('should display rating summary data correctly', async () => {
            renderWithQueryClient(<RatingsSummaryCard />)

            const expected = {
                'SA Analysts': ['BUY', '4.00'],
                'Wall Street': ['HOLD', '3.20'],
                Quant: ['BUY', '4.80'],
            }

            for (const [label, values] of Object.entries(expected)) {
                const row = (await screen.findByText(label)).closest('tr')
                expect(row).not.toBeNull()

                for (const value of values) {
                    expect(row).toHaveTextContent(value)
                }
            }
        })
    })

    describe('Loading', () => {
        beforeEach(() => {
            mockGetRatingsSummary.mockImplementation(
                () =>
                    new Promise(resolve =>
                        setTimeout(() => resolve(mockRatingsSummary), 150)
                    )
            )
        })
        it('shows loading skeletons', async () => {
            renderWithQueryClient(<RatingsSummaryCard />)

            const skeletons = screen.getAllByRole('status')
            expect(skeletons.length).toBeGreaterThan(0)
        })
    })

    describe('Error', () => {
        beforeEach(() => {
            mockGetRatingsSummary.mockRejectedValue(new Error('API Error'))
        })

        it('shows error message', async () => {
            renderWithQueryClient(<RatingsSummaryCard />)

            expect(
                await screen.findByText('Failed to load ratings summary')
            ).toBeInTheDocument()
        })
    })

    describe('Empty', () => {
        beforeEach(() => {
            mockGetRatingsSummary.mockResolvedValue(null as any)
        })

        it('shows empty message', async () => {
            renderWithQueryClient(<RatingsSummaryCard />)

            expect(await screen.findByText('No ratings available')).toBeInTheDocument()
        })
    })
})
