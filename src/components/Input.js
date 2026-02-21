import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { colors, shapes, typography } from "../theme/theme";

export default function Input({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    multiline,
    error,
    style,
    variant = "text", // text, search(podría añadir ícono luego)
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={style}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.focusedContainer,
                    error && styles.errorContainer,
                    multiline && styles.multilineContainer,
                ]}
            >
                <TextInput
                    style={[styles.input, multiline && styles.multilineInput]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.subtext}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    textAlignVertical={multiline ? "top" : "center"}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: typography.sizes.small,
        fontWeight: typography.weights.medium,
        color: colors.text,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: shapes.borderRadiusLarge, // 20px para el campo
        borderWidth: 1,
        borderColor: "#E2E8F0",
        minHeight: 56,
        paddingHorizontal: 16,
        justifyContent: "center",
    },
    focusedContainer: {
        borderColor: colors.primary, // Sky Blue on focus
    },
    errorContainer: {
        borderColor: colors.error,
    },
    multilineContainer: {
        minHeight: 120,
        paddingTop: 16,
        paddingBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: typography.sizes.body,
        color: colors.text,
    },
    multilineInput: {
        flex: 1,
    },
    errorText: {
        color: colors.error,
        fontSize: typography.sizes.small - 2, // 12
        marginTop: 4,
        marginLeft: 4,
    },
});
