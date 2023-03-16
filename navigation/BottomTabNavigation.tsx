import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';
import {
	HomeTabBarIcon,
	ReferralTabBarIcon,
	SettingsTabBarIcon
} from '../components/CustomIcons';
import Colors from '../constants/Colors';
import { FONT_400 } from '../constants/Style';
import useColorScheme from '../hooks/useColorScheme';
import { ReferralScreen } from '../screens';
import { RootTabParamList } from '../types';
import HomeStackScreen from './HomeStackNavigator';
import SettingsStackScreen from './SettingsStackNavigator';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(false);
	const colorScheme = useColorScheme();
	const { tabIconActive, tabIconInactive, background } = Colors[colorScheme];

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState) => {
			if (nextAppState === 'background') {
				// App is closing
				console.log('App is closing');
			}

			// if (
			// 	appState.current.match(/inactive|background/) &&
			// 	nextAppState === 'active'
			// ) {
			// 	console.log('App has come to the foreground!');
			// 	setAppStateVisible((prev) => !prev);
			// }

			// appState.current = nextAppState;
			// console.log('AppState', appState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			screenOptions={{
				tabBarActiveTintColor: tabIconActive,
				tabBarInactiveTintColor: tabIconInactive,
				tabBarStyle: { height: Platform.OS === 'android' ? '8%' : '10%' },
				tabBarLabelStyle: {
					fontFamily: FONT_400,
					...(Platform.OS === 'android' && { marginTop: 8, marginBottom: 12 })
				}
			}}
		>
			<BottomTab.Screen
				name="TabOne"
				component={HomeStackScreen}
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
					title: 'Referral code',
					tabBarIcon: ({ color }) => <ReferralTabBarIcon color={color} />,
					headerShown: false
				}}
			/>

			<BottomTab.Screen
				name="TabThree"
				component={SettingsStackScreen}
				options={{
					title: 'Settings',
					tabBarIcon: ({ color }) => <SettingsTabBarIcon color={color} />,
					headerShown: false
				}}
			/>
		</BottomTab.Navigator>
	);
}

export default BottomTabNavigator;
