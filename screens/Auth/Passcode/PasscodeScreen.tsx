import { useCallback, useEffect, useState } from 'react';
import {
	Alert,
	TouchableOpacity,
	Vibration,
	View as DefaultView
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import { useAppDispatch } from '../../../app/hooks';
import {
	CancelPinIcon,
	FingerprintIcon
} from '../../../components/CustomIcons';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { login } from '../../../features/auth/authSlice';
import useColorScheme from '../../../hooks/useColorScheme';

import styles from './PasscodeScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HandlePressFunc, PinPadProps } from './types';

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

			<PinPad
				onPinEntered={handlePinEntered}
				handleBiometricLogin={handleBiometricLogin}
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

const PinPad: React.FC<PinPadProps> = ({
	onPinEntered,
	handleBiometricLogin
}) => {
	const [pin, setPin] = useState('');
	const [hasBiometricHardware, setHasBiometricHardware] = useState(false);

	const colorScheme = useColorScheme();

	const { iconBackground, orange } = Colors[colorScheme];

	useEffect(() => {
		const checkHardware = async () => {
			const result = await LocalAuthentication.hasHardwareAsync();
			setHasBiometricHardware(result);
		};
		checkHardware();
	}, []);

	const handlePress: HandlePressFunc = (number) => {
		if (pin.length < 6) {
			Vibration.vibrate(60);
			setPin(pin + number);
			if (pin.length === 5) {
				setTimeout(() => {
					onPinEntered(pin + number);
				}, 500);
			}
		}
	};

	const handleDelete = () => {
		if (pin.length > 0) {
			Vibration.vibrate(60);
			setPin(pin.substring(0, pin.length - 1));
		}
	};

	const handleBiometricAuthentication = async () => {
		Vibration.vibrate(60);

		const result = await LocalAuthentication.authenticateAsync({
			promptMessage: 'Scan your fingerprint',
			cancelLabel: 'Cancel',
			disableDeviceFallback: true
		});

		if (result.success) {
			console.log('Biometric authentication successful');
			if (handleBiometricLogin) {
				handleBiometricLogin();
			}
		} else {
			console.log('Biometric authentication failed');
			// TODO: Handle Biometric authentication failed prompt
		}
	};

	return (
		<View style={styles.pinContainer}>
			<View style={styles.pinDisplay}>
				{Array.from({ length: 6 }, (_, i) => (
					<View
						key={i}
						style={[
							styles.pinDigitContainer,
							pin[i] ? styles.pinDigitContainerFilled : null
						]}
					>
						{/* <Text style={styles.pinDigit}>{pin[i] || '*'}</Text> */}
					</View>
				))}
			</View>

			<View style={styles.keypad}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 'fingerprint', 0, 'cancel'].map(
					(value) => {
						const isNumber = typeof value === 'number';
						const isFingerprint = value === 'fingerprint';
						const isCancel = value === 'cancel';

						return (
							<TouchableOpacity
								key={value}
								style={[
									styles.keypadButton,
									isNumber && { backgroundColor: iconBackground }
								]}
								onPress={() => (isNumber ? handlePress(value) : handleDelete())}
							>
								{isFingerprint && !hasBiometricHardware ? (
									<DefaultView style={styles.keypadButton} />
								) : isFingerprint && hasBiometricHardware ? (
									<TouchableOpacity
										key={value}
										style={[styles.keypadButton]}
										onPress={handleBiometricAuthentication}
									>
										<FingerprintIcon color={orange} />
									</TouchableOpacity>
								) : isNumber ? (
									<Text style={[styles.keypadButtonText, { color: orange }]}>
										{value}
									</Text>
								) : (
									<CancelPinIcon color={orange} />
								)}
							</TouchableOpacity>
						);
					}
				)}
			</View>
		</View>
	);
};

export default PasscodeScreen;
