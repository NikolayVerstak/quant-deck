import styles from './page.module.css'

import { JsonView } from '@/components/dev/json-view'
import { getAllFactorGrades } from '@/server/factor-grades/server-queries'
import { getQuantRanking } from '@/server/quant-ranking/server-queries'
import { getRatingsSummary } from '@/server/ratings/server-queries'
import { getUser } from '@/server/user/server-queries'

export default async function Home() {
    const [user, ratings, factorGrades, ranking] = await Promise.all([
        getUser(),
        getRatingsSummary(),
        getAllFactorGrades(),
        getQuantRanking(),
    ])

    return (
        <div className={styles.page}>
            <main className={styles.main}>Test Page</main>
            <JsonView data={{ user, ratings, factorGrades, ranking }} />
        </div>
    )
}
