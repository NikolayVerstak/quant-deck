'use client'

import { useQuery } from '@tanstack/react-query'

import styles from './RatingsSummaryCard.module.scss'

import { Card } from '@/components/ui/Card'
import { TableStateWrapper } from '@/components/ui/Table/TableStateWrapper'
import { queryKeys } from '@/lib/react-query/keys'
import { getRatingsSummary } from '@/server/ratings/client-queries'
import type { Rating } from '@/types/ratings'

export const RatingsSummaryCard = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.ratings,
        queryFn: getRatingsSummary,
        retry: 2,
    })

    const rows = data
        ? Object.entries(data).map(([key, value]: [string, Rating]) => ({
              label: key.replace(/_/g, ' '),
              rating: value.rating.toUpperCase(),
              score: value.score.toFixed(2),
          }))
        : []

    const isEmpty = !isLoading && !isError && rows.length === 0

    return (
        <Card title="Ratings Summary">
            <table className={styles.table}>
                <tbody>
                    <TableStateWrapper
                        isLoading={isLoading}
                        isError={isError}
                        isEmpty={isEmpty}
                        skeletonRows={3}
                        columns={3}
                        errorMessage="Failed to load ratings summary"
                        emptyMessage="No ratings available"
                    >
                        {rows.map(row => (
                            <Row
                                key={row.label}
                                label={row.label}
                                rating={row.rating}
                                score={row.score}
                            />
                        ))}
                    </TableStateWrapper>
                </tbody>
            </table>
        </Card>
    )
}

const Row = ({
    label,
    rating,
    score,
}: {
    label: string
    rating: string
    score: string
}) => (
    <tr>
        <td className={styles.label}>{label}</td>
        <td>{rating}</td>
        <td>{score}</td>
    </tr>
)
