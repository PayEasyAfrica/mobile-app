import {
	TouchableOpacity,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	Alert,
	TextInputKeyPressEventData,
	NativeSyntheticEvent
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { SafeAreaView, Text, View } from '../../components/Themed';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RootStackScreenProps } from '../../types';
import { finishLoading, startLoading } from '../../features/loadingSlice';
import { useAppDispatch } from '../../app/hooks';

import { AxiosError } from 'axios';
import { baseURL, Http } from '../../components/utils/http';
import { BORDER_RADIUS, FONT_400, FONT_500 } from '../../constants/Style';
import { secureSave } from '../../components/utils/functions';
import { OTP_VERIFICATION_DATA } from '../../constants/Variables';
import { verificationLogin } from '../../features/signin/signinSlice';

const INVALID_OTP_TITLE = 'Invalid OTP';
const INVALID_OTP_MESSAGE = 'Please enter a valid OTP';

interface signupValues {
	values: {
		firstname: string;
		lastname: string;
		phoneNumber: string;
		referalTag?: string;
	};
}

interface apiResponse {
	message: string;
	data: unknown;
}

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
	const { values } = route.params as signupValues;

	const { orange, lightBackground, darkBackground } = Colors[colorScheme];

	/* A callback function that hides the phone number. */
	const hiddenPhoneNumber = useCallback(
		(phoneNumber: string) =>
			phoneNumber.slice(0, 3) + '*'.repeat(5) + phoneNumber.slice(7),
		[]
	);

	/* A callback function that is called when the user changes the value of the input field. */
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

	/* A callback function that is called when the user focuses on an input field. */
	const handleFocus = useCallback((index: number) => {
		setFocusedIndex(index);
	}, []);

	/**
	 * When the user clicks outside of the dropdown, the focused index is set to -1
	 */
	const handleBlur = () => {
		setFocusedIndex(-1);
	};

	/* A function that is called when the user presses the continue button. */
	const handleOTPVerification = useCallback(async () => {
		// TODO: Implement OTP verification with backend
		dispatch(startLoading());

		/* Checking if the otp is valid. */
		const isValidOTP = otp.some(
			(value) => !isNaN(Number(value)) && value !== ''
		);

		try {
			if (isValidOTP) {
				if (phoneNumber) {
					await handleLogin();
				} else {
					await handleSignup();
				}

				navigation.navigate('SetPasscode');
			}
		} catch (error) {
			const axiosError = error as AxiosError;
			console.debug(axiosError.response?.data);

			Alert.alert(INVALID_OTP_TITLE, INVALID_OTP_MESSAGE);
		} finally {
			dispatch(finishLoading());
		}
	}, [otp]);

	const handleLogin = async () => {
		const api = new Http({ baseURL });
		const response = await api.post('/auth/login', {
			phoneNumber,
			otp: otp.join('')
		});

		const { message, data } = response as apiResponse;

		console.log('OTPVerificationScreen: ', data, message);

		if (data) {
			secureSave(OTP_VERIFICATION_DATA, JSON.stringify(data));
		}
	};

	const handleSignup = async () => {
		const api = new Http({ baseURL });
		const { firstname, lastname, phoneNumber, referalTag } = values;

		const response = await api.post('/auth/signup', {
			name: `${firstname} ${lastname}`,
			phoneNumber,
			...(referalTag && { referee: referalTag }),
			otp: otp.join('')
		});

		const { message, data } = response as apiResponse;

		console.log('OTPVerificationScreen: ', data, message);

		if (data) {
			secureSave(OTP_VERIFICATION_DATA, JSON.stringify(data));
		}
	};

	/**
	 * If the key pressed is backspace and the current input is empty, focus on the previous input
	 * @param {number} index - The index of the input field that is currently being focused.
	 * @param event - NativeSyntheticEvent<TextInputKeyPressEventData>
	 */
	const handleKeyPress = (
		index: number,
		event: NativeSyntheticEvent<TextInputKeyPressEventData>
	) => {
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
					Enter the OTP sent to{' '}
					{hiddenPhoneNumber(phoneNumber || values.phoneNumber)}.
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
						<Text style={styles.buttonText} lightColor={lightBackground}>
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
