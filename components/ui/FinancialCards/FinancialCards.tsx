'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import {
    FactorGradesCard,
    QuantRankingCard,
    RatingsSummaryCard,
} from '@/components/ui/FinancialCards'
import { queryKeys } from '@/lib/react-query/keys'
import { getUser } from '@/server/user/client-queries'

export function FinancialCards() {
    const queryClient = useQueryClient()

    const { data: user } = useQuery({
        queryKey: queryKeys.user,
        queryFn: getUser,
        refetchInterval: 60 * 5 * 1000,
    })

    const isPremium = user?.premium ?? false

    useEffect(() => {
        if (user && !user.premium) {
            queryClient.removeQueries({ queryKey: queryKeys.ratings })
            queryClient.removeQueries({ queryKey: queryKeys.factorGrades })
        }
    }, [user?.premium, queryClient])

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
