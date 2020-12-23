import React, {createContext, useCallback, useContext, useState} from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  store: any;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  store: any;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = useCallback(async ({email, password}: SignInCredentials) => {
    const response = await api.post('/sessions/managers', {
      email: email.toLocaleLowerCase(),
      password,
    });

    const {token, manager: store, erp} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers.ErpID = store.id;
    api.defaults.headers.ErpToken = erp.token;
    api.defaults.headers.ErpExpires = erp.expires;
    setData({token, store});
  }, []);

  const signOut = useCallback(() => {
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{store: data.store, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
