import { useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { SafeAreaView, Text } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { SettingsStackScreenProps } from '../../../types';
import { useRoute } from '@react-navigation/native';
import AuthenticationPinPad from '../../../components/AuthenticationPinPad';
import { FONT_500 } from '../../../constants/Style';
import { logout } from '../../../features/auth/authSlice';
import { PASSCODE_VERIFICATION_DATA } from '../../../constants/Variables';
import { getSecureSaveValue } from '../../../components/utils/functions';
import { Http, baseURL } from '../../../components/utils/http';
import { useAppDispatch } from '../../../app/hooks';
import { finishLoading, startLoading } from '../../../features/loadingSlice';

const INVALID_PASSCODE_TITLE = 'Passcode Mismatch';
const INVALID_PASSCODE_MESSAGE = 'Your passcode does not match';

const VALID_PASSCODE_TITLE = 'Passcode Mismatch';
const VALID_PASSCODE_MESSAGE = 'Your passcode hass been successfully changed';

const ConfirmPINScreen = ({
	navigation
}: SettingsStackScreenProps<'ConfirmPIN'>) => {
	const dispatch = useAppDispatch();

	const route = useRoute();
	const { pin: prevPin } = route.params as { pin: string };

	const handlePinEntered = useCallback(async (pin: string) => {
		if (prevPin === pin) {
			console.log(pin);
			const api = new Http({ baseURL });

			try {
				const passcodeToken = await getSecureSaveValue(
					PASSCODE_VERIFICATION_DATA
				);

				const { token } = passcodeToken && JSON.parse(passcodeToken);

				dispatch(startLoading());
				await api.put(
					'/auth/users',
					{ passcode: pin },
					{ headers: { Authorization: `Bearer ${token}` } }
				);

				Alert.alert('', VALID_PASSCODE_MESSAGE, [
					{
						text: 'Ok',
						onPress: async () => {
							navigation.navigate('Settings');
							// dispatch(logout());
						}
					}
				]);
			} catch (error) {
				console.debug(error);
				// @ts-ignore
				const { status } = error?.response;

				if (status === 401) {
					dispatch(logout());
				}
			} finally {
				dispatch(finishLoading());
			}
		} else {
			Alert.alert(INVALID_PASSCODE_TITLE, INVALID_PASSCODE_MESSAGE);
			navigation.goBack();
		}
	}, []);

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Confirm Passcode.</Text>

			<AuthenticationPinPad onPinEntered={handlePinEntered} />
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
		textAlign: 'center',
		marginTop: 30,
		marginBottom: 36
	}
});

export default ConfirmPINScreen;
