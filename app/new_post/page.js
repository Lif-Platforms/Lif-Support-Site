import NavBar from "@/components/global/navbar/navbar";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import styles from './page.module.css';
import PostBody from "@/components/new_post/post_body/post_body";

export const metadata = {
    title: "Lif Support | New Post",
    description: "Get support from our helpful community for Lif Platforms products and services."
}

export default async function NewPostPage() {
    // Get username and token from cookies
    const cookieStore = cookies();
    const username_cookie = cookieStore.get('LIF_USERNAME');
    const token_cookie = cookieStore.get("LIF_TOKEN");

    let username;
    let token;

    // Check if username and token have any value
    if (username_cookie) {
        username = username_cookie.value;
    } else {
        username = null;
    }

    if (token_cookie) {
        token = token_cookie.value;
    } else {
        token = null;
    }

    // Create formData for request
    const formData = new FormData();
    formData.append('username', username);
    formData.append('token', token);

    // Verify user is logged in
    const response = await fetch(`${process.env.AUTH_URL}/auth/verify_token`, {
        method: "POST",
        body: formData
    })

    if (response.ok) {
        return (
            <div>
                <NavBar username={username} />
                <div className={styles.title}>
                    <h1>New Post</h1>
                    <p>What do you need help with?</p>
                </div>
                <div className={styles.post_container}>
                    <div className={styles.avatar}>
                        <img src={`${process.env.NEXT_PUBLIC_AUTH_URL}/profile/get_avatar/${username}.png`} alt="" />
                    </div>
                    <div className={styles.post_form}>
                        <PostBody
                            username={username}
                            token={token}
                        />
                    </div>  
                </div>
            </div>
        )
    } else {
        redirect("https://my.lifplatforms.com/#/login?redirect=https://support.lifplatforms.com/new_post");
    }   
}