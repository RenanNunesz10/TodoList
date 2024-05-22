import styles from "./task.module.css"

export default function Task({task}){
    return (
        <article className={styles.task}>
            <p>{task.id}</p>
            <p>{task.text}</p>
            <p>{task.completed}</p>
        </article>
    )
}