import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, TouchableOpacity } from 'react-native';
import { CalenderIcon, HomeTabBarIcon } from '../components/CustomIcons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { HomeScreen, RecieveScreen, TransactionsModal } from '../screens';
import { HomeStackParamList } from '../types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
	const colorScheme = useColorScheme();
	const { orange, background } = Colors[colorScheme];

	return (
		<HomeStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: background
				},
				headerTitleStyle: {
					fontSize: 24,
					fontFamily: 'Roboto_500Medium'
				},
				headerShadowVisible: false,
				...(Platform.OS === 'android' && { headerTitleAlign: 'center' })
			}}
		>
			<HomeStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: 'Home',
					headerShown: false
				}}
			/>

			<HomeStack.Screen
				name="Receive"
				component={RecieveScreen}
				options={{
					headerTitle: 'Receive Money'
					// headerTitleStyle: { fontSize: 24, fontFamily: 'Roboto_500Medium' }
				}}
			/>

			<HomeStack.Group
				screenOptions={{
					presentation: 'modal'
				}}
			>
				<HomeStack.Screen
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
			</HomeStack.Group>
		</HomeStack.Navigator>
	);
}

export default HomeStackScreen;
