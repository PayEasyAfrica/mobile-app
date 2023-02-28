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
import { CalenderIcon } from '../components/CustomIcons';

import Colors from '../constants/Colors';
import { checkTokenAsync, selectToken } from '../features/auth/authSlice';
import useColorScheme from '../hooks/useColorScheme';
import {
	LoadingScreen,
	NotFoundScreen,
	EnterPinScreen,
	TransactionsModal
} from '../screens';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import PhoneVerificationScreen from '../screens/Auth/PhoneVerificationScreen';

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
	const { orange, background } = Colors[colorScheme];
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: background
				},
				headerTitleStyle: {
					fontSize: 20,
					fontFamily: 'Roboto_500Medium'
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
					<Stack.Group
						screenOptions={{
							presentation: 'modal'
						}}
					>
						<Stack.Screen
							name="Transactions"
							component={TransactionsModal}
							options={({ navigation }) => ({
								headerTitle: 'Transactions History',

								headerRight: () => (
									<TouchableOpacity
										onPress={() => {
											console.log('Header Right Button Pressed', navigation);
											navigation.navigate('TransactionsStatement');
										}}
									>
										<CalenderIcon color={orange} />
									</TouchableOpacity>
								)
							})}
						/>
					</Stack.Group>
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
						name="EnterPin"
						component={EnterPinScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
