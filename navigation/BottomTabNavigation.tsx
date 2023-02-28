import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import {
	HomeTabBarIcon,
	ReferralTabBarIcon,
	SettingsTabBarIcon
} from '../components/CustomIcons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { HomeScreen, ReferralScreen } from '../screens';
import { RootTabParamList } from '../types';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();
	const { tabIconActive, tabIconInactive, background } = Colors[colorScheme];

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
					title: 'Referral code',
					tabBarIcon: ({ color }) => <ReferralTabBarIcon color={color} />,
					headerShown: false
				}}
			/>

			<BottomTab.Screen
				name="TabThree"
				component={ReferralScreen}
				options={{
					title: 'Settings',
					tabBarIcon: ({ color }) => <SettingsTabBarIcon color={color} />
				}}
			/>
		</BottomTab.Navigator>
	);
}

export default BottomTabNavigator;
