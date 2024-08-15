'use client'

import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AccountPanel from './account_panel';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavBar({ username, auth_url }) {
    const [panelOpen, setPanelOpen] = useState(false);

    function handle_account_panel() {
        setPanelOpen(!panelOpen);
    }

    const router = useRouter();

    function handle_post_button() {
        router.push("/new_post");
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/"><Image width={100} height={50} src='/navbar/Lif-Logo.png' alt="Lif Logo" /></Link>
                <h1>Support</h1>
            </div>
            <div className={styles.post_button}>
                <button onClick={handle_post_button}>
                    <Image height={50} width={50} src="/navbar/plus-icon.svg" alt="" />
                </button>
            </div>
            <div className={styles.account_button}>
                {/* eslint-disable-next-line */}
                <a onClick={handle_account_panel}>
                    <img src={`${auth_url}/profile/get_avatar/${username}.png`} alt="" />
                </a>
                <AccountPanel auth_url={auth_url} username={username} panel_open={panelOpen} />
            </div>
        </div>
    )
}