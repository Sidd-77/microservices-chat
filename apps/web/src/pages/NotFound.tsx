import { useLocation } from "react-router-dom";

const NotFoundPage = () => {
    const location = useLocation();

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page <strong>{location.pathname}</strong> does not exist.</p>
            <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
                Go back to the homepage
            </a>
        </div>
    );
};

export default NotFoundPage;
