'use client'

import { useEffect, useState } from 'react';
import styles from './cookie_banner.module.css';
import Cookies from 'js-cookie';

export default function CookieBanner() {
    const [show, setShow] = useState(false);

    // Check if user has accepted cookies
    useEffect(() => {
        const accept_cookie = Cookies.get('User-Cookies-Accept');

        if (!accept_cookie) {
            setShow(true);
        }
    }, []);

    function handle_accept() {
        Cookies.set('User-Cookies-Accept');
        setShow(false);
    }

    if (show) {
        return (
            <div className={styles.cookie_banner}>
                <div className={styles.cookie_icon}>
                    <img src='/global/cookie_icon.svg' />
                </div>
                <div className={styles.cookie_text}>
                    <h1>We Use Cookies</h1>
                    <p>Lif Platforms uses cookies for various functions and are required for our site to function.</p>
                </div>
                <div className={styles.ok_button}>
                    <button onClick={handle_accept}>Okay</button>
                </div>
            </div>
        );
    };
};