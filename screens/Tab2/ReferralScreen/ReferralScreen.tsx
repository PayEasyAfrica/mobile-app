import {
	Image,
	StyleSheet,
	TouchableOpacity,
	View as RNView
} from 'react-native';
import { CopyIcon } from '../../../components/CustomIcons';

import EditScreenInfo from '../../../components/EditScreenInfo';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { FONT_500 } from '../../../constants/Style';
import useColorScheme from '../../../hooks/useColorScheme';

export default function ReferralScreen() {
	const colorScheme = useColorScheme();
	const { gray, lightBackground, darkBackground, orange, iconBackground } =
		Colors[colorScheme];

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Referral code</Text>

			<View style={{ alignItems: 'center', marginTop: 60 }}>
				<View
					style={[
						{
							position: 'relative',
							width: 136,
							height: 136,
							borderRadius: 100
						},
						styles.shadow
					]}
					lightColor={lightBackground}
					darkColor={iconBackground}
				>
					{/* <View
						style={{
							position: 'absolute',
							width: 40,
							height: 40,
							borderRadius: 100,
							top: 0,
							left: 0
						}}
					>
						<Image
							source={require('../../../assets/images/ellipse1.png')}
							style={{
								width: '100%',
								height: '100%',
								resizeMode: 'cover'
							}}
						/>
					</View>

					<View style={{ width: 42, height: 42, borderRadius: 100 }}>
						<Image
							source={require('../../../assets/images/ellipse2.png')}
							style={{
								width: '100%',
								height: '100%',
								resizeMode: 'cover'
							}}
						/>
					</View>

					<View style={{ width: 27, height: 27, borderRadius: 100 }}>
						<Image
							source={require('../../../assets/images/ellipse3.png')}
							style={{
								width: '100%',
								height: '100%',
								resizeMode: 'cover'
							}}
						/>
					</View> */}
				</View>
			</View>

			<View style={{ alignItems: 'center', marginTop: 48 }}>
				<Text
					style={{
						fontSize: 20,
						fontFamily: FONT_500,
						textAlign: 'center',
						marginBottom: 24
					}}
				>
					Get Referral Commission
				</Text>

				<Text
					style={{
						fontSize: 16,
						fontFamily: FONT_500,
						textAlign: 'center',
						color: gray,
						maxWidth: 331,
						marginBottom: 58
					}}
				>
					You’ll get transaction commission when they sign up
				</Text>
			</View>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: iconBackground,
					paddingVertical: 18,
					marginHorizontal: 17,
					borderRadius: 8
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontFamily: FONT_500,
						marginRight: 8
					}}
				>
					00112FG
				</Text>
				<TouchableOpacity onPress={() => {}}>
					<CopyIcon color={orange} />
				</TouchableOpacity>
			</View>

			<TouchableOpacity onPress={() => {}} style={{ marginTop: 101 }}>
				<View style={[styles.button, { backgroundColor: orange }]}>
					<Text
						style={styles.buttonText}
						lightColor={lightBackground}
						darkColor={darkBackground}
					>
						Continue
					</Text>
				</View>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	title: {
		fontSize: 24,
		fontFamily: FONT_500,
		textAlign: 'center',
		marginTop: 25
	},
	shadow: {
		// elevation: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 10
		},
		shadowOpacity: 0.04,
		shadowRadius: 20
	},
	button: {
		paddingVertical: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8
	},
	buttonText: {
		fontSize: 16,
		fontFamily: FONT_500
	}
});
