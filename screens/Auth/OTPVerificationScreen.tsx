import {
	TouchableOpacity,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { SafeAreaView, Text, View } from '../../components/Themed';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RootStackScreenProps } from '../../types';
import { finishLoading, startLoading } from '../../features/loadingSlice';
import { useAppDispatch } from '../../app/hooks';

import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL, Http } from '../../components/utils/http';
import { BORDER_RADIUS, FONT_400, FONT_500 } from '../../constants/Style';

const INVALID_OTP_TITLE = 'Invalid OTP';
const INVALID_OTP_MESSAGE = 'Please enter a valid OTP';

const OTPVerificationScreen = ({
	navigation
}: RootStackScreenProps<'OTPVerification'>) => {
	const [otp, setOTP] = useState(['', '', '', '']);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const inputRefs = useRef<Array<TextInput>>([]);

	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const route = useRoute();
	const { phoneNumber } = route.params as { phoneNumber: string };

	const { orange, lightBackground, darkBackground } = Colors[colorScheme];

	const hiddenPhoneNumber = useMemo(
		() => phoneNumber.slice(0, 3) + '*'.repeat(5) + phoneNumber.slice(7),
		[phoneNumber]
	);

	useEffect(() => {
		console.log('valid phone number', phoneNumber);
	}, []);

	const handleOTPChange = useCallback(
		(index: number, value: string) => {
			const newOTP = [...otp];
			newOTP[index] = value;

			setOTP(newOTP);

			if (index < inputRefs.current.length - 1 && value) {
				inputRefs.current[index + 1].focus();
			}
		},
		[otp]
	);

	const handleFocus = useCallback((index: number) => {
		setFocusedIndex(index);
	}, []);

	const handleBlur = () => {
		setFocusedIndex(-1);
	};

	const handleOTPVerification = useCallback(async () => {
		dispatch(startLoading());
		const api = new Http({ baseURL });
		const isValidOTP = otp.some(
			(value) => !isNaN(Number(value)) && value !== ''
		);

		try {
			if (isValidOTP) {
				// All elements in otp are valid numbers
				console.log('Before request', otp.join(''));

				const apiResponse = await api.post('/auth/login', {
					phoneNumber,
					otp: otp.join('')
				});

				const { message, data } = apiResponse as {
					message: string;
					data: unknown;
				};

				console.log(message);

				AsyncStorage.setItem('userData', JSON.stringify(data));
				dispatch(finishLoading());

				navigation.navigate('EnterPin');
			}
		} catch (error) {
			const axiosError = error as AxiosError;
			console.debug(axiosError.response?.data);
			dispatch(finishLoading());

			Alert.alert(INVALID_OTP_TITLE, INVALID_OTP_MESSAGE);
		}
	}, [otp]);

	const handleKeyPress = (index: number, event: any) => {
		if (event.nativeEvent.key === 'Backspace' && !otp[index]) {
			if (index > 0) {
				inputRefs.current[index - 1].focus();
			}
		}
	};

	return (
		<TouchableWithoutFeedback onPress={() => inputRefs.current[0].blur()}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>OTP Verification</Text>
				<Text style={styles.subtitle} lightColor="#5F5E62">
					Enter the OTP sent to {hiddenPhoneNumber}.
				</Text>

				<View style={styles.inputContainer}>
					<View style={styles.otpContainer}>
						{otp.map((value, index) => (
							<TextInput
								key={index}
								style={[
									styles.otpInput,
									focusedIndex === index || value
										? { borderColor: '#EF672A' }
										: null,
									colorScheme === 'dark' && { color: '#fff' }
								]}
								value={value}
								maxLength={1}
								keyboardType="numeric"
								onChangeText={(text) => handleOTPChange(index, text)}
								onFocus={() => handleFocus(index)}
								onBlur={handleBlur}
								ref={(ref) => {
									inputRefs.current[index] = ref as TextInput;
								}}
								onKeyPress={(event) => handleKeyPress(index, event)}
							/>
						))}
					</View>
				</View>

				<TouchableOpacity
					onPress={handleOTPVerification}
					style={{ marginTop: 101 }}
				>
					<View style={[styles.button, { backgroundColor: orange }]}>
						<Text
							style={styles.buttonText}
							lightColor={lightBackground}
							darkColor={darkBackground}
						>
							Continue
						</Text>
					</View>
				</TouchableOpacity>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	title: {
		fontSize: 24,
		fontFamily: FONT_500,
		marginBottom: 16
	},
	subtitle: {
		fontSize: 14,
		fontFamily: FONT_500
	},
	inputContainer: {
		marginTop: 48
	},
	label: {
		marginBottom: 8,
		fontSize: 14,
		fontFamily: FONT_400
	},
	otpContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	otpInput: {
		borderWidth: 1,
		borderColor: '#78767A',
		fontSize: 20,
		fontFamily: FONT_500,
		borderRadius: BORDER_RADIUS,
		padding: 18,
		textAlign: 'center',
		width: 50
	},
	button: {
		paddingVertical: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: BORDER_RADIUS
	},
	buttonText: {
		fontSize: 16,
		fontFamily: FONT_500
	}
});

export default OTPVerificationScreen;
