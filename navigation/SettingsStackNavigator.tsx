import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import { FONT_500 } from '../constants/Style';
import useColorScheme from '../hooks/useColorScheme';
import { SettingsScreen } from '../screens';

import { SettingStackParamList } from '../types';

const SettingsStack = createNativeStackNavigator<SettingStackParamList>();

function SettingsStackScreen() {
	const colorScheme = useColorScheme();
	const { orange, background } = Colors[colorScheme];

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
		</SettingsStack.Navigator>
	);
}

export default SettingsStackScreen;
