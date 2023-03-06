import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import { HomeStackScreenProps } from '../../../types';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';
import { FONT_500 } from '../../../constants/Style';

const AuthorizeScreen = ({ navigation }: HomeStackScreenProps<'Authorize'>) => {
	const handlePinEntered = useCallback(
		(pin: string, handleResetPin?: () => void) => {
			if (handleResetPin) {
				handleResetPin();
			}

			navigation.navigate('DebitSummary');
		},
		[]
	);

	const handleBiometricLogin = useCallback(async () => {
		navigation.navigate('DebitSummary');
	}, []);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.text}>
						Enter your pin or fingerprint to confirm transaction.
					</Text>
					<Text style={styles.subtitle} lightColor="#5F5E62">
						Enter code or fingerprint linked with your account.
					</Text>
				</View>

				<AuthenticationPinPad
					onPinEntered={handlePinEntered}
					handleBiometricLogin={handleBiometricLogin}
					showBiometricAuth={true}
				/>

				<View style={{ paddingBottom: 30 }} />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	text: {
		fontSize: 20,
		fontFamily: FONT_500,
		marginBottom: 16
	},
	subtitle: {
		fontSize: 14,
		fontFamily: FONT_500,
		marginBottom: 60
	}
});

export default AuthorizeScreen;
