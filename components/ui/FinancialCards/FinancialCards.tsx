'use client'

import { useQuery } from '@tanstack/react-query'

import {
    FactorGradesCard,
    QuantRankingCard,
    RatingsSummaryCard,
} from '@/components/ui/FinancialCards'
import { queryKeys } from '@/lib/react-query/keys'
import { getUser } from '@/server/user/client-queries'

export function FinancialCards() {
    const { data: user } = useQuery({
        queryKey: queryKeys.user,
        queryFn: getUser,
    })

    const isPremium = user?.premium ?? false

    return (
        <>
            <QuantRankingCard />

            {isPremium && (
                <>
                    <RatingsSummaryCard />
                    <FactorGradesCard />
                </>
            )}
        </>
    )
}
