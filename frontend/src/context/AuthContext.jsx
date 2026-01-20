import { createContext, useState, useEffect } from 'react';

//create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //global login state
    const [ token, setToken ] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    //keep localStorage in sync with token
    useEffect(() => {
        if(token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeiItem('token');
        }
    }, [token]);

    //login : save token
    const login = (newToken) => {
        setToken(newToken);
    };

    //logout: clear token
    const logout = () => {
        setToken(null);
    };

    return(
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};