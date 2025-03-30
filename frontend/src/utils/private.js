import React from "react";
import { useNavigate } from "react-router-dom";
import authAPI from '../api/authApi';

const ProtectedRoute = ({ email, sessionKey, children }) => {
    const navigator = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);

    React.useEffect(() => {
        const authenticate = async () => {
            try {
                const res = await authAPI.auth({ email, sessionKey });
                if (res.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    console.log("Auth Response", res);
                    setIsAuthenticated(false);
                    navigator("/"); // Redirect to home page
                }
            } catch (error) {
                console.error("Authentication error:", error);
                setIsAuthenticated(false);
                navigator("/"); // Redirect to home page
            }
        };
        authenticate();
    }, [email, sessionKey, navigator]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading state while authenticating
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;
