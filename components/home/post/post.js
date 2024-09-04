'use client'

import styles from './post.module.css';
import Link from 'next/link';

export default function Post({title, content, software, id}) {

    return (
        <Link href={`/post/${id}/${title}`}>
            <div className={styles.post}>
                <h1>{title}</h1>
                <p>{content}</p>
                <span className={software === "Ringer" ? styles.ringer_software : software === "Dayly" ? styles.dayly_software : styles.software}>{software}</span>
            </div>
        </Link>
    )
}