import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import { FONT_500 } from '../constants/Style';
import useColorScheme from '../hooks/useColorScheme';
import { NotificationsScreen, ProfileScreen, SettingsScreen } from '../screens';

import { SettingStackParamList } from '../types';

const SettingsStack = createNativeStackNavigator<SettingStackParamList>();

function SettingsStackScreen() {
	const colorScheme = useColorScheme();
	const { background } = Colors[colorScheme];

	return (
		<SettingsStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: background
				},
				headerTitleStyle: {
					fontSize: 24,
					fontFamily: FONT_500
				},
				headerShadowVisible: false,
				...(Platform.OS === 'android' && { headerTitleAlign: 'center' })
			}}
		>
			<SettingsStack.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					title: 'Settings',
					headerShown: false
				}}
			/>

			<SettingsStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					title: 'Profile'
				}}
			/>

			<SettingsStack.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					title: 'Notifications'
				}}
			/>
		</SettingsStack.Navigator>
	);
}

export default SettingsStackScreen;
