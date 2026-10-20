import {useContext} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {LoginScreen} from '../screens/LoginScreen';

export default function Index() {
  const {user, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Bienvenido, {user.email}!</Text>
    </View>
  );
}