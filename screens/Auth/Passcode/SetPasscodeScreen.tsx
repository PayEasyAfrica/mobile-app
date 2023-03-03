import { useCallback, useEffect, useState } from 'react';
import {
	Alert,
	TouchableOpacity,
	Vibration,
	View as DefaultView
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import { useAppDispatch } from '../../../app/hooks';
import { CancelPinIcon } from '../../../components/CustomIcons';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import styles from './PasscodeScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackScreenProps } from '../../../types';
import { HandlePressFunc, PinPadProps } from './types';

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

			<PinPad onPinEntered={handlePinEntered} />

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

const PinPad: React.FC<PinPadProps> = ({ onPinEntered }) => {
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

	const handlePress: HandlePressFunc = useCallback(
		(number) => {
			if (pin.length < 6) {
				Vibration.vibrate(60);
				setPin(pin + number);
				if (pin.length === 5) {
					setTimeout(() => {
						onPinEntered(pin + number, handleResetPin);
					}, 500);
				}
			}
		},
		[pin]
	);

	const handleDelete = useCallback(() => {
		if (pin.length > 0) {
			Vibration.vibrate(60);
			setPin(pin.substring(0, pin.length - 1));
		}
	}, [pin]);

	const handleResetPin = useCallback(() => {
		setPin('');
	}, []);

	return (
		<View style={[styles.pinContainer, { marginTop: 20 }]}>
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
								{!isCancel && !isNumber ? (
									<DefaultView style={styles.keypadButton} />
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

export default SetPasscodeScreen;
