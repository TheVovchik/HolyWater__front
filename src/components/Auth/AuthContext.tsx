import React, { useState, useEffect, useCallback } from 'react';
import { dataStorage } from '../../Storage/Storage';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { AuthForm } from './AuthForm';

type Context = {
  user: User | null,
  logOut: () => void,
};

export const AuthContext = React.createContext<Context>({
  user: null,
  logOut: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const logOut = useCallback(() => {
    localStorage.removeItem('userDate');
    localStorage.removeItem('user');

    setUser(null);
  }, []);

  const loadUser = useCallback(async (
    userEmail: string,
    userPassword: string,
  ) => {
    try {
      const userFromApi = await dataStorage.checkUser(userEmail, userPassword);

      if (typeof userFromApi !== 'string') {
        setUser(userFromApi);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      setLoading(false);

      return;
    }

    const userFromStorage = JSON.parse(userData) as User;

    loadUser(userFromStorage.email, userFromStorage.password);
  }, []);

  const contextValue = {
    user,
    logOut,
  };

  return (
    <>
      {loading && <Loader />}
      {!user && !loading && (
        <AuthForm
          onLogin={setUser}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {user
        && !loading && (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
