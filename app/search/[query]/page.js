import NavBar from "@/components/global/navbar/navbar";
import { cookies } from 'next/headers';

export default function SearchPage({ params }) {
    // Get username from cookies
    const cookieStore = cookies();
    const username = cookieStore.get('LIF_USERNAME');

    return (
        <div>
            <NavBar auth_url={process.env.REACT_APP_AUTH_URL} username={username.value} />
            <h1>Search Page</h1>
            <p>{params.query}</p>
        </div>
    )
}