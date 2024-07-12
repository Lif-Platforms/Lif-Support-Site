export default function SearchPage({ params }) {
    return (
        <div>
            <h1>Search Page</h1>
            <p>{params.query}</p>
        </div>
    )
}