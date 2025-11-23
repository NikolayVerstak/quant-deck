import styles from './Table.module.scss'

interface TableEmptyRowProps {
    columns: number
    message: string
}

export const TableEmptyRow = ({ columns, message }: TableEmptyRowProps) => (
    <tr className={styles.emptyRow}>
        <td colSpan={columns}>{message}</td>
    </tr>
)
