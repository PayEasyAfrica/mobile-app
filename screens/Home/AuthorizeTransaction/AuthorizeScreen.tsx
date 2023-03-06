import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { useAppDispatch } from '../../../app/hooks';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';
import { FONT_500 } from '../../../constants/Style';

const AuthorizeScreen = ({ navigation }: HomeStackScreenProps<'Authorize'>) => {
	const colorScheme = useColorScheme();

	const { orange } = Colors[colorScheme];

	const handlePinEntered = useCallback(
		(pin: string, handleResetPin?: () => void) => {
			if (handleResetPin) {
				handleResetPin();
			}

			// navigation.navigate('ConfirmPIN', { pin } as never);
		},
		[]
	);

	const handleBiometricLogin = useCallback(async () => {
		// handleLoginDispatch();
	}, []);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
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
