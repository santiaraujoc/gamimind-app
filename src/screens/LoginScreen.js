import { View, Text, Button } from "react-native";
import { loginUser } from "../services/authService";

export default function LoginScreen() {
  const handleLogin = async () => {
    try {
      await loginUser("test@test.com", "123456");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
