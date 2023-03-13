import { useCallback } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import styles from './PasscodeScreen.styles';
import Colors from '../../../constants/Colors';
import { RootStackScreenProps } from '../../../types';
import useColorScheme from '../../../hooks/useColorScheme';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';

const SetPasscodeScreen = ({
	navigation
}: RootStackScreenProps<'SetPasscode'>) => {
	const colorScheme = useColorScheme();

	const { orange } = Colors[colorScheme];

	const handlePinEntered = useCallback(
		(pin: string, handleResetPin?: () => void) => {
			if (handleResetPin) {
				handleResetPin();
			}

			navigation.navigate('VerifyPasscode', { pin } as never);
		},
		[]
	);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<Text style={[styles.title, { textAlign: 'center', marginBottom: 32 }]}>
				Set Passcode.
			</Text>

			<AuthenticationPinPad onPinEntered={handlePinEntered} />

			<View style={styles.signoutContainer}>
				<Text style={styles.signoutText}>Not your account? </Text>
				<TouchableOpacity
					onPress={() => {
						Alert.alert('Sign out', 'Are you sure you want to logout??', [
							{
								text: 'Yes',
								onPress: () => console.log('Yes pressed')
							},
							{
								text: 'No',
								onPress: () => console.log('No pressed')
							}
						]);
					}}
				>
					<Text style={[styles.signoutText, { color: orange, fontSize: 16 }]}>
						Log out
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default SetPasscodeScreen;
