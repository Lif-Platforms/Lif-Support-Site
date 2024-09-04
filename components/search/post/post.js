'use client'

import styles from "./post.module.css";
import { useRouter } from 'next/navigation';

export default function Post({id, title, content, software}) {

    const router = useRouter();

    function handle_navigation() {
        router.push(`/post/${id}/${title}`);
    }

    return (
        <div className={styles.post} onClick={handle_navigation}>
            <h1>{title}</h1>
            <p>{content}</p>
            <span className={software === "Ringer" ? styles.ringer_software : software === "Dayly" ? styles.dayly_software : styles.software}>{software}</span>
        </div>
    )
}