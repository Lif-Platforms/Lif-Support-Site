'use client'

import styles from './account_panel.module.css';
import Link from 'next/link';

export default function AccountPanel({ username, panel_open}) {

    function handle_log_out() {
        window.location.href = "https://api.auth.lifplatforms.com/auth/v1/logout?redirect=https://support.lifplatforms.com"
    }

    if (panel_open && username !== null) {
        return (
            <div className={styles.account_panel}>
                <div className={styles.header}>
                    <img src={`${process.env.NEXT_PUBLIC_AUTH_URL}/profile/v1/get_avatar/${username}.png`} alt="" />
                    <h1>{username}</h1>
                </div>
                <hr />
                <Link href="https://my.lifplatforms.com">Manage Account</Link>
                <a onClick={handle_log_out}>Log Out</a>
            </div>
        )
    } else if (panel_open && username === null) {
        return (
            <div className={styles.account_panel}>
                <div className={styles.header}>
                    <img src={`${process.env.NEXT_PUBLIC_AUTH_URL}/profile/v1/get_avatar/${username}.png`} alt="" />
                    <h1>Guest</h1>
                </div>
                <hr />
                <Link href="https://my.lifplatforms.com/login?redirect=https://support.lifplatforms.com">Sign In</Link>
            </div>
        );
    } else {
        return null;
    }
}