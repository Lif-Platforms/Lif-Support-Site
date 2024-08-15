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
    const username = cookieStore.get('LIF_USERNAME');
    const token = cookieStore.get("LIF_TOKEN");

    // Create formData for request
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('token', token.value);

    // Verify user is logged in
    const response = await fetch(`${process.env.REACT_APP_AUTH_URL}/auth/verify_token`, {
        method: "POST",
        body: formData
    })

    if (response.ok) {
        return (
            <div>
                <NavBar username={username.value} auth_url={process.env.REACT_APP_AUTH_URL} />
                <div className={styles.title}>
                    <h1>New Post</h1>
                    <p>What do you need help with?</p>
                </div>
                <div className={styles.post_container}>
                    <div className={styles.avatar}>
                        <img src={`${process.env.REACT_APP_AUTH_URL}/profile/get_avatar/${username.value}.png`} alt="" />
                    </div>
                    <div className={styles.post_form}>
                        <PostBody 
                            support_url={process.env.REACT_APP_SUPPORT_URL}
                            username={username.value}
                            token={token.value}
                        />
                    </div>  
                </div>
            </div>
        )
    } else {
        redirect("https://my.lifplatforms.com/#/login?redirect=https://support.lifplatforms.com/new_post");
    }   
}