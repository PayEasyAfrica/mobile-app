import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AppState, TouchableOpacity } from 'react-native';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import styles from './PasscodeScreen.styles';
import { RootStackScreenProps } from '../../../types';
import { useRoute } from '@react-navigation/native';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';
import { Http, baseURL } from '../../../components/utils/http';
import {
	deleteSecureSaveItem,
	getSecureSaveValue,
	secureSave
} from '../../../components/utils/functions';
import { OTP_VERIFICATION_DATA, PASSCODE } from '../../../constants/Variables';
import { useAppDispatch } from '../../../app/hooks';
import { login } from '../../../features/auth/authSlice';
import { verificationLogin } from '../../../features/signin/signinSlice';
import { AxiosError } from 'axios';

const INVALID_PASSCODE_TITLE = 'Passcode Mismatch';
const INVALID_PASSCODE_MESSAGE = 'Your passcode does not match';

const VerifyPasscodeScreen = ({
	navigation
}: RootStackScreenProps<'VerifyPasscode'>) => {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(false);
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const { orange } = Colors[colorScheme];

	const route = useRoute();
	const { pin: prevPin } = route.params as { pin: string };

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState) => {
			if (['inactive', 'background'].includes(nextAppState)) {
				// App is closing
				console.log('App is closing');
				deleteSecureSaveItem(OTP_VERIFICATION_DATA);
			}

			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === 'active'
			) {
				console.log('App has come to the foreground!');
				setAppStateVisible((prev) => !prev);
			}

			appState.current = nextAppState;
			console.log('AppState', appState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	useEffect(() => {
		(async () => {
			const userData = await getSecureSaveValue(OTP_VERIFICATION_DATA);

			if (!userData) {
				// TODO: This should be handled by the router
			}
		})();
	}, [appStateVisible]);

	const handlePinEntered = useCallback(async (pin: string) => {
		const api = new Http({ baseURL });

		try {
			if (prevPin !== pin) {
				throw new Error(INVALID_PASSCODE_TITLE);
			}

			await dispatch(verificationLogin());

			const userData = await getSecureSaveValue(OTP_VERIFICATION_DATA);

			if (userData) {
				const { token } = JSON.parse(userData);

				api
					.put(
						'/auth/users',
						{ passcode: pin },
						{ headers: { Authorization: `Bearer ${token}` } }
					)
					.catch(console.debug);
			}

			// await dispatch(login(pin));
			secureSave(PASSCODE, pin);

			// await dispatch(login(pin));
		} catch (error) {
			console.debug('VerifyPasscodeScreen', error);
			const axiosError = error as AxiosError;
			if (axiosError.message === INVALID_PASSCODE_TITLE) {
				Alert.alert(INVALID_PASSCODE_TITLE, INVALID_PASSCODE_MESSAGE);
				return;
			}

			Alert.alert('Something went wrong. Please try again.');
		}
	}, []);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<Text style={[styles.title, { textAlign: 'center', marginBottom: 32 }]}>
				Confirm Passcode.
			</Text>

			<AuthenticationPinPad onPinEntered={handlePinEntered} />

			<View style={styles.signoutContainer}>
				<Text style={styles.signoutText}>Not your account? </Text>
				<TouchableOpacity
					onPress={() => {
						Alert.alert('Sign out', 'Are you sure you want to logout??', [
							{
								text: 'Yes',
								onPress: () => console.log('Yes pressed')
							},
							{
								text: 'No',
								onPress: () => console.log('No pressed')
							}
						]);
					}}
				>
					<Text style={[styles.signoutText, { color: orange, fontSize: 16 }]}>
						Log out
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default VerifyPasscodeScreen;
