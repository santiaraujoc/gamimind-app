import { View, Text, Image, StyleSheet } from "react-native";
import MainButton from "../components/MainButton";

export default function WelcomeScreen({ navigation }) {
	return (
		<View style={styles.screen}>
			<View style={styles.content}>
				<Image source={require("../../assets/logo.png")} style={styles.logo} />

				<Text style={styles.title}>Bienvenid@</Text>
				
				<MainButton
					title="Iniciar sesión"
					onPress={() => navigation.navigate("Login")}
					style={styles.button}
					textStyle={styles.buttonText}
				/>

				<MainButton
					title="Registrarse"
					onPress={() => navigation.navigate("Register")}
					style={styles.button}
					textStyle={styles.buttonText}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 24,
	},
	content: {
		width: "100%",
		alignItems: "center",
	},
	logo: {
		width: 240,
		height: 240,
		resizeMode: "contain",
		marginBottom: 20,
	},
	title: {
		fontSize: 26,
		marginBottom: 8,
		textAlign: "center",
        color: "#6750a4",
	},
	subtitle: {
		fontSize: 14,
		textAlign: "center",
		marginBottom: 28,
	},
	button: {
		width: 240,
		marginBottom: 12,
	},
	buttonText: {
		fontSize: 22,
	},
});
