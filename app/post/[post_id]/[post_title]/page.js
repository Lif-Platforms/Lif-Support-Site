import NavBar from "@/components/global/navbar/navbar";
import { cookies } from 'next/headers';

export default function ViewPostPage({ params }) {
    // Get username from cookies
    const cookieStore = cookies();
    const username = cookieStore.get('LIF_USERNAME');

    return (
        <div>
            <NavBar username={username.value} auth_url={process.env.REACT_APP_AUTH_URL} />
            <h1>View Post Page</h1>
            <p>{params.post_id}</p>
            <p>{params.post_title}</p>
        </div>
    )
}