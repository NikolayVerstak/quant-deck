'use client'

import { useQuery } from '@tanstack/react-query'

import styles from './FactorGradesCard.module.scss'
import { groupFactorGrades } from './helpers'

import { Card } from '@/components/ui/Card'
import { TableStateWrapper } from '@/components/ui/Table/TableStateWrapper'
import { FACTOR_ORDER } from '@/lib/constants'
import { queryKeys } from '@/lib/react-query/keys'
import { getAllFactorGrades } from '@/server/factor-grades/client-queries'

const HEADERS: readonly string[] = ['', 'Now', '3M ago', '6M ago']

export const FactorGradesCard = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.factorGrades,
        queryFn: getAllFactorGrades,
        retry: 2,
    })

    const rows = data ? groupFactorGrades(data) : []

    const isEmpty = !isLoading && !isError && rows.length === 0

    return (
        <Card title="Factor Grades">
            <table className={styles.table}>
                {!isEmpty && !isError && (
                    <thead>
                        <tr>
                            {HEADERS.map((h, i) => (
                                <th key={i}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                )}

                <tbody>
                    <TableStateWrapper
                        isLoading={isLoading}
                        isError={isError}
                        isEmpty={isEmpty}
                        skeletonRows={FACTOR_ORDER.length}
                        columns={4}
                        errorMessage="Failed to load factor grades"
                        emptyMessage="No factor grades available"
                    >
                        {rows.map(row => (
                            <Row
                                key={row.factor}
                                factor={row.factor}
                                now={row.now}
                                threeMonthsAgo={row.threeMonthsAgo}
                                sixMonthsAgo={row.sixMonthsAgo}
                            />
                        ))}
                    </TableStateWrapper>
                </tbody>
            </table>
        </Card>
    )
}

const Row = ({
    factor,
    now,
    threeMonthsAgo,
    sixMonthsAgo,
}: {
    factor: string
    now: string
    threeMonthsAgo: string
    sixMonthsAgo: string
}) => (
    <tr>
        <td className={styles.label}>{factor}</td>
        <td>{now}</td>
        <td>{threeMonthsAgo}</td>
        <td>{sixMonthsAgo}</td>
    </tr>
)
