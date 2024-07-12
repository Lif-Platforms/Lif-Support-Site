'use client'

import styles from './account_panel.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function AccountPanel({ auth_url, username, panel_open}) {

    function handle_log_out() {
        fetch(`${auth_url}/auth/logout`)
        .then((response) => {
            if (response.ok) {
                window.location.reload();
            } else {
                throw new Error('Request failed with status code: ' + response.status);
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    if (panel_open && username !== null) {
        return (
            <div className={styles.account_panel}>
                <div className={styles.header}>
                    <img src={`${auth_url}/profile/get_avatar/${username}.png`} alt="" />
                    <h1>{username}</h1>
                </div>
                <hr />
                {/* eslint-disable-next-line */}
                <Link href="https://my.lifplatforms.com">Manage Account</Link>
                {/* eslint-disable-next-line */}
                <a onClick={handle_log_out}>Log Out</a>
            </div>
        )
    } else {
        return null;
    }
}