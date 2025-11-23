'use client'

import { TableEmptyRow } from './TableEmptyRow'
import { TableErrorRow } from './TableErrorRow'
import { TableSkeletonRow } from './TableSkeletonRow'

interface TableStateWrapperProps {
    isLoading?: boolean
    isError?: boolean
    isEmpty?: boolean
    skeletonRows?: number
    columns: number
    errorMessage?: string
    emptyMessage?: string
    children: React.ReactNode
    SkeletonComponent?: React.ComponentType
}

export const TableStateWrapper = ({
    isLoading,
    isError,
    isEmpty,
    skeletonRows = 3,
    columns,
    errorMessage = 'Failed to load data',
    emptyMessage = 'No data available',
    children,
    SkeletonComponent,
}: TableStateWrapperProps) => {
    if (isLoading) {
        return (
            <>
                {Array.from({ length: skeletonRows }).map((_, index) => (
                    <TableSkeletonRow
                        key={index}
                        columns={columns}
                        SkeletonComponent={SkeletonComponent}
                    />
                ))}
            </>
        )
    }

    if (isError) {
        return <TableErrorRow columns={columns} message={errorMessage} />
    }

    if (isEmpty) {
        return <TableEmptyRow columns={columns} message={emptyMessage} />
    }

    return <>{children}</>
}
