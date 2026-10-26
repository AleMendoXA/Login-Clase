import { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";

export default function RootNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  // Mientras revisa si hay sesión guardada
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  // Sin sesión: solo puede ver el login
  if (!user) return <LoginScreen />;

  // Con sesión: puede ver la pantalla de bienvenida
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
});