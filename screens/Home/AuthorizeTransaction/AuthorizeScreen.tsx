import { useCallback, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import { HomeStackScreenProps } from '../../../types';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';
import { FONT_500 } from '../../../constants/Style';
import { useRoute } from '@react-navigation/native';
import {
	PASSCODE,
	PASSCODE_VERIFICATION_DATA
} from '../../../constants/Variables';
import { getSecureSaveValue } from '../../../components/utils/functions';
import { Http, baseURL } from '../../../components/utils/http';
import { useAppDispatch } from '../../../app/hooks';
import { finishLoading, startLoading } from '../../../features/loadingSlice';
import { AxiosError } from 'axios';
import { logout } from '../../../features/auth/authSlice';

interface SendValues {
	amount: string;
	moneyTag: string;
	description: string;
}

interface WithdrawValues {
	amount: string;
	accountNumber: string;
	bank: { id: string };
	description: string;
}

const AuthorizeScreen = ({ navigation }: HomeStackScreenProps<'Authorize'>) => {
	const dispatch = useAppDispatch();
	const route = useRoute();
	const { type: transactionType, values } = route.params as {
		type: string;
		values?: SendValues | WithdrawValues;
	};

	useEffect(() => {
		console.log({ type: transactionType, values });
	}, [transactionType]);

	const handlePinEntered = useCallback(
		async (pin: string, handleResetPin?: () => void) => {
			try {
				const passcode = await getSecureSaveValue(PASSCODE);

				if (passcode !== pin) {
					throw new Error('Invalid Passcode');
				} else {
					transactionType === 'send' &&
						values &&
						(await handleSendMoney(values as SendValues, passcode));

					transactionType === 'withdraw' &&
						values &&
						(await handleWithdrawMoney(values as WithdrawValues, passcode));
				}
			} catch (error) {
				console.debug(error);
				Alert.alert('Invalid Passcode', 'Please enter a valid passcode', [
					{
						text: 'OK',
						onPress: () => {
							handleResetPin && handleResetPin();
							navigation.goBack();
						}
					}
				]);
			}
		},
		[]
	);

	const handleSendMoney = useCallback(
		async (values: SendValues, passcode: string) => {
			try {
				dispatch(startLoading());
				const api = new Http({ baseURL });
				const { amount, moneyTag, description } = values;

				const passcodeToken = await getSecureSaveValue(
					PASSCODE_VERIFICATION_DATA
				);
				const { token } = passcodeToken && JSON.parse(passcodeToken);

				const apiResponse: { data: string } = await api.post(
					'/payments/send-money',
					{
						moneyTag,
						amount,
						description,
						passcode
					},
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);

				console.log(apiResponse);
				navigation.navigate('DebitSummary', {
					summary: apiResponse.data
				} as never);
			} catch (error) {
				const axiosError = error as AxiosError;
				console.debug(axiosError);

				if (axiosError.status === 400) {
					Alert.alert('Transaction Failed', axiosError.message, [
						{
							text: 'OK',
							onPress: () => {
								navigation.goBack();
							}
						}
					]);
					return;
				}

				if (axiosError.status === 401) {
					dispatch(logout());
					return;
				}

				Alert.alert('Transaction Failed', 'Please try again');
			} finally {
				dispatch(finishLoading());
			}
		},
		[]
	);

	const handleWithdrawMoney = useCallback(
		async (values: WithdrawValues, passcode: string) => {
			try {
				dispatch(startLoading());
				const api = new Http({ baseURL });
				const { amount, accountNumber, description, bank } = values;

				const passcodeToken = await getSecureSaveValue(
					PASSCODE_VERIFICATION_DATA
				);
				const { token } = passcodeToken && JSON.parse(passcodeToken);

				const apiResponse: { data: string } = await api.post(
					'/payments/withdraw',
					{
						amount,
						description,
						bankId: bank.id,
						accountNumber,
						passcode
					},
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);

				console.log(apiResponse);
				navigation.navigate('DebitSummary', {
					summary: apiResponse.data
				} as never);
			} catch (error) {
				const axiosError = error as AxiosError;
				console.debug(axiosError);

				if (axiosError.status === 400) {
					Alert.alert('Transaction Failed', axiosError.message, [
						{
							text: 'OK',
							onPress: () => {
								navigation.goBack();
							}
						}
					]);
					return;
				}

				if (axiosError.status === 401) {
					dispatch(logout());
					return;
				}

				Alert.alert('Transaction Failed', 'Please try again', [
					{
						text: 'OK',
						onPress: () => navigation.goBack()
					}
				]);
			} finally {
				dispatch(finishLoading());
			}
		},
		[]
	);

	// !IMPORTANT: Biometric authentication is not implemented yet
	const handleBiometricLogin = useCallback(async () => {
		navigation.navigate('DebitSummary');
	}, []);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View>
					<Text style={styles.text}>
						Enter your pin or fingerprint to confirm transaction.
					</Text>
					<Text style={styles.subtitle} lightColor="#5F5E62">
						Enter code or fingerprint linked with your account.
					</Text>
				</View>

				<AuthenticationPinPad
					onPinEntered={handlePinEntered}
					handleBiometricLogin={handleBiometricLogin}
					showBiometricAuth={false}
				/>

				<View style={{ paddingBottom: 30 }} />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	text: {
		fontSize: 20,
		fontFamily: FONT_500,
		marginBottom: 16
	},
	subtitle: {
		fontSize: 14,
		fontFamily: FONT_500,
		marginBottom: 60
	}
});

export default AuthorizeScreen;
