import { useCallback, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import {
	deleteSecureSaveItem,
	getSecureSaveValue
} from '../../../components/utils/functions';
import {
	OTP_VERIFICATION_DATA,
	PASSCODE,
	PASSCODE_VERIFICATION_DATA
} from '../../../constants/Variables';
import styles from './PasscodeScreen.styles';
import Colors from '../../../constants/Colors';
import { useAppDispatch } from '../../../app/hooks';
import { login } from '../../../features/auth/authSlice';
import { verificationLogout } from '../../../features/signin/signinSlice';
import useColorScheme from '../../../hooks/useColorScheme';

import AuthenticationPinPad from '../../../components/AuthenticationPinPad';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import LoadingScreen from '../../LoadingScreen';
import { finishLoading, startLoading } from '../../../features/loadingSlice';

const PasscodeScreen = () => {
	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme();

	const [loading, setLoading] = useState(true);
	const [userFirstname, setUserFirstname] = useState('');

	const { orange } = Colors[colorScheme];

	useEffect(() => {
		dispatch(startLoading());
		getSecureSaveValue(OTP_VERIFICATION_DATA).then((userData) => {
			if (userData) {
				const { user } = JSON.parse(userData);
				setUserFirstname(user.name.split(' ')[0]);
			}
		});

		getSecureSaveValue(PASSCODE).then((passcode) => {
			if (passcode) {
				dispatch(finishLoading());
				setLoading(false);
			} else {
				dispatch(verificationLogout());
			}
		});
	}, []);

	const handlePinEntered = useCallback(
		async (pin: string, handleResetPin?: () => void) => {
			// TODO: Use the pin enter to handle login
			console.log('handlePinEntered', pin);

			getSecureSaveValue(PASSCODE)
				.then((passcode) => {
					if (passcode !== pin) {
						throw new Error('Invalid Passcode');
					}

					handleLoginDispatch(passcode);
				})
				.catch((error) => {
					console.debug(error);
					Alert.alert('Invalid Passcode', 'Please enter a valid passcode', [
						{ text: 'OK', onPress: handleResetPin }
					]);
				});
		},
		[]
	);

	const handleBiometricLogin = useCallback(async () => {
		getSecureSaveValue(PASSCODE)
			.then((passcode) => {
				if (passcode) {
					handleLoginDispatch(passcode);
				}
			})
			.catch((error) => {
				console.debug(error);
				Alert.alert('Error signing in', 'Please try again');
			});
	}, []);

	const handleLogoutPasscode = useCallback(async () => {
		Alert.alert('Sign out', 'Are you sure you want to logout??', [
			{
				text: 'Yes',
				onPress: () => {
					dispatch(verificationLogout());
				}
			},
			{
				text: 'No',
				onPress: () => console.log('No pressed')
			}
		]);
	}, []);

	const handleLoginDispatch = useCallback(async (passcode?: string) => {
		/* Dispatching the login action to the redux store. */
		passcode &&
			(await dispatch(login(passcode)).catch((error: Error) => {
				console.debug('PasscodeScreen', error.message);

				Alert.alert(
					'Login failed',
					"Sorry, we couldn't authenticate your credentials"
				);
				// } else {
				// 	Alert.alert('Login failed', error.message);
			}));
	}, []);

	if (loading) {
		return <LoadingScreen />;
	}

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
				<TouchableOpacity onPress={handleLogoutPasscode}>
					<Text style={[styles.signoutText, { color: orange, fontSize: 16 }]}>
						Log out
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default PasscodeScreen;
