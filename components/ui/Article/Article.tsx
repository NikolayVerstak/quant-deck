import styles from './Article.module.scss'
import { articleData } from './mock-article'

export const Article: React.FC = () => {
    return (
        <article className={styles.article}>
            <h1>{articleData.title}</h1>
            {articleData.paragraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
            ))}
        </article>
    )
}
