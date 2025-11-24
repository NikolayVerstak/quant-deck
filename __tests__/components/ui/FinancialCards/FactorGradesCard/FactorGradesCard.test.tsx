import { screen } from '@testing-library/react'

import { mockFactorGrades, mockPremiumUser } from '@/__tests__/tests-utils/mocks'
import { renderWithQueryClient } from '@/__tests__/tests-utils/renderWithClient'
import { FactorGradesCard, FinancialCards } from '@/components/ui/FinancialCards'
import { getAllFactorGrades } from '@/server/factor-grades/client-queries'
import { getUser } from '@/server/user/client-queries'

jest.mock('@/server/factor-grades/client-queries')
jest.mock('@/server/user/client-queries')

const mockGetAllFactorGrades = getAllFactorGrades as jest.MockedFunction<
    typeof getAllFactorGrades
>
const mockGetUser = getUser as jest.MockedFunction<typeof getUser>

describe('FactorGradesCard', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockGetUser.mockResolvedValue(mockPremiumUser)
    })

    describe('Success', () => {
        beforeEach(() => {
            mockGetAllFactorGrades.mockResolvedValue(mockFactorGrades)
        })

        it('should display factor grades data correctly grouped by a factor', async () => {
            renderWithQueryClient(<FinancialCards />)

            const expected = {
                Valuation: ['A+', 'A', 'B+'],
                Growth: ['B', 'B-', 'C'],
                Profitability: ['A', 'A-', 'B+'],
                Momentum: ['C', 'C+', 'C'],
                Revisions: ['B+', 'B', 'B-'],
            }

            for (const [factor, grades] of Object.entries(expected)) {
                const row = (await screen.findByText(factor)).closest('tr')
                expect(row).not.toBeNull()

                for (const grade of grades) {
                    expect(row).toHaveTextContent(grade)
                }
            }
        })
    })

    describe('Loading', () => {
        beforeEach(() => {
            mockGetAllFactorGrades.mockImplementation(
                () =>
                    new Promise(resolve =>
                        setTimeout(() => resolve(mockFactorGrades), 150)
                    )
            )
        })
        it('shows loading skeletons', async () => {
            renderWithQueryClient(<FactorGradesCard />)

            const skeletons = screen.getAllByRole('status')
            expect(skeletons.length).toBeGreaterThan(0)
        })
    })

    describe('Error', () => {
        beforeEach(() => {
            mockGetAllFactorGrades.mockRejectedValue(new Error('API Error'))
        })

        it('shows error message', async () => {
            renderWithQueryClient(<FactorGradesCard />)

            expect(
                await screen.findByText('Failed to load factor grades')
            ).toBeInTheDocument()
        })
    })

    describe('Empty', () => {
        beforeEach(() => {
            mockGetAllFactorGrades.mockResolvedValue(null as any)
        })

        it('shows empty message', async () => {
            renderWithQueryClient(<FactorGradesCard />)

            expect(
                await screen.findByText('No factor grades available')
            ).toBeInTheDocument()
        })
    })
})
