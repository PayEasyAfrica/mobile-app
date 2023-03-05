import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { useAppDispatch } from '../../../app/hooks';
import { SafeAreaView, Text } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { RootStackScreenProps, SettingsStackScreenProps } from '../../../types';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';
import { FONT_500 } from '../../../constants/Style';

const ResetPINScreen = ({
	navigation
}: SettingsStackScreenProps<'ResetPIN'>) => {
	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme();

	const { orange } = Colors[colorScheme];

	const handlePinEntered = useCallback(
		(pin: string, handleResetPin?: () => void) => {
			if (handleResetPin) {
				handleResetPin();
			}

			navigation.navigate('ConfirmPIN', { pin } as never);
		},
		[]
	);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Change Passcode.</Text>

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

export default ResetPINScreen;
