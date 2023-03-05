import { useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { SafeAreaView, Text } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { SettingsStackScreenProps } from '../../../types';
import { useRoute } from '@react-navigation/native';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';
import { FONT_500 } from '../../../constants/Style';

const INVALID_PASSCODE_TITLE = 'Passcode Mismatch';
const INVALID_PASSCODE_MESSAGE = 'Your passcode does not match';

const VALID_PASSCODE_TITLE = 'Passcode Mismatch';
const VALID_PASSCODE_MESSAGE = 'Your passcode hass been successfully changed';

const ConfirmPINScreen = ({
	navigation
}: SettingsStackScreenProps<'ConfirmPIN'>) => {
	const colorScheme = useColorScheme();

	const { orange } = Colors[colorScheme];

	const route = useRoute();
	const { pin: prevPin } = route.params as { pin: string };

	const handlePinEntered = useCallback(async (pin: string) => {
		if (prevPin === pin) {
			console.log(pin);
			Alert.alert('', VALID_PASSCODE_MESSAGE, [
				{
					text: 'Ok',
					onPress: () => navigation.navigate('Settings')
				}
			]);
		} else {
			Alert.alert(INVALID_PASSCODE_TITLE, INVALID_PASSCODE_MESSAGE);
		}
	}, []);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Confirm Passcode.</Text>

			<AuthenticationPinPad onPinEntered={handlePinEntered} />
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
		textAlign: 'center',
		marginTop: 30,
		marginBottom: 36
	}
});

export default ConfirmPINScreen;
