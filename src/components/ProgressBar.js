import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { colors, shapes } from "../theme/theme";

export default function ProgressBar({
    progress, // Number between 0 and 1
    variant = "linear", // linear, circular (only linear supported for now via Animated.View)
    color = colors.primary,
    trackColor = "#E2E8F0",
    height = 8,
    style,
}) {
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Clamp progress between 0 and 1
        const safeProgress = Math.min(Math.max(progress, 0), 1);
        Animated.timing(widthAnim, {
            toValue: safeProgress,
            duration: 500,
            useNativeDriver: false, // width doesn't support native driver
        }).start();
    }, [progress]);

    if (variant === "circular") {
        // A real circular progress bar requires react-native-svg.
        // As a fallback without svg, we just render a simple bordered view here.
        // In a real scenario, consider using 'react-native-circular-progress' or drawing with svg.
        return (
            <View style={[styles.circularFallback, { borderColor: trackColor }, style]}>
                <View style={[styles.circularFallbackInner, { borderColor: color, transform: [{ rotate: `${progress * 360}deg` }] }]} />
            </View>
        );
    }

    // Linear progress bar
    return (
        <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }, style]}>
            <Animated.View
                style={[
                    styles.fill,
                    {
                        backgroundColor: color,
                        borderRadius: height / 2,
                        width: widthAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"],
                        }),
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        width: "100%",
        overflow: "hidden",
    },
    fill: {
        height: "100%",
    },
    circularFallback: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularFallbackInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 8,
        position: 'absolute',
        top: -8, // compensate for border
        left: -8,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
        // other border is filled
    }
});
