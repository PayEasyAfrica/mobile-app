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
import { useRoute } from '@react-navigation/native';

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

export default VerifyPasscodeScreen;
