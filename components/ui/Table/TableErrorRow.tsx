import styles from './Table.module.scss'

interface TableErrorRowProps {
    columns: number
    message: string
}

export const TableErrorRow = ({ columns, message }: TableErrorRowProps) => (
    <tr className={styles.errorRow}>
        <td colSpan={columns}>{message}</td>
    </tr>
)
