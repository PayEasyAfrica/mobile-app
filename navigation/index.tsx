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
import { useEffect } from 'react';
import { ColorSchemeName, Platform, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import ActivityIndicator from '../components/ActivityIndicator';

import Colors from '../constants/Colors';
import { FONT_500 } from '../constants/Style';
import { checkTokenAsync } from '../features/auth/authSlice';
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

	const { token: isLoggedIn, loading } = useAppSelector(
		(state: RootState) => state.auth
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
			{(loading || isLoading) && <ActivityIndicator />}
			<RootNavigator isLoggedIn={!!isLoggedIn} isLoading={loading} />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({
	isLoggedIn,
	isLoading
}: {
	isLoggedIn: boolean;
	isLoading: boolean;
}) {
	const colorScheme = useColorScheme();
	const { background } = Colors[colorScheme];
	return (
		<Stack.Navigator
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
			{isLoading ? (
				<Stack.Screen
					name="Loading"
					component={LoadingScreen}
					options={{ headerShown: false }}
				/>
			) : isLoggedIn ? (
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
			) : (
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
					<Stack.Screen
						name="Passcode"
						component={PasscodeScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
