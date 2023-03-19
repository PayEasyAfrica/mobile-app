import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, TouchableOpacity } from 'react-native';
import { CalenderIcon } from '../components/CustomIcons';
import Colors from '../constants/Colors';
import { FONT_500 } from '../constants/Style';
import useColorScheme from '../hooks/useColorScheme';
import {
	AuthorizeScreen,
	DebitSummaryScreen,
	HomeScreen,
	QRCodeScannerScreen,
	RecieveScreen,
	SendScreen,
	TransactionsModal,
	WithdrawalScreen
} from '../screens';
import AddMoneyScreen from '../screens/Home/AddMoney/AddMoneyScreen';
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
					fontFamily: FONT_500
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
				name="AddMoney"
				component={AddMoneyScreen}
				options={{
					headerTitle: 'Add Money'
				}}
			/>

			<HomeStack.Screen
				name="Receive"
				component={RecieveScreen}
				options={{
					headerTitle: 'Receive Money'
				}}
			/>

			<HomeStack.Screen
				name="Send"
				component={SendScreen}
				options={{
					headerTitle: 'Send Money'
				}}
			/>

			<HomeStack.Screen
				name="Scanner"
				component={QRCodeScannerScreen}
				options={{
					headerTitle: 'Scan Code'
				}}
			/>

			<HomeStack.Screen
				name="Authorize"
				component={AuthorizeScreen}
				options={{
					headerTitle: ''
				}}
			/>

			<HomeStack.Screen
				name="DebitSummary"
				component={DebitSummaryScreen}
				options={{
					headerTitle: 'Transaction'
				}}
			/>

			<HomeStack.Screen
				name="Withdraw"
				component={WithdrawalScreen}
				options={{
					headerTitle: 'Withdraw Money'
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
