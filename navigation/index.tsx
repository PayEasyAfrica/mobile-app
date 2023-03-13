/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ColorSchemeName, Platform, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import ActivityIndicator from '../components/ActivityIndicator';
import { getSecureSaveValue } from '../components/utils/functions';

import Colors from '../constants/Colors';
import { FONT_500 } from '../constants/Style';
import { PASSCODE_TOKEN } from '../constants/Variables';
import { checkTokenAsync } from '../features/auth/authSlice';
import { checkVerificationTokenAsync } from '../features/signin/signinSlice';
import useColorScheme from '../hooks/useColorScheme';
import {
	LoadingScreen,
	NotFoundScreen,
	OTPVerificationScreen,
	PasscodeScreen,
	PhoneVerificationScreen,
	SetPasscodeScreen,
	VerifyPasscodeScreen
} from '../screens';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigation';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
	colorScheme
}: {
	colorScheme: ColorSchemeName;
}) {
	const dispatch = useAppDispatch();

	const { loading } = useAppSelector((state: RootState) => state.auth);
	const { loading: signinLoading } = useAppSelector(
		(state: RootState) => state.signin
	);

	const { isLoading } = useAppSelector((state: RootState) => state.loading);

	useEffect(() => {
		dispatch(checkTokenAsync());
	}, []);

	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			{(loading || isLoading || signinLoading) && <ActivityIndicator />}
			<RootNavigator isLoading={loading} />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ isLoading }: { isLoading: boolean }) {
	const [passcodeToken, setPasscodeToken] = useState('');
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();
	const { background } = Colors[colorScheme];

	const { token: signinToken, loading: signinLoading } = useAppSelector(
		(state: RootState) => state.signin
	);

	const { token: isLoggedIn } = useAppSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		dispatch(checkVerificationTokenAsync());
	}, []);

	useEffect(() => {
		(async () => {
			const token = await getSecureSaveValue(PASSCODE_TOKEN);
			token && setPasscodeToken(token);
		})();
	}, [signinToken]);

	useEffect(() => {
		console.log('passcodeToken', !!passcodeToken);
	}, [passcodeToken]);

	useEffect(() => {
		console.log('Loading...', { isLoading }, { signinLoading });
	}, [isLoading, signinLoading]);

	// if (isLoading || signinLoading) {
	// 	return <LoadingScreen />;
	// }

	return (
		<Stack.Navigator
			initialRouteName={
				isLoggedIn ? 'Root' : signinToken ? 'Passcode' : 'PhoneVerification'
			}
			screenOptions={{
				headerStyle: {
					backgroundColor: background
				},
				headerTitleStyle: {
					fontSize: 20,
					fontFamily: FONT_500
				},
				headerShadowVisible: false,
				...(Platform.OS === 'android' && { headerTitleAlign: 'center' })
			}}
		>
			{/* View 1 */}
			{!isLoggedIn && !signinToken && (
				<>
					<Stack.Screen
						name="PhoneVerification"
						component={PhoneVerificationScreen}
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name="OTPVerification"
						component={OTPVerificationScreen}
						options={{
							headerTitle: ''
						}}
					/>
					<Stack.Screen
						name="SetPasscode"
						component={SetPasscodeScreen}
						options={{
							headerTitle: ''
						}}
					/>
					<Stack.Screen
						name="VerifyPasscode"
						component={VerifyPasscodeScreen}
						options={{
							headerTitle: ''
						}}
					/>
				</>
			)}

			{/* View 2 */}
			{!isLoggedIn && signinToken && (
				<Stack.Screen
					name="Passcode"
					component={PasscodeScreen}
					options={{ headerShown: false }}
				/>
			)}

			{/* View 3 */}
			{isLoggedIn && (
				<>
					<Stack.Screen
						name="Root"
						component={BottomTabNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="NotFound"
						component={NotFoundScreen}
						options={{ title: 'Oops!' }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
