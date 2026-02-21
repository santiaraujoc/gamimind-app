import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, shapes, typography, shadows } from "../theme/theme";

// Componentes
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import Card from "../components/Card";
import Input from "../components/Input";
import AvatarPreview from "../components/AvatarPreview";
import Notification from "../components/Notification";
import ProgressBar from "../components/ProgressBar";
import Tabs from "../components/Tabs";
import Checkbox from "../components/Checkbox";

export default function ComponentShowcase() {
    // Estados locales para los componentes interactivos
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogVariant, setDialogVariant] = useState("alert");

    const [inputText, setInputText] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [toastType, setToastType] = useState("success");

    const [activeTabTop, setActiveTabTop] = useState(0);
    const [activeTabSeg, setActiveTabSeg] = useState(0);

    const [isChecked, setIsChecked] = useState(false);
    const [isSwitch, setIsSwitch] = useState(false);

    const openDialog = (variant) => {
        setDialogVariant(variant);
        setDialogVisible(true);
    };

    const showToast = (type) => {
        setToastType(type);
        setToastVisible(true);
    };

    return (
        <View style={styles.container}>
            <Notification
                visible={toastVisible}
                type={toastType}
                message={`This is a ${toastType} notification!`}
                onHide={() => setToastVisible(false)}
            />

            <Dialog
                visible={dialogVisible}
                onClose={() => setDialogVisible(false)}
                title={dialogVariant === "alert" ? "Atención" : "Confirmación"}
                message="Este es un ejemplo de nuestro nuevo componente de diálogo fluido."
                variant={dialogVariant}
                onConfirm={() => setDialogVisible(false)}
            />

            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Component Showcase</Text>
                    <Text style={styles.subtitle}>
                        Galería interactiva. (Theme: Soft Serenity)
                    </Text>
                </View>

                {/* --- BUTTONS --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Buttons</Text>
                    <View style={styles.componentContainer}>
                        <Button title="Primary Button" onPress={() => { }} style={styles.elementGap} />
                        <Button title="Secondary Button" variant="secondary" onPress={() => { }} style={styles.elementGap} />
                        <Button title="Outline Button" variant="outline" onPress={() => { }} style={styles.elementGap} />
                        <Button title="Disabled Button" disabled onPress={() => { }} style={styles.elementGap} />
                        <Button title="Loading Button" loading onPress={() => { }} />
                    </View>
                </View>

                {/* --- DIALOGS --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dialogs / Modals</Text>
                    <View style={styles.componentContainer}>
                        <Button title="Show Alert Dialog" variant="secondary" onPress={() => openDialog("alert")} style={styles.elementGap} />
                        <Button title="Show Confirmation Dialog" variant="outline" onPress={() => openDialog("confirmation")} />
                    </View>
                </View>

                {/* --- CARDS --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cards</Text>
                    <Card title="Activity Card" subtitle="Today, 10:00 AM" variant="activity">
                        <Text style={styles.textGray}>You have completed your morning reflection.</Text>
                    </Card>
                    <Card title="Resource Card" subtitle="Read in 5 mins" variant="resource">
                        <Text style={styles.textGray}>How to manage daily stress with ease.</Text>
                    </Card>
                    <Card title="Progress Card" subtitle="Level 3" variant="progress">
                        <Text style={styles.textGray}>Keep going! You're doing great this week.</Text>
                    </Card>
                </View>

                {/* --- INPUTS --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Inputs</Text>
                    <View style={styles.componentContainer}>
                        <Input
                            label="Standard Input"
                            placeholder="Type here..."
                            value={inputText}
                            onChangeText={setInputText}
                            style={styles.elementGap}
                        />
                        <Input
                            label="Text Area"
                            placeholder="Type a longer message..."
                            multiline
                            style={styles.elementGap}
                        />
                        <Input
                            label="Input with Error"
                            placeholder="Error example"
                            error="This field is required"
                        />
                    </View>
                </View>

                {/* --- AVATARS --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Avatars (Emotional States)</Text>
                    <View style={[styles.componentContainer, styles.rowWrapper]}>
                        <View style={styles.avatarWrap}><AvatarPreview emotion="happy" /><Text>Happy</Text></View>
                        <View style={styles.avatarWrap}><AvatarPreview emotion="neutral" /><Text>Neutral</Text></View>
                        <View style={styles.avatarWrap}><AvatarPreview emotion="sad" /><Text>Sad</Text></View>
                    </View>
                </View>

                {/* --- NOTIFICATIONS --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications (Toasts)</Text>
                    <View style={styles.componentContainer}>
                        <Button title="Success Toast" onPress={() => showToast("success")} style={styles.elementGap} />
                        <Button title="Info Toast" variant="secondary" onPress={() => showToast("info")} style={styles.elementGap} />
                        <Button title="Error Toast" variant="outline" onPress={() => showToast("error")} />
                    </View>
                </View>

                {/* --- PROGRESS BAR --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Progress Bars</Text>
                    <View style={styles.componentContainer}>
                        <Text style={[styles.label, { marginBottom: 8 }]}>Linear (50%)</Text>
                        <ProgressBar progress={0.5} style={styles.elementGap} />

                        <Text style={[styles.label, { marginBottom: 8 }]}>Circular Fallback (75%)</Text>
                        <ProgressBar progress={0.75} variant="circular" />
                    </View>
                </View>

                {/* --- TABS --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tabs</Text>
                    <View style={styles.componentContainer}>
                        <Text style={[styles.label, { marginBottom: 8 }]}>Segmented Control</Text>
                        <Tabs
                            tabs={["Daily", "Weekly", "Monthly"]}
                            activeTab={activeTabSeg}
                            onChange={setActiveTabSeg}
                            variant="segmented"
                            style={styles.elementGap}
                        />

                        <Text style={[styles.label, { marginBottom: 8 }]}>Top Tabs</Text>
                        <Tabs
                            tabs={["Feed", "Profile", "Settings"]}
                            activeTab={activeTabTop}
                            onChange={setActiveTabTop}
                            variant="top"
                        />
                    </View>
                </View>

                {/* --- CHECKBOX & SWITCH --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Checkbox & Switch</Text>
                    <View style={styles.componentContainer}>
                        <Checkbox
                            label="I agree to the terms"
                            checked={isChecked}
                            onChange={setIsChecked}
                            style={styles.elementGap}
                        />
                        <Checkbox
                            label="Enable notifications"
                            checked={isSwitch}
                            onChange={setIsSwitch}
                            variant="switch"
                            style={styles.elementGap}
                        />
                        <Checkbox
                            label="Disabled Checkbox"
                            checked={true}
                            disabled
                        />
                    </View>
                </View>

                <View style={styles.footerSpacer} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background, // F9F9F9
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: typography.sizes.title,
        fontWeight: typography.weights.bold,
        color: colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: typography.sizes.body,
        color: colors.subtext,
    },
    section: {
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: typography.sizes.title - 6,
        fontWeight: typography.weights.bold,
        color: colors.text,
        marginBottom: 16,
    },
    componentContainer: {
        backgroundColor: colors.white,
        padding: 24,
        borderRadius: shapes.borderRadiusLarge,
        ...shadows.light,
    },
    rowWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    avatarWrap: {
        alignItems: "center",
        gap: 8,
    },
    elementGap: {
        marginBottom: 16,
    },
    textGray: {
        color: colors.subtext,
        fontSize: typography.sizes.body,
    },
    label: {
        fontSize: typography.sizes.small,
        color: colors.subtext,
        marginTop: 8,
    },
    footerSpacer: {
        height: 60,
    },
});
