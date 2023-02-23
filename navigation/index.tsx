/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
	ColorSchemeName,
	Platform,
	Pressable,
	TouchableOpacity
} from 'react-native';
import {
	CalenderIcon,
	HomeTabBarIcon,
	ReferralTabBarIcon
} from '../components/CustomIcons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
	HomeScreen,
	notFoundScreen,
	ReferralScreen,
	TransactionsModal
} from '../screens';

import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
	colorScheme
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
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
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotFound"
				component={notFoundScreen}
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
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();
	const { tabIconActive, tabIconInactive } = Colors[colorScheme];

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			screenOptions={{
				tabBarActiveTintColor: tabIconActive,
				tabBarInactiveTintColor: tabIconInactive,
				tabBarStyle: { height: Platform.OS === 'android' ? '8%' : '10%' },
				tabBarLabelStyle: {
					fontFamily: 'Roboto_400Regular',
					...(Platform.OS === 'android' && { marginTop: 8, marginBottom: 12 })
				}
			}}
		>
			<BottomTab.Screen
				name="TabOne"
				component={HomeScreen}
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => <HomeTabBarIcon color={color} />,
					headerShown: false
				}}
			/>
			<BottomTab.Screen
				name="TabTwo"
				component={ReferralScreen}
				options={{
					title: 'Referral',
					tabBarIcon: ({ color }) => <ReferralTabBarIcon color={color} />
				}}
			/>
		</BottomTab.Navigator>
	);
}
