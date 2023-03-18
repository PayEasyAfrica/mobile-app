import React, { useEffect, useRef, useState } from 'react';
import {
	ScrollView,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { QRIcon } from '../../../components/CustomIcons';
import InputField from '../../../components/InputField';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import styles from './SendScreen.styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { clearValues } from '../../../features/barcodeSlice';
import { getSecureSaveValue } from '../../../components/utils/functions';
import { PASSCODE_VERIFICATION_DATA } from '../../../constants/Variables';
import { Http, baseURL } from '../../../components/utils/http';
import { PaymentTransaction } from '../HomeScreen/type';
import { logout } from '../../../features/auth/authSlice';
import { MiniSpinner } from '../../../components/ActivityIndicator';

interface SendData {
	moneyTag: string;
	recipientName: string;
	amount: string;
	description: string;
}

interface Values {
	amount?: string;
	moneyTag: string;
}

const validationSchema = Yup.object().shape({
	moneyTag: Yup.string().required('This is required.'),
	recipientName: Yup.string().required('This is required.'),
	amount: Yup.string().required('This is required.'),
	description: Yup.string().required('This is required.')
});

const SendScreen: React.FC<HomeStackScreenProps<'Send'>> = ({ navigation }) => {
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [scannedValues, setScannedValues] = useState<Values | null>(null);
	const [loadingData, setLoadingData] = useState(false);
	const formikRef = useRef<FormikProps<SendData>>(null);
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const { gray, orange, lightBackground, darkBackground, iconBackground } =
		Colors[colorScheme];

	const { values: barcodeValues } = useAppSelector(
		(state: RootState) => state.barcode
	);

	useEffect(() => {
		if (barcodeValues) {
			console.log('Barcode values: ', barcodeValues);
			queryMoneyTag(barcodeValues.moneyTag);
			setScannedValues(barcodeValues);
			dispatch(clearValues());
		}
	}, [barcodeValues]);

	useEffect(() => {
		if (scannedValues) {
			console.log('Values: ', scannedValues);
			formikRef.current?.setFieldValue('moneyTag', scannedValues.moneyTag);
			formikRef.current?.setFieldValue('amount', scannedValues.amount);
		}
	}, [scannedValues]);

	const queryMoneyTag = async (moneyTag: string) => {
		setLoadingData(true);
		const api = new Http({ baseURL });
		const passcodeToken = await getSecureSaveValue(PASSCODE_VERIFICATION_DATA);
		const { token } = passcodeToken && JSON.parse(passcodeToken);

		api
			.get('/payments/moneytags', {
				params: { moneyTag },
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res) => {
				const { data } = res as {
					data: { moneyTag: string; name: string };
					message: string;
				};

				console.log(res);
				formikRef.current?.setFieldValue('recipientName', data.name);
			})
			.catch((error) => {
				console.debug(error);
				const { status } = error?.response;

				if (status === 401) {
					dispatch(logout());
				}
			})
			.finally(() => {
				setLoadingData(false);
			});
	};

	const handlePressOutside = () => {
		setFocusedIndex(-1);
	};

	const handleFocus = (index: number) => {
		setFocusedIndex(index);
	};

	const handleSend = (values: SendData) => {
		console.log(values);

		// Handle sending form data
	};

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Scanner');
						}}
					>
						<View
							style={[styles.scanButton, { backgroundColor: iconBackground }]}
						>
							<QRIcon color={orange} />
							<Text style={[styles.scanButtonText, { color: orange }]}>
								Scan
							</Text>
						</View>
					</TouchableOpacity>

					<Formik
						innerRef={formikRef}
						initialValues={{
							moneyTag: scannedValues?.moneyTag || '',
							recipientName: '',
							amount: scannedValues?.amount || '',
							description: ''
						}}
						validationSchema={validationSchema}
						onSubmit={(values) => handleSend(values)}
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
									label="Money Tag"
									placeholder="Enter tag"
									value={values.moneyTag}
									error={errors.moneyTag}
									touched={touched.moneyTag}
									onChangeText={handleChange('moneyTag')}
									onFocus={() => handleFocus(0)}
									onBlur={() => handleBlur('moneyTag')}
									focusedIndex={focusedIndex === 0}
								/>

								<View>
									{loadingData && (
										<MiniSpinner
											style={{
												position: 'absolute',
												top: '80%',
												right: 0,
												transform: [
													{ translateX: -38.5 },
													{ translateY: -38.5 }
												],
												zIndex: 9999
											}}
										/>
									)}
									<InputField
										label="Recipient’s Name"
										placeholder=""
										editable={false}
										style={{ backgroundColor: '#f6f6f6' }}
										value={values.recipientName}
										error={errors.recipientName}
										touched={touched.recipientName}
										onChangeText={handleChange('recipientName')}
										onFocus={() => handleFocus(1)}
										onBlur={() => handleBlur('recipientName')}
										focusedIndex={focusedIndex === 1}
									/>
								</View>

								<InputField
									label="Amount"
									placeholder="000,000.00"
									value={values.amount}
									keyboardType="phone-pad"
									error={errors.amount}
									touched={touched.amount}
									onChangeText={handleChange('amount')}
									onFocus={() => handleFocus(2)}
									onBlur={() => handleBlur('amount')}
									focusedIndex={focusedIndex === 2}
								/>

								<InputField
									label="Description"
									placeholder=""
									value={values.description}
									error={errors.description}
									touched={touched.description}
									onChangeText={handleChange('description')}
									onFocus={() => handleFocus(3)}
									onBlur={() => handleBlur('description')}
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
										Send
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

export default SendScreen;
