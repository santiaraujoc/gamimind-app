import React, { useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import { colors, shapes, typography, shadows } from "../theme/theme";

export default function Button({
    title,
    onPress,
    variant = "primary", // primary, secondary, outline
    disabled = false,
    loading = false,
    icon,
    iconPosition = "left",
    style,
    textStyle,
}) {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        if (!disabled && !loading) {
            Animated.spring(scaleValue, {
                toValue: 0.97,
                useNativeDriver: true,
                speed: 30, // snappy interaction
            }).start();
        }
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
            speed: 30,
        }).start();
    };

    const getBgColor = () => {
        if (disabled) return "#E2E8F0"; // greyed out
        switch (variant) {
            case "primary": return colors.primary;
            case "secondary": return colors.secondary;
            case "accept": return colors.success; // strictly mint green
            case "outline": return "transparent";
            default: return colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return "#A0AEC0"; // muted text
        switch (variant) {
            case "primary": return colors.text;
            case "secondary": return colors.text;
            case "accept": return colors.text;
            case "outline": return colors.text; // outline uses dark text
            default: return colors.text;
        }
    };

    const isOutline = variant === "outline";

    return (
        <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                disabled={disabled || loading}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={[
                    styles.button,
                    { backgroundColor: getBgColor() },
                    isOutline && styles.outlineStyle,
                    disabled && styles.disabledStyle,
                ]}
            >
                <View style={styles.content}>
                    {loading ? (
                        <ActivityIndicator color={getTextColor()} />
                    ) : (
                        <>
                            {icon && iconPosition === "left" && (
                                <View style={styles.iconSpacedLeft}>{icon}</View>
                            )}
                            {title && (
                                <Text
                                    style={[
                                        styles.text,
                                        { color: getTextColor() },
                                        textStyle,
                                    ]}
                                >
                                    {title}
                                </Text>
                            )}
                            {icon && iconPosition === "right" && (
                                <View style={styles.iconSpacedRight}>{icon}</View>
                            )}
                        </>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 56,
        borderRadius: shapes.borderRadiusPill, // 30px
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        alignSelf: "center",
        flexDirection: "row",
        ...shadows.light, // Added dynamic shadow back to make it less flat
    },
    outlineStyle: {
        borderWidth: 2,
        borderColor: colors.text,
        elevation: 0, // Outline buttons usually don't have shadow
        shadowOpacity: 0,
    },
    disabledStyle: {
        shadowOpacity: 0,
        elevation: 0, // completely flat when disabled
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: typography.sizes.body,
        fontWeight: typography.weights.medium,
        textAlign: "center",
        letterSpacing: 0.5,
    },
    iconSpacedLeft: {
        marginRight: 8,
    },
    iconSpacedRight: {
        marginLeft: 8,
    },
});
