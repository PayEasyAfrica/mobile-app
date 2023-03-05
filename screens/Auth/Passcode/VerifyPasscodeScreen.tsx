import { useCallback, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { useAppDispatch } from '../../../app/hooks';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import styles from './PasscodeScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackScreenProps } from '../../../types';
import { useRoute } from '@react-navigation/native';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';

const INVALID_PASSCODE_TITLE = 'Passcode Mismatch';
const INVALID_PASSCODE_MESSAGE = 'Your passcode does not match';

const VerifyPasscodeScreen = ({
	navigation
}: RootStackScreenProps<'VerifyPasscode'>) => {
	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme();

	const [userFirstname, setUserFirstname] = useState('');

	const { orange } = Colors[colorScheme];

	const route = useRoute();
	const { pin: prevPin } = route.params as { pin: string };

	useEffect(() => {
		AsyncStorage.getItem('userData').then((userData) => {
			if (userData) {
				const { user, token } = JSON.parse(userData);
				console.log(user, token);
				setUserFirstname(user.name.split(' ')[0]);
			}
		});
	}, []);

	const handlePinEntered = useCallback(async (pin: string) => {
		if (prevPin === pin) {
			console.log(pin);
			navigation.navigate('Passcode');
		} else {
			Alert.alert(INVALID_PASSCODE_TITLE, INVALID_PASSCODE_MESSAGE);
		}
	}, []);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<Text style={[styles.title, { textAlign: 'center', marginBottom: 32 }]}>
				Confirm Passcode.
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

export default VerifyPasscodeScreen;
