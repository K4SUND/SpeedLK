
import { parse } from "postcss";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            const userInfo = parseJwt(token);
            // setUser(userInfo.Id);
            setUser(JSON.stringify(userInfo));

        }

        setLoading(false);

    }, []);

    const login = (token) => {
        const userInfo = parseJwt(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(JSON.stringify(userInfo));
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);


    }


    const value =
    {
        user,
        login,
        logout,

    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    );


};

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);

    }
    catch (err) {
        console.error('Invalid token', err);
        return null;
    }

}




