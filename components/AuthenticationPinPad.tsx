import { useCallback, useEffect, useState } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Vibration,
	View as DefaultView
} from 'react-native';
import { CancelPinIcon, FingerprintIcon } from './CustomIcons';
import { Text, View } from './Themed';

import * as LocalAuthentication from 'expo-local-authentication';
import { HandlePressFunc, PinPadProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { FONT_700 } from '../constants/Style';
import Layout from '../constants/Layout';

const AuthenticationPinPad: React.FC<PinPadProps> = ({
	onPinEntered,
	handleBiometricLogin,
	showBiometricAuth = false
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
						const isFingerprint = value === 'fingerprint';
						const isCancel = value === 'cancel';

						if (showBiometricAuth) {
							return (
								<TouchableOpacity
									key={value}
									style={[
										styles.keypadButton,
										isNumber && { backgroundColor: iconBackground }
									]}
									onPress={() =>
										isNumber ? handlePress(value) : handleDelete()
									}
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

const styles = StyleSheet.create({
	pinContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 90
	},
	pinDisplay: {
		flexDirection: 'row',
		marginBottom: 16
	},
	pinDigitContainer: {
		width: 10,
		height: 10,
		borderRadius: 50,
		backgroundColor: '#FFDBCE',
		marginHorizontal: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
	pinDigitContainerFilled: {
		width: 13,
		height: 13,
		backgroundColor: '#EF672A'
	},
	pinDigit: {
		fontSize: 24
	},
	keypad: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	keypadIcon: {
		width: Layout.isSmallDevice ? 50 : 65,
		height: Layout.isSmallDevice ? 50 : 65,
		justifyContent: 'center',
		alignItems: 'center'
		// marginVertical: 19,
		// marginHorizontal: 27
	},
	keypadButton: {
		borderRadius: 50,
		width: 50,
		height: 50,
		marginVertical: 19,
		marginHorizontal: 27,
		alignItems: 'center',
		justifyContent: 'center'
	},
	keypadButtonText: {
		fontSize: 28,
		fontFamily: FONT_700
	},
	deleteButton: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		width: 80,
		height: 80,
		margin: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightgray'
	},
	deleteButtonText: {
		fontSize: 24,
		color: 'white'
	}
});

export default AuthenticationPinPad;
