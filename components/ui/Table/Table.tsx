'use client'

import { TableEmptyRow } from './TableEmptyRow'
import { TableErrorRow } from './TableErrorRow'
import { TableSkeletonRow } from './TableSkeletonRow'

interface TableProps {
    title?: string
    headers?: string[] | readonly string[]
    showHeaders?: boolean
    isLoading?: boolean
    isError?: boolean
    isEmpty?: boolean
    skeletonRows?: number
    columns: number
    errorMessage?: string
    emptyMessage?: string
    classNames?: {
        table?: string
    }
}

export const Table: React.FC<React.PropsWithChildren<TableProps>> = ({
    headers,
    showHeaders = false,
    isLoading,
    isError,
    isEmpty,
    skeletonRows = 3,
    columns,
    errorMessage = 'Failed to load data',
    emptyMessage = 'No data available',
    children,
    classNames,
}) => {
    return (
        <table className={classNames?.table ?? ''}>
            {headers && showHeaders && (
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i}>{h}</th>
                        ))}
                    </tr>
                </thead>
            )}

            <tbody>
                {isLoading &&
                    Array.from({ length: skeletonRows }).map((_, i) => (
                        <TableSkeletonRow key={i} columns={columns} />
                    ))}

                {isError && <TableErrorRow columns={columns} message={errorMessage} />}

                {isEmpty && <TableEmptyRow columns={columns} message={emptyMessage} />}

                {!isLoading && !isError && !isEmpty && children}
            </tbody>
        </table>
    )
}
