import { View, Text, Button } from "react-native";
import { logoutUser } from "../services/authService";

export default function HomeScreen() {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}
