import {
	TouchableOpacity,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback
} from 'react-native';

import { SafeAreaView, Text, View } from '../../components/Themed';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { RefObject, useRef, useState } from 'react';
import { RootStackScreenProps } from '../../types';
import { finishLoading, startLoading } from '../../features/loadingSlice';
import { useAppDispatch } from '../../app/hooks';

const OTPVerificationScreen = ({
	navigation
}: RootStackScreenProps<'OTPVerification'>) => {
	const [otp, setOTP] = useState(['', '', '', '']);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const inputRefs = useRef<Array<TextInput>>([]);

	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const { orange, lightBackground, darkBackground } = Colors[colorScheme];

	const handleOTPChange = (index: number, value: string) => {
		const newOTP = [...otp];
		newOTP[index] = value;

		setOTP(newOTP);

		if (index < inputRefs.current.length - 1 && value) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleFocus = (index: number) => {
		setFocusedIndex(index);
	};

	const handleBlur = () => {
		setFocusedIndex(-1);
	};

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
					Enter the OTP sent to 080...524.
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
					onPress={() => {
						dispatch(startLoading());

						setTimeout(() => {
							dispatch(finishLoading());
							navigation.navigate('EnterPin');
						}, 2000);
					}}
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
		fontFamily: 'Roboto_500Medium',
		marginBottom: 16
	},
	subtitle: {
		fontSize: 14,
		fontFamily: 'Roboto_500Medium'
	},
	inputContainer: {
		marginTop: 48
	},
	label: {
		marginBottom: 8,
		fontSize: 14,
		fontFamily: 'Roboto_400Regular'
	},
	otpContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	otpInput: {
		borderWidth: 1,
		borderColor: '#78767A',
		fontSize: 20,
		fontFamily: 'Roboto_500Medium',
		borderRadius: 8,
		padding: 18,
		textAlign: 'center'
	},
	button: {
		paddingVertical: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8
	},
	buttonText: {
		fontSize: 16,
		fontFamily: 'Roboto_500Medium'
	}
});

export default OTPVerificationScreen;
