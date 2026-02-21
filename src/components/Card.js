import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, shapes, shadows, typography } from "../theme/theme";

export default function Card({
    title,
    subtitle,
    children,
    style,
    contentStyle,
    variant = "default", // default, activity, resource, progress
}) {
    // Definimos colores de fondo según la variante, para dar toques sutiles
    const getVariantBg = () => {
        switch (variant) {
            case "activity": return colors.accent; // Mint Green
            case "resource": return colors.primary; // Sky Blue
            case "progress": return colors.secondary; // Lavender
            default: return colors.white;
        }
    };

    const isWhite = variant === "default";

    return (
        <View style={[styles.card, { backgroundColor: getVariantBg() }, style]}>
            {/* Si no es default, le damos un estilo en el que la tarjeta base tiene el color, 
                pero el interior se blanquea ligeramente, o mostramos header coloreado y fondo blanco. 
                Siguiendo el estilo minimalista, haremos un contenedor interior blanco para el contenido */}

            <View style={styles.header}>
                {title && (
                    <Text style={[styles.title, !isWhite && { color: colors.text }]}>
                        {title}
                    </Text>
                )}
                {subtitle && (
                    <Text style={[styles.subtitle, !isWhite && { color: colors.text }]}>
                        {subtitle}
                    </Text>
                )}
            </View>

            <View style={[styles.content, isWhite ? null : styles.innerBox, contentStyle]}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: shapes.borderRadiusLarge,
        ...shadows.light,
        overflow: "hidden", // keeps inner elements bounded by radius
        marginBottom: 16,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 12,
    },
    title: {
        fontSize: typography.sizes.body + 2,
        fontWeight: typography.weights.bold,
        color: colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: typography.sizes.small,
        color: colors.subtext,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    innerBox: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: shapes.borderRadiusLarge - 4,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
    }
});
