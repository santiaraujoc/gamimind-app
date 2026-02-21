import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, typography } from "../theme/theme";

export default function AvatarPreview({
    emotion = "neutral", // neutral, happy, sad
    size = 64,
    style,
}) {
    // Mapeo básico de emociones a colores del brand y emojis textuales de ejemplo
    // Neutral = Light background, Happy = Mint green, Sad = Sky Blue o Lavender
    const getEmotionProps = () => {
        switch (emotion) {
            case "happy":
                return { bg: colors.accent, face: "😊" };
            case "sad":
                return { bg: colors.primary, face: "😔" };
            default:
                return { bg: "#E2E8F0", face: "😐" };
        }
    };

    const props = getEmotionProps();

    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: props.bg,
                },
                style,
            ]}
        >
            <Text style={{ fontSize: size * 0.5 }}>{props.face}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        ...shadows.light,
    },
});
