'use client'

import { useQuery } from '@tanstack/react-query'

import styles from './QuantRankingCard.module.scss'

import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { queryKeys } from '@/lib/react-query/keys'
import { getQuantRanking } from '@/server/quant-ranking/client-queries'

interface QuantRankingRow {
    label: string
    value?: string
    rank?: number
    total?: number
}

export const QuantRankingCard = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.quantRanking,
        queryFn: getQuantRanking,
        retry: 2,
    })

    const rows: QuantRankingRow[] = data
        ? [
              { label: 'Sector', value: data.sector },
              { label: 'Industry', value: data.industry },
              {
                  label: 'Ranked Overall',
                  rank: data.rankings.overall.rank,
                  total: data.rankings.overall.total,
              },
              {
                  label: 'Ranked in Sector',
                  rank: data.rankings.sector.rank,
                  total: data.rankings.sector.total,
              },
              {
                  label: 'Ranked in Industry',
                  rank: data.rankings.industry_specific.rank,
                  total: data.rankings.industry_specific.total,
              },
          ]
        : []

    const isEmpty = !isLoading && !isError && rows.length === 0

    return (
        <Card title="Quant Ranking">
            <div className={styles.wrapper}>
                {isLoading &&
                    Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

                {isError && (
                    <div className={styles.errorRow}>Failed to load quant ranking</div>
                )}

                {!isLoading && !isError && isEmpty && (
                    <div className={styles.emptyRow}>No quant ranking available</div>
                )}

                {!isLoading &&
                    !isError &&
                    !isEmpty &&
                    rows.map((row, i) => <Row key={i} {...row} />)}
            </div>
        </Card>
    )
}

const Row = ({ label, value, rank, total }: QuantRankingRow) => (
    <div className={styles.row}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>
            {value ?? (
                <>
                    <span className="bold">{rank}</span> out of{' '}
                    <span className="bold">{total}</span>
                </>
            )}
        </div>
    </div>
)

const SkeletonRow = () => (
    <div className={`${styles.row} ${styles.skeleton}`}>
        <Skeleton />
        <Skeleton />
    </div>
)
