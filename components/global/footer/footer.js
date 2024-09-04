'use client'

import styles from './footer.module.css';

function Footer() {
    return(
        <div className={styles.footer}>
            <h1>Lif Platforms</h1>
            <div className={styles.footer_links}>
                <a href="https://lifplatforms.com" target="_blank">Home</a>
                <a href="https://lifplatforms.com/about%20us" target="_blank">About Us</a>
                <a href="https://lifplatforms.com/services" target="_blank">Services</a>
            </div>
        </div>
    )
}

export default Footer;