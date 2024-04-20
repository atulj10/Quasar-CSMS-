import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    useEffect(() => {
        // Fetch user data from local storage
        const data = JSON.parse(localStorage.getItem('auth'));
        const token = localStorage.getItem('token');

        if (data && token) {
            // If user data and token are found in local storage, set the auth state
            setAuth({
                user: data,
                token: token,
            });
        } else {
            // Clear auth state if no user data or token found
            setAuth({
                user: null,
                token: "",
            });
        }

        console.log("contxt",data);

        //eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
