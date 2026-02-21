import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import MainButton from "../components/MainButton";
import { registerUser } from "../services/authService";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const handleRegister = async () => {
        console.log("=== DEBUG REGISTER ===");
        console.log("username:", username);
        console.log("email:", email);
        console.log("age:", age);
        console.log("gender:", gender, "type:", typeof gender);
        console.log("password:", password ? "***" : "empty");
        console.log("=====================");
        
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        
        // Debug: verificar el valor del género
        if (!gender) {
            alert("Por favor selecciona un género antes de continuar");
            return;
        }
        
        try {
            // Enviar género como array según requerimientos del backend
            await registerUser(email, password, username, parseInt(age), [gender]);
        } catch (error) {
            alert(error.message || "Error al registrar usuario");
        }
    };

    return (
        <View style={styles.screen}>
            <Pressable style={styles.closeButton} onPress={() => navigation.navigate('Welcome')}>
                <Text style={styles.closeButtonText}>X</Text>
            </Pressable>

            <View style={styles.content}>
                <Text style={styles.title}>Regístrate</Text>

                <View style={styles.inputSlot}>
                    <TextInput
                        style={styles.basicInput}
                        placeholder="Usuario"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputSlot}>
                    <TextInput
                        style={styles.basicInput}
                        placeholder="Correo"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputSlot}>
                    <TextInput
                        style={styles.basicInput}
                        placeholder="Edad"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                        maxLength={3}
                    />
                </View>

                {/* Género */}
                <View style={styles.genderSlot}>
                    <Text style={styles.genderLabel}>Género</Text>
                    <View style={styles.genderButtons}>
                        {["Hombre", "Mujer", "Otro"].map((label) => {
                            const value = label.toLowerCase();
                            const selected = gender === value;
                            return (
                                <Pressable
                                    key={value}
                                    onPress={() => setGender(value)}
                                    style={[styles.genderBtn, selected && styles.genderBtnSelected]}
                                >
                                    <Text style={[styles.genderBtnText, selected && styles.genderBtnTextSelected]}>
                                        {label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.inputSlot}>
                    <TextInput
                        style={styles.basicInput}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (passwordError) setPasswordError(false);
                        }}
                        secureTextEntry
                    />
                </View>

                <View style={styles.inputSlot}>
                    <TextInput
                        style={styles.basicInput}
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            if (passwordError) setPasswordError(false);
                        }}
                        secureTextEntry
                    />
                </View>

                {passwordError && (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>Las contraseñas no coinciden.</Text>
                    </View>
                )}

                <MainButton title="Crear cuenta" onPress={handleRegister} style={styles.button} />
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
        padding: 8,
    },
    closeButtonText: {
        fontSize: 20,
    },
    content: {
        width: "100%",
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
    basicInput: {
        fontSize: 16,
    },
    inputSlotText: {
        fontSize: 14,
    },
    genderSlot: {
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    genderLabel: {
        fontSize: 15,
        marginBottom: 10,
    },
    genderButtons: {
        flexDirection: "row",
        gap: 8,
    },
    genderBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#ccc",
    },
    genderBtnSelected: {
        borderColor: "#6750a4",
        backgroundColor: "#ede9f9",
    },
    genderBtnText: {
        fontSize: 14,
        color: "#888",
    },
    genderBtnTextSelected: {
        color: "#6750a4",
        fontWeight: "600",
    },
    errorBox: {
        backgroundColor: "#fdecea",
        borderLeftWidth: 4,
        borderLeftColor: "#e53935",
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        marginBottom: 12,
        borderRadius: 4,
    },
    errorText: {
        color: "#c62828",
        fontSize: 13,
    },
    button: {
        marginTop: 8,
        width: 220,
    },
});
