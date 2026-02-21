import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, Animated, SafeAreaView } from "react-native";
import { colors, shapes, shadows, typography } from "../theme/theme";

export default function Notification({
    visible,
    message,
    type = "success", // success, error, info
    onHide, // Call this automatically after X seconds
    duration = 3000,
}) {
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Show
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto hide
            const timer = setTimeout(() => {
                hide();
            }, duration);
            return () => clearTimeout(timer);
        } else {
            hide();
        }
    }, [visible]);

    const hide = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onHide && visible) onHide();
        });
    };

    const getBgColor = () => {
        if (type === "error") return colors.error;
        if (type === "info") return colors.primary;
        return colors.success; // type === success
    };

    const getTextColor = () => {
        // Para Error(rojo claro) info(azul cielo) y success(verde claro) 
        // usamos texto oscuro para contraste.
        return colors.text;
    };

    if (!visible) return null;

    return (
        <SafeAreaView style={styles.container} pointerEvents="none">
            <Animated.View
                style={[
                    styles.toast,
                    { backgroundColor: getBgColor() },
                    { transform: [{ translateY }], opacity },
                ]}
            >
                <Text style={[styles.text, { color: getTextColor() }]}>
                    {message}
                </Text>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        elevation: 9999, // ensures it stays on top on Android
    },
    toast: {
        marginHorizontal: 16,
        marginTop: 16,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: shapes.borderRadiusLarge,
        ...shadows.light,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: typography.sizes.small,
        fontWeight: typography.weights.medium,
        textAlign: "center",
    },
});
