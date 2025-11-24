'use client'

import { useQuery } from '@tanstack/react-query'

import styles from './RatingsSummaryCard.module.scss'

import { Card } from '@/components/ui/Card'
import { Table } from '@/components/ui/Table'
import { queryKeys } from '@/lib/react-query/keys'
import { getRatingsSummary } from '@/server/ratings/client-queries'
import type { Rating } from '@/types/ratings'

export const RatingsSummaryCard = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.ratings,
        queryFn: getRatingsSummary,
        retry: false,
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
            <Table
                isLoading={isLoading}
                isError={isError}
                isEmpty={isEmpty}
                skeletonRows={3}
                columns={3}
                errorMessage="Failed to load ratings summary"
                emptyMessage="No ratings available"
                classNames={{ table: styles.table }}
            >
                {rows.map(({ label, rating, score }) => (
                    <tr key={label}>
                        <td className={styles.label}>{label}</td>
                        <td>{rating}</td>
                        <td>{score}</td>
                    </tr>
                ))}
            </Table>
        </Card>
    )
}
