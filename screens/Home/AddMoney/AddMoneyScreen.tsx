import React, { useEffect, useRef, useState } from 'react';
import {
	Alert,
	Platform,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import { Formik } from 'formik';
import * as Yup from 'yup';

import InputField from '../../../components/InputField';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import styles from './AddMoneyScreen.styles';
import { Http, baseURL } from '../../../components/utils/http';
import { getSecureSaveValue } from '../../../components/utils/functions';
import { PASSCODE_VERIFICATION_DATA } from '../../../constants/Variables';
import { useAppDispatch } from '../../../app/hooks';
import { finishLoading, startLoading } from '../../../features/loadingSlice';

const validationSchema = Yup.object().shape({
	amount: Yup.string().required('This is required.')
});

const AddMoneyScreen: React.FC<HomeStackScreenProps<'AddMoney'>> = ({
	navigation
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const { orange, lightBackground, darkBackground, iconBackground } =
		Colors[colorScheme];

	const handlePressOutside = () => {
		setIsFocused(false);
	};

	const handleContinue = async (values: { amount: string }) => {
		console.log(values);
		const api = new Http({ baseURL });

		try {
			dispatch(startLoading());

			const passcodeToken = await getSecureSaveValue(
				PASSCODE_VERIFICATION_DATA
			);
			const { token } = passcodeToken && JSON.parse(passcodeToken);

			const apiResponse: { data: string } = await api.post(
				'/payments/references',
				{
					meta: {
						device: 'some device'
					}
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			console.log(apiResponse);

			if (Platform.OS !== 'web') {
				// Prevent the default behavior of linking to the default browser on native.

				// Open the link in an in-app browser.
				WebBrowser.openBrowserAsync(
					`http://payeasy-load-balancer-2142199047.us-east-1.elb.amazonaws.com/payments/balances/fund?amount=${
						values.amount
					}&reference=${apiResponse.data}${
						colorScheme === 'dark' && '&color=black'
					}`
				);
			}
		} catch (error) {
			console.debug('AddMoneyScreen: ', error);
			Alert.alert('An error occured. Please try again later.');
		} finally {
			dispatch(finishLoading());
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Formik
						initialValues={{
							amount: ''
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
							<>
								<InputField
									label="Enter amount"
									placeholder="000,000.00"
									value={values.amount}
									keyboardType="phone-pad"
									error={errors.amount}
									touched={touched.amount}
									onChangeText={handleChange('amount')}
									onFocus={() => setIsFocused(true)}
									onBlur={() => handleBlur('amount')}
									focusedIndex={isFocused}
								/>

								<TouchableOpacity
									style={[styles.button, { backgroundColor: orange }]}
									onPress={() => handleSubmit()}
								>
									<Text style={styles.buttonText} lightColor={lightBackground}>
										Continue
									</Text>
								</TouchableOpacity>
							</>
						)}
					</Formik>

					<View style={{ paddingBottom: 40 }} />
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AddMoneyScreen;
