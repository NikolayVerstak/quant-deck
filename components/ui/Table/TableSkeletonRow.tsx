import { Skeleton } from '../Skeleton'

interface TableSkeletonRowProps {
    columns: number
    SkeletonComponent?: React.ComponentType
}

export const TableSkeletonRow = ({
    columns,
    SkeletonComponent = Skeleton,
}: TableSkeletonRowProps) => (
    <tr>
        {Array.from({ length: columns }).map((_, index) => (
            <td key={index}>
                <SkeletonComponent />
            </td>
        ))}
    </tr>
)
