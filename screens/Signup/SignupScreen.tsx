import { useRef, useState } from 'react';
import {
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SafeAreaView, Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { RootStackScreenProps } from '../../types';
import styles from './SignupScreen.styles';
import InputField from '../../components/InputField';
import { Http, baseURL } from '../../components/utils/http';

interface SignupData {
	firstname: string;
	lastname: string;
	phoneNumber: string;
	referalTag?: string;
}

const validationSchema = Yup.object().shape({
	firstname: Yup.string().required('This is required.'),
	lastname: Yup.string().required('This is required.'),
	phoneNumber: Yup.string()
		.required('This is required.')
		.matches(/^(\+?234|0)?[789]\d{9}$/, 'Please enter a valid phone number.'),
	referalTag: Yup.string()
});

const SignupScreen: React.FC<RootStackScreenProps<'Signup'>> = ({
	navigation
}) => {
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const colorScheme = useColorScheme();
	const route = useRoute();
	const { phoneNumber } = route.params as { phoneNumber: string };

	const { gray, orange, lightBackground, darkBackground } = Colors[colorScheme];

	const handlePressOutside = () => {
		setFocusedIndex(-1);
	};

	const handleFocus = (index: number) => {
		setFocusedIndex(index);
	};

	const handleContinue = async (values: SignupData) => {
		// Handle sending form data to server
		const api = new Http({ baseURL });

		api
			.post('/auth/otps', { phoneNumber: values.phoneNumber })
			.catch(console.debug);

		navigation.navigate('OTPVerification', { values } as never);
	};

	return (
		<SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={handlePressOutside}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.title}>Sign Up</Text>
					<Text style={[styles.subtitle, { color: gray }]}>
						Create an account.
					</Text>

					<Formik
						initialValues={{
							firstname: '',
							lastname: '',
							phoneNumber,
							referalTag: ''
						}}
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
							<View style={{ marginTop: 48 }}>
								<InputField
									label="Firstname"
									placeholder="Enter firstname"
									value={values.firstname}
									error={errors.firstname}
									touched={touched.firstname}
									onChangeText={handleChange('firstname')}
									onFocus={() => handleFocus(0)}
									onBlur={() => handleBlur('firstname')}
									focusedIndex={focusedIndex === 0}
								/>

								<InputField
									label="Lastname"
									placeholder="Enter lastname"
									value={values.lastname}
									error={errors.lastname}
									touched={touched.lastname}
									onChangeText={handleChange('lastname')}
									onFocus={() => handleFocus(1)}
									onBlur={() => handleBlur('lastname')}
									focusedIndex={focusedIndex === 1}
								/>

								<InputField
									label="Phone Number"
									placeholder="Enter phone number"
									value={values.phoneNumber}
									error={errors.phoneNumber}
									touched={touched.phoneNumber}
									onChangeText={handleChange('phoneNumber')}
									onFocus={() => handleFocus(2)}
									onBlur={() => handleBlur('phoneNumber')}
									focusedIndex={focusedIndex === 2}
								/>

								<InputField
									label="Referral Tag (optional)"
									placeholder="Enter referral tag"
									value={values.referalTag}
									error={errors.referalTag}
									touched={touched.referalTag}
									onChangeText={handleChange('referalTag')}
									onFocus={() => handleFocus(3)}
									onBlur={() => handleBlur('referalTag')}
									focusedIndex={focusedIndex === 3}
								/>

								<TouchableOpacity
									style={[styles.button, { backgroundColor: orange }]}
									onPress={() => handleSubmit()}
								>
									<Text
										style={styles.buttonText}
										lightColor={lightBackground}
										darkColor={darkBackground}
									>
										Continue
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>

					<View style={{ paddingBottom: 40 }} />
				</ScrollView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default SignupScreen;
