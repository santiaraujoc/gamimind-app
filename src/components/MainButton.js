import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MainButton({title, onPress, icon, iconPosition = "right", disabled = false, style, textStyle,}) {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [
				styles.button,
				pressed && !disabled ? styles.pressed : null,
				disabled ? styles.disabled : null,
				style,
			]}
		>
			<View style={styles.content}>
				{icon && iconPosition === "left" ? (
					<View style={styles.iconSlot}>{icon}</View>
				) : null}

				<Text style={[styles.text, textStyle]}>{title}</Text>

				{icon && iconPosition === "right" ? (
					<View style={styles.iconSlot}>{icon}</View>
				) : null}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		minHeight: 56,
		borderRadius: 20,
		backgroundColor: "#d8cfee",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		alignSelf: "center",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	text: {
		fontSize: 25,
		color: "#4b4660",
		fontWeight: "500",
	},
	iconSlot: {
		justifyContent: "center",
		alignItems: "center",
	},
	pressed: {
		opacity: 0.85,
	},
	disabled: {
		opacity: 0.6,
	},
});
