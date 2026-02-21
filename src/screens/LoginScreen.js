import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { loginUser } from "../services/authService";
import MainButton from "../components/MainButton";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <View style={styles.screen}>
      <Pressable style={styles.closeButton} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.closeButtonText}>X</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>Inicio de sesión</Text>

        <View style={styles.inputSlot}>
          {/* Reemplazar este TextInput por el Custom Line Edit de Usuario */}
          <TextInput
            style={styles.basicInput}
            placeholder="Usuario / Correo"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputSlot}>
          {/* Reemplazar este TextInput por el Custom Line Edit de Contraseña */}
          <TextInput
            style={styles.basicInput}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <MainButton title="Entrar" onPress={handleLogin} style={styles.loginButton} />

        <Pressable style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>¿Has olvidado tu contraseña?</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 30,
    zIndex: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
  },
  content: {
    width: "100%",
  },
  logoContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logoText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  inputSlot: {
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputSlotText: {
    fontSize: 14,
  },
  basicInput: {
    height: 44,
    paddingHorizontal: 10,
  },
  loginButton: {
    marginTop: 8,
    width: 200,
  },
  forgotPasswordButton: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 14,
  },
});
