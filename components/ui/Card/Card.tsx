import styles from './Card.module.scss'

interface CardProps {
    title: string
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
    title,
    children,
}) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.cardTitle}>{title}</h2>
            <div>{children}</div>
        </div>
    )
}
