import React, { useEffect, useRef, useState } from 'react';
import {
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../components/InputField';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import styles from './WithdrawalScreen.styles';
import { MiniSpinner } from '../../../components/ActivityIndicator';
import SelectInput from '../../../components/SelectInput';
import {
	debounce,
	getSecureSaveValue
} from '../../../components/utils/functions';
import { Http, baseURL } from '../../../components/utils/http';
import { PASSCODE_VERIFICATION_DATA } from '../../../constants/Variables';
import { logout } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../../app/hooks';
import LoadingScreen from '../../LoadingScreen';
import { finishLoading, startLoading } from '../../../features/loadingSlice';
import ErrorText from '../../../components/ErrorText';

// type Bank = {

// }
interface WithdrawData {
	amount: string;
	bank: string;
	accountNumber: string;
	accountName: string;
	description: string;
}

interface BankData {
	name: string;
	deleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	id: string;
}

const DEBOUNCE_DELAY = 1500;

const validationSchema = Yup.object().shape({
	amount: Yup.string().required('This is required.'),
	bank: Yup.object().nullable().required('Please select a bank'),
	accountNumber: Yup.string().required('This is required.'),
	accountName: Yup.string().required('This is required.'),
	description: Yup.string().required('This is required.')
});

const WithdrawalScreen: React.FC<HomeStackScreenProps<'Withdraw'>> = ({
	navigation
}) => {
	const [banks, setBanks] = useState<BankData[] | null>(null);
	const [selectedBank, setSelectedBank] = useState<BankData | null>(null);
	const [accountNameError, setAccountNameError] = useState('');

	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [loading, setLoading] = useState(true);
	const [loadingData, setLoadingData] = useState(false);
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const formikRef = useRef<FormikProps<WithdrawData>>(null);

	const { orange, lightBackground, disabledInput } = Colors[colorScheme];

	useEffect(() => {
		dispatch(startLoading());
		const api = new Http({ baseURL });

		(async () => {
			const passcodeToken = await getSecureSaveValue(
				PASSCODE_VERIFICATION_DATA
			);

			const { token } = passcodeToken && JSON.parse(passcodeToken);

			api
				.get('/payments/banks', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					const apiResponse = res as { data: BankData[] };
					setBanks(apiResponse.data);
				})
				.catch((error) => {
					console.debug(error);
					const { status } = error?.response;

					if (status === 401) {
						dispatch(logout());
					}
				})
				.finally(() => {
					setLoading(false);
					dispatch(finishLoading());
				});
		})();
	}, []);

	const handleAccountNumberChange = (value: string) => {
		if (value.length === 10 && selectedBank) {
			console.log(value, selectedBank);
			resolveBankAccount(value, selectedBank.id);
		} else {
			formikRef.current?.setFieldValue('accountName', '');
			setAccountNameError('');
		}
	};

	const resolveBankAccount = async (accountNumber: string, bankId: string) => {
		setLoadingData(true);
		const api = new Http({ baseURL });
		const passcodeToken = await getSecureSaveValue(PASSCODE_VERIFICATION_DATA);
		const { token } = passcodeToken && JSON.parse(passcodeToken);

		api
			.get('/payments/banks/resolve', {
				params: { bankId, accountNumber },
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res) => {
				const { data } = res as {
					data: { accountName: string };
					message: string;
				};

				console.log(res);
				formikRef.current?.setFieldValue('accountName', data.accountName);
			})
			.catch((error) => {
				console.debug(error);
				const { status, message } = error?.response;

				formikRef.current?.setFieldValue('accountName', '');

				setAccountNameError(status === 400 ? message : '');

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

	const handleContinue = (values: WithdrawData) => {
		console.log('WithdrawalScreen', values);
		navigation.navigate('Authorize', { type: 'withdraw', values } as never);
	};

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Formik
						innerRef={formikRef}
						initialValues={{
							amount: '',
							bank: '',
							accountNumber: '',
							accountName: '',
							description: ''
						}}
						validationSchema={validationSchema}
						onSubmit={(values) => handleContinue(values)}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
							values,
							errors,
							touched
						}) => (
							<>
								<InputField
									label="Amount"
									placeholder="000,000.00"
									value={values.amount}
									keyboardType="phone-pad"
									error={errors.amount}
									touched={touched.amount}
									onChangeText={handleChange('amount')}
									onFocus={() => handleFocus(0)}
									onBlur={() => handleBlur('amount')}
									focusedIndex={focusedIndex === 0}
								/>

								<SelectInput
									label="Select Bank"
									banks={banks}
									error={errors.amount}
									touched={touched.amount}
									onSelect={(bank) => {
										setFieldValue('bank', bank);
										setSelectedBank(bank);
									}}
									onFocus={() => handleFocus(1)}
									onBlur={() => handleBlur('amount')}
									focusedIndex={focusedIndex === 1}
								/>

								<InputField
									label="Account Number"
									placeholder="Enter account number"
									value={values.accountNumber}
									keyboardType="phone-pad"
									error={errors.accountNumber}
									maxLength={10}
									touched={touched.accountNumber}
									onChangeText={(value) => {
										handleChange('accountNumber')(value);
										handleAccountNumberChange(value);
									}}
									onFocus={() => handleFocus(2)}
									onBlur={() => handleBlur('accountNumber')}
									focusedIndex={focusedIndex === 2}
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
										label="Account Name"
										placeholder="Account Name"
										editable={false}
										style={{ backgroundColor: disabledInput }}
										value={values.accountName}
										error={accountNameError || errors.accountName}
										touched={touched.accountName || !!accountNameError}
										onChangeText={handleChange('accountName')}
										onFocus={() => handleFocus(3)}
										onBlur={() => handleBlur('accountName')}
										focusedIndex={focusedIndex === 3}
									/>
								</View>

								<InputField
									label="Description"
									placeholder=""
									value={values.description}
									error={errors.description}
									touched={touched.description}
									onChangeText={handleChange('description')}
									onFocus={() => handleFocus(4)}
									onBlur={() => handleBlur('description')}
									focusedIndex={focusedIndex === 4}
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

export default WithdrawalScreen;
