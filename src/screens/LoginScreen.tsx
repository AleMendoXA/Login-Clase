import {useContext, useState} from 'react';
import {Alert, View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export const LoginScreen = () => {
    const {login, isLoading} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor, ingresa tu correo electronico y contraseña.');
            return;
        }
        setIsSubmitting(true);
        await login(email, password);
        setIsSubmitting(false);
        };

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesion</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Correo Electronico"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button
                    title="Iniciar Sesion"
                    onPress={handleLogin}
                    disabled={isLoading}
                />
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,    
    justifyContent: 'center',
    padding: 20,
    marginBottom:20,
    },  
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    },
    input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    },
});