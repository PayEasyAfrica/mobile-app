import React, { useState, useRef, RefObject, useCallback } from 'react';
import {
	Alert,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import { RootStackScreenProps } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { finishLoading, startLoading } from '../../features/loadingSlice';
import { baseURL, Http } from '../../components/utils/http';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { SafeAreaView, Text, View } from '../../components/Themed';
import { BORDER_RADIUS, FONT_400, FONT_500 } from '../../constants/Style';
import ErrorText from '../../components/ErrorText';

const INVALID_PHONE_NUMBER_TITLE = 'Invalid phone number';
const INVALID_PHONE_NUMBER_MESSAGE = 'Please enter a valid phone number';

const PHONE_NUMBER_PLACEHOLDER = 'Enter phone number';

const validationSchema = Yup.object().shape({
	phoneNumber: Yup.string()
		.required('This is required.')
		.matches(/^(\+?234|0)?[789]\d{9}$/, 'Please enter a valid phone number.')
});

const PhoneVerificationScreen = ({
	navigation
}: RootStackScreenProps<'PhoneVerification'>) => {
	const [isFocused, setIsFocused] = useState(false);
	const phoneInputRef: RefObject<TextInput> = useRef<TextInput>(null);

	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme();

	const { orange, lightBackground, darkBackground, gray } = Colors[colorScheme];

	const handlePressOutside = useCallback(() => {
		if (phoneInputRef.current) {
			phoneInputRef.current.blur();
		}
	}, [phoneInputRef.current]);

	const handleContinue = useCallback(
		async (values: { phoneNumber: string }) => {
			const { phoneNumber } = values;
			const api = new Http({ baseURL });
			if (phoneNumber && phoneNumber.length >= 11) {
				dispatch(startLoading());
				try {
					const apiResponse = await api.get('/auth/checks', {
						params: { phoneNumber }
					});
					const {
						message,
						data: { userExists }
					} = apiResponse as {
						message: string;
						data: { userExists: boolean };
					};
					if (userExists) {
						api.post('/auth/otps', { phoneNumber }).catch(console.debug);
						dispatch(finishLoading());
						navigation.navigate('OTPVerification', { phoneNumber } as never);
					} else {
						// navigation.navigate('SignUp', { phoneNumber });
					}
				} catch (error) {
					const axiosError = error as AxiosError;
					console.debug(error);
					console.debug(axiosError?.response?.data);
					dispatch(finishLoading());
				}
			} else {
				Alert.alert(INVALID_PHONE_NUMBER_TITLE, INVALID_PHONE_NUMBER_MESSAGE);
			}
		},
		[]
	);

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>Verify Phone Number</Text>
				<Text style={styles.subtitle} lightColor="#5F5E62" darkColor={gray}>
					Verify your number to continue.
				</Text>

				<Formik
					initialValues={{ phoneNumber: '' }}
					validationSchema={validationSchema}
					onSubmit={(values) => handleContinue(values)}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						errors,
						touched
					}) => (
						<>
							<View style={styles.inputContainer}>
								<Text style={styles.label}>Phone Number</Text>
								<TextInput
									placeholder={PHONE_NUMBER_PLACEHOLDER}
									value={values.phoneNumber}
									onChangeText={handleChange('phoneNumber')}
									keyboardType="phone-pad"
									maxLength={14}
									style={[
										styles.phoneInput,
										isFocused && { borderColor: orange },
										colorScheme === 'dark' && { color: '#fff' },
										touched.phoneNumber && errors.phoneNumber
											? { borderColor: '#BA1A1A' }
											: null
									]}
									onBlur={handleBlur('phoneNumber')}
									onFocus={() => setIsFocused(true)}
									ref={phoneInputRef}
								/>
								{touched.phoneNumber && errors.phoneNumber && (
									<ErrorText errorMsg={errors.phoneNumber} />
								)}
							</View>

							<TouchableOpacity
								onPress={() => handleSubmit()}
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
						</>
					)}
				</Formik>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 30
		// alignItems: 'center',
		// justifyContent: 'center'
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
	phoneInput: {
		borderWidth: 1,
		borderColor: '#78767A',
		fontFamily: FONT_500,
		borderRadius: BORDER_RADIUS,
		paddingVertical: 18,
		paddingHorizontal: 14
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

export default PhoneVerificationScreen;
