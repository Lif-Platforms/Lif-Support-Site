'use client'

import { useRef } from 'react';
import styles from './title.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Title() {
    const searchInputRef = useRef();

    const router = useRouter();

    function handle_key_press(event) {
        // Check if the they pressed was 'enter'
        if (event.key === "Enter") {
            router.push(`/search/${searchInputRef.current.value}`);
        }
    }

    return (
        <div className={styles.title}>
            <Image width={250} height={120} className={styles.logo} src="/navbar/Lif-Logo.png" alt="Lif Logo" />
            <h1>How Can We Help?</h1>
            <div className={styles.search}>
                <Image width={30} height={30} src='/home/search-icon.svg' alt="" />
                <input ref={searchInputRef} onKeyDown={handle_key_press} placeholder="Search Support" type="search" />
            </div>
        </div>
    )
}