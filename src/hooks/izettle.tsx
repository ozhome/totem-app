import React, {
  createContext,
  useCallback,
  useEffect,
  useContext,
  useState,
} from 'react';
import {NativeModules, NativeEventEmitter, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PaymentResponse {
  hash: string;
  status: string;
}

interface IzettleContextData {
  izettle: boolean;
  loading: boolean;
  checkLogin: boolean;
  payment(value: number): Promise<PaymentResponse>;
  connect(): Promise<void>;
  login(): Promise<void>;
  totem(): Promise<void>;
}

const IzettleContext = createContext<IzettleContextData>(
  {} as IzettleContextData,
);

const IzettleProvider: React.FC = ({children}) => {
  const [izettle, setIzettle] = useState(false);
  const [checkLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      const data = await AsyncStorage.getItem('@RNOzTotem:izettle');

      setIzettle(!!data);

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const login = useCallback(async () => {
    setLogin(true);
    await NativeModules.IZettle.openLogin();
  }, []);

  const connect = useCallback(async () => {
    await NativeModules.IZettle.openSettings();
  }, []);

  const payment = useCallback(
    async (value: number): Promise<PaymentResponse> => {
      const amount = value.toFixed(2).toString().replace(/\D/g, '');
      const open = await NativeModules.IZettle.openPayment(amount);
      return open;
    },
    [],
  );

  const totem = useCallback(async () => {
    await AsyncStorage.setItem('@RNOzTotem:izettle', 'true');
    setIzettle(true);
  }, []);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.IZettle);
    const eventListener = eventEmitter.addListener('izettle-login', () => {
      Alert.alert('Login Efetuado com Sucesso!');
      setLogin(false);
    });

    return () => {
      eventListener.remove();
    };
  }, []);

  return (
    <IzettleContext.Provider
      value={{
        izettle,
        loading,
        checkLogin,
        login,
        connect,
        payment,
        totem,
      }}>
      {children}
    </IzettleContext.Provider>
  );
};

function useIzettle(): IzettleContextData {
  const context = useContext(IzettleContext);
  if (!context) {
    throw new Error('useIzettle must be used within an IzettleProvider');
  }

  return context;
}

export {IzettleProvider, useIzettle};
