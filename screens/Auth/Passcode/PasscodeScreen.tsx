import { useCallback, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { useAppDispatch } from '../../../app/hooks';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { login } from '../../../features/auth/authSlice';
import useColorScheme from '../../../hooks/useColorScheme';

import styles from './PasscodeScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';

const PasscodeScreen = () => {
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

	const handlePinEntered = useCallback(async (pin: string) => {
		// TODO: Use the pin enter to handle login
		console.log(pin);
		handleLoginDispatch();
	}, []);

	const handleBiometricLogin = useCallback(async () => {
		handleLoginDispatch();
	}, []);

	const handleLoginDispatch = useCallback(async () => {
		/* Dispatching the login action to the redux store. */
		await dispatch(login('admin', 'admin'))
			.then(() => {
				// Do nothing
			})
			.catch((error: Error) => {
				console.log(error.message);
				Alert.alert('Login failed', error.message, [
					{
						text: 'Retry',
						onPress: () => console.log('retry pressed')
					}
				]);
			});
	}, []);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			{userFirstname && (
				<Text style={styles.title}>Welcome {userFirstname}!</Text>
			)}
			<Text style={styles.subtitle} lightColor="#5F5E62">
				Enter code or fingerprint to login
			</Text>

			<AuthenticationPinPad
				onPinEntered={handlePinEntered}
				handleBiometricLogin={handleBiometricLogin}
				showBiometricAuth={true}
			/>

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

export default PasscodeScreen;
