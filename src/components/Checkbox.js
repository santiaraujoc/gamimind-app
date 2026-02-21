import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import { colors, shapes, typography } from "../theme/theme";

export default function Checkbox({
    label,
    checked,
    onChange,
    variant = "checkbox", // checkbox, switch
    disabled = false,
    style,
}) {
    // Para el switch
    const switchAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

    useEffect(() => {
        if (variant === "switch") {
            Animated.timing(switchAnim, {
                toValue: checked ? 1 : 0,
                duration: 200,
                useNativeDriver: false, // Animating backgroundColor and margin requires false
            }).start();
        }
    }, [checked, variant]);

    if (variant === "switch") {
        return (
            <Pressable
                style={[styles.container, style, disabled && styles.disabled]}
                onPress={() => onChange && onChange(!checked)}
                disabled={disabled}
                accessible
                accessibilityRole="switch"
                accessibilityState={{ checked, disabled }}
            >
                <Animated.View
                    style={[
                        styles.switchTrack,
                        {
                            backgroundColor: switchAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["#E2E8F0", colors.accent], // Grey to Mint Green
                            }),
                        },
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.switchThumb,
                            {
                                transform: [
                                    {
                                        translateX: switchAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [2, 22], // Move thumb from left to right
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                </Animated.View>
                {label && <Text style={styles.label}>{label}</Text>}
            </Pressable>
        );
    }

    // Default Checkbox
    return (
        <Pressable
            style={[styles.container, style, disabled && styles.disabled]}
            onPress={() => onChange && onChange(!checked)}
            disabled={disabled}
            accessible
            accessibilityRole="checkbox"
            accessibilityState={{ checked, disabled }}
        >
            <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
                {checked && <View style={styles.checkboxCheckmark} />}
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    disabled: {
        opacity: 0.5,
    },
    label: {
        marginLeft: 12,
        fontSize: typography.sizes.body,
        color: colors.text,
    },
    // Checkbox rules
    checkboxBox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: colors.subtext,
        borderRadius: 6, // ligeramente redondeado
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        ...shadows.light,
    },
    checkboxBoxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkboxCheckmark: {
        width: 12,
        height: 12,
        backgroundColor: colors.white,
        borderRadius: 2,
    },
    // Switch rules
    switchTrack: {
        width: 50,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
    },
    switchThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.white,
        position: "absolute",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});
