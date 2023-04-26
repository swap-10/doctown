import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
export const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (body) => {
        try {
          const response = await api.login(body);
          setUser(response.token);
          localStorage.setItem('token', response.token);
          navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    
    const logout = async () => {
        try {
            // TODO: Implement POST method for logout including backend functions
            // await api.logout();
            setUser(null);
            localStorage.setItem('token', null);
            navigate('/');
        } catch (error) {
          console.error(error);
        }
      };

    const value = {
        user,
        setUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={value} {...props} />
}