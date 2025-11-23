import styles from './page.module.scss'

import { Article } from '@/components/ui/Article'
import { FinancialCards } from '@/components/ui/FinancialCards'

export default async function Home() {
    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContent}>
                    <main>
                        <Article />
                    </main>
                    <aside>
                        <div className={styles.financialCards}>
                            <FinancialCards />
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}
