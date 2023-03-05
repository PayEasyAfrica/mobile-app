import { useCallback, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { useAppDispatch } from '../../../app/hooks';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import styles from './PasscodeScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackScreenProps } from '../../../types';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';

const SetPasscodeScreen = ({
	navigation
}: RootStackScreenProps<'SetPasscode'>) => {
	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme();

	const [userFirstname, setUserFirstname] = useState('');

	const { orange } = Colors[colorScheme];

	useEffect(() => {
		AsyncStorage.getItem('userData').then((userData) => {
			if (userData) {
				const { user, token } = JSON.parse(userData);
				console.log(user, token);
				// dispatch(login(username, password));
				setUserFirstname(user.name.split(' ')[0]);
			}
		});
	}, []);

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
