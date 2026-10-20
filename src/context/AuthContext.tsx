import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    email: string;
    token: string;
}

interface AuthContextData {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const SESSION_STORAGE_KEY = '@campusservice_user_session';

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const LoasSession = async () => {
            try {
                const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
                if (sessionData) setUser(JSON.parse(sessionData));
            } catch (error) {
                console.error('Error cargando sesion:', error);
            } finally {
                setIsLoading(false);
            }
        };
        LoasSession();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        if(email.includes('@') && password.length >= 6) {
            const userData: User = {email, token: 'jwt_mock_token_12345'};
            setUser(userData);
            await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
            return;
        }
        Alert.alert('Error', 'Credenciales invalidas. Por favor, verifica tu correo electronico y contraseña.');
        return;
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{user, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}