import React, { useRef, useEffect } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Animated,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { colors, shapes, shadows, typography } from "../theme/theme";
import Button from "./Button";

export default function Dialog({
    visible,
    onClose,
    title,
    message,
    variant = "alert", // alert, confirmation, form
    onConfirm,
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    children, // Para el variant 'form'
}) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current; // starts a bit lower

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            fadeAnim.setValue(0);
            slideAnim.setValue(50);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.overlay}
            >
                {/* Fondo oscuro para cerrar si lo tocan */}
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
                    <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
                </Pressable>

                <Animated.View
                    style={[
                        styles.dialogContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {title && <Text style={styles.title}>{title}</Text>}
                    {message && <Text style={styles.message}>{message}</Text>}

                    {variant === "form" && <View style={styles.formContainer}>{children}</View>}

                    <View style={styles.buttonContainer}>
                        {(variant === "confirmation" || variant === "form") && (
                            <Button
                                title={cancelText}
                                variant="outline"
                                onPress={onClose}
                                style={styles.button}
                                textStyle={{ fontSize: typography.sizes.small }}
                            />
                        )}
                        <Button
                            title={confirmText}
                            variant="accept"
                            onPress={onConfirm || onClose}
                            style={styles.button}
                            textStyle={{ fontSize: typography.sizes.small }}
                        />
                    </View>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(45, 62, 80, 0.4)", // Dark blue with opacity
    },
    dialogContainer: {
        backgroundColor: colors.white,
        borderRadius: shapes.borderRadiusLarge, // 20px
        padding: 24,
        marginHorizontal: 24,
        width: "85%",
        maxWidth: 400,
        ...shadows.light,
    },
    title: {
        fontSize: typography.sizes.title - 6, // 22px
        fontWeight: typography.weights.bold,
        color: colors.text,
        marginBottom: 12,
        textAlign: "center",
    },
    message: {
        fontSize: typography.sizes.body,
        color: colors.subtext,
        marginBottom: 24,
        textAlign: "center",
        lineHeight: 22,
    },
    formContainer: {
        marginBottom: 24,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: 8,
    },
    button: {
        flex: 1,
        minHeight: 48,
    },
});
