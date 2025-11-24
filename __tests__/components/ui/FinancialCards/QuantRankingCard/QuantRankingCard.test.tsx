import { screen } from '@testing-library/react'

import { mockQuantRanking } from '@/__tests__/tests-utils/mocks'
import { renderWithQueryClient } from '@/__tests__/tests-utils/renderWithClient'
import { QuantRankingCard } from '@/components/ui/FinancialCards'
import { getQuantRanking } from '@/server/quant-ranking/client-queries'

jest.mock('@/server/user/client-queries')
jest.mock('@/server/quant-ranking/client-queries')

const mockGetQuantRanking = getQuantRanking as jest.MockedFunction<typeof getQuantRanking>

describe('QuantRankingCard', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('Success', () => {
        beforeEach(() => {
            mockGetQuantRanking.mockResolvedValue(mockQuantRanking)
        })
        it('should display quant ranking data correctly with grouped rows', async () => {
            renderWithQueryClient(<QuantRankingCard />)

            const expected = {
                Sector: 'Information Technology',
                Industry: 'Technology Hardware, Storage and Peripherals',
                'Ranked Overall': /^50\s*out of\s*1000$/,
                'Ranked in Sector': /^10\s*out of\s*200$/,
                'Ranked in Industry': /^5\s*out of\s*50$/,
            }

            for (const [label, value] of Object.entries(expected)) {
                const labelEl = await screen.findByText(label)
                const row = labelEl.closest('.row')
                expect(row).not.toBeNull()

                const valueEl = row!.querySelector('.value')
                expect(valueEl).not.toBeNull()

                if (value instanceof RegExp) {
                    expect(valueEl).toHaveTextContent(value)
                } else {
                    expect(valueEl).toHaveTextContent(value)
                }
            }
        })
    })

    describe('Loading', () => {
        beforeEach(() => {
            mockGetQuantRanking.mockImplementation(
                () =>
                    new Promise(resolve =>
                        setTimeout(() => resolve(mockQuantRanking), 150)
                    )
            )
        })
        it('shows loading skeletons', async () => {
            renderWithQueryClient(<QuantRankingCard />)

            const skeletons = screen.getAllByRole('status')
            expect(skeletons.length).toBeGreaterThan(0)
        })
    })

    describe('Error', () => {
        beforeEach(() => {
            mockGetQuantRanking.mockRejectedValue(new Error('API Error'))
        })
        it('shows error message', async () => {
            renderWithQueryClient(<QuantRankingCard />)

            expect(
                await screen.findByText('Failed to load quant ranking')
            ).toBeInTheDocument()
        })
    })
    describe('Empty', () => {
        beforeEach(() => {
            mockGetQuantRanking.mockResolvedValue(null as any)
        })
        it('shows empty message', async () => {
            renderWithQueryClient(<QuantRankingCard />)

            expect(
                await screen.findByText('No quant ranking available')
            ).toBeInTheDocument()
        })
    })
})
