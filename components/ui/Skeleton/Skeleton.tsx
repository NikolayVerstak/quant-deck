'use client'

import styles from './Skeleton.module.scss'

export const Skeleton: React.FC = () => {
    return <div className={styles.skeleton} role="status" aria-label="Loading content" />
}
