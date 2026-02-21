import React from "react";
import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import { colors, shapes, typography, shadows } from "../theme/theme";

export default function Tabs({
    tabs, // Array of strings e.g. ["Tab 1", "Tab 2"]
    activeTab, // Index of active tab
    onChange, // Function to call with new index
    variant = "segmented", // segmented or top
    style,
}) {
    if (variant === "top") {
        return (
            <View style={[styles.topContainer, style]}>
                {tabs.map((tab, index) => {
                    const isActive = activeTab === index;
                    return (
                        <Pressable
                            key={index}
                            style={[styles.topTab, isActive && styles.topTabActive]}
                            onPress={() => onChange(index)}
                        >
                            <Text style={[styles.topTabText, isActive && styles.topTabTextActive]}>
                                {tab}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        );
    }

    // Segmented Control
    return (
        <View style={[styles.segmentedContainer, style]}>
            {tabs.map((tab, index) => {
                const isActive = activeTab === index;
                return (
                    <Pressable
                        key={index}
                        style={[styles.segmentedTab, isActive && styles.segmentedTabActive]}
                        onPress={() => onChange(index)}
                    >
                        <Text
                            style={[
                                styles.segmentedTabText,
                                isActive && styles.segmentedTabTextActive,
                            ]}
                        >
                            {tab}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    // Segmented
    segmentedContainer: {
        flexDirection: "row",
        backgroundColor: "#E2E8F0",
        borderRadius: shapes.borderRadiusPill, // pill shaped
        padding: 4,
    },
    segmentedTab: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: shapes.borderRadiusPill,
    },
    segmentedTabActive: {
        backgroundColor: colors.white,
        ...shadows.light, // iOS shadow, android elevation
    },
    segmentedTabText: {
        fontSize: typography.sizes.small,
        fontWeight: typography.weights.medium,
        color: colors.subtext,
    },
    segmentedTabTextActive: {
        color: colors.text,
        fontWeight: typography.weights.bold,
    },

    // Top Tabs
    topContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    topTab: {
        flex: 1,
        paddingVertical: 14,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    topTabActive: {
        borderBottomColor: colors.primary, // sky blue
    },
    topTabText: {
        fontSize: typography.sizes.body,
        fontWeight: typography.weights.medium,
        color: colors.subtext,
    },
    topTabTextActive: {
        color: colors.primary,
        fontWeight: typography.weights.bold,
    },
});
