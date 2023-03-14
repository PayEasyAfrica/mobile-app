import { useEffect, useState } from 'react';
import { Button, Pressable, SectionList, TouchableOpacity } from 'react-native';
import {
	EyeIcon,
	MoreSearchIcon,
	PlusIcon,
	RecieveIcon,
	SendIcon,
	WithdrawIcon
} from '../../../components/CustomIcons';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import styles from './HomeScreen.styles';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import Modal from '../../../components/Modal';
import { FONT_400, FONT_500, FONT_700 } from '../../../constants/Style';
import { Http, baseURL } from '../../../components/utils/http';
import {
	formattedCurrency,
	formattedDateTime,
	getSecureSaveValue
} from '../../../components/utils/functions';
import { PASSCODE_VERIFICATION_DATA } from '../../../constants/Variables';
import { finishLoading, startLoading } from '../../../features/loadingSlice';
import LoadingScreen from '../../LoadingScreen';
import { logout } from '../../../features/auth/authSlice';
import { iUserData, PaymentTransaction, TransactionGroup } from './type';

const DATA = [
	{
		date: '12 Feb, 2023',
		data: [
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' },
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '-₦10,000' }
		]
	},
	{
		date: '08 Feb, 2023',
		data: [
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '-₦10,000' },
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' },
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' }
		]
	}
];

const TransactionGroups = (transactions: PaymentTransaction[]) => {
	return transactions.reduce(
		(groups: TransactionGroup[], transaction: PaymentTransaction) => {
			// extract date string from transaction createdAt
			const date = new Date(transaction.createdAt).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});

			// check if there's already a group with the same date
			const existingGroup = groups.find((group) => group.createdAt === date);

			// add transaction to existing group or create new group
			if (existingGroup) {
				existingGroup.data.push(transaction);
			} else {
				groups.push({ createdAt: date, data: [transaction] });
			}

			return groups;
		},
		[]
	);
};

const HomeScreen: React.FC<HomeStackScreenProps<'Home'>> = ({ navigation }) => {
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	const [userData, setUserData] = useState({} as iUserData);
	const [userTransaction, setUserTransaction] = useState<PaymentTransaction[]>(
		[]
	);

	const { orange, gray, lightBackground, darkBackground } = Colors[colorScheme];

	useEffect(() => {
		dispatch(startLoading());
		const api = new Http({ baseURL });

		(async () => {
			const passcodeToken = await getSecureSaveValue(
				PASSCODE_VERIFICATION_DATA
			);

			const { token } = passcodeToken && JSON.parse(passcodeToken);

			api
				.get('/payments/transactions', {
					params: { page: 1, limit: 20 },
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					const apiResponse = res as { data: PaymentTransaction[] };

					setUserTransaction(apiResponse.data || []);

					dispatch(finishLoading());
				})
				.catch((error) => {
					console.debug(error);
					const { status } = error?.response;

					if (status === 401) {
						dispatch(logout());
						dispatch(finishLoading());
					}
				});
		})();
	}, []);

	useEffect(() => {
		getSecureSaveValue(PASSCODE_VERIFICATION_DATA).then((userData) => {
			if (userData) {
				const { user } = JSON.parse(userData);
				setUserData(user);
			}
		});
	}, []);

	//
	useEffect(() => {
		console.log({ userTransaction });
		console.log({ TransactionGroups: TransactionGroups(userTransaction) });
	}, [userTransaction]);

	const handleShowModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
		// Do any necessary cleanup or state changes here
	};

	if (userTransaction.length === 0) {
		return <LoadingScreen />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerPadding}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={styles.moneyTagContainer}>
						<Text
							style={styles.moneyTagTitle}
							lightColor={gray}
							darkColor={gray}
						>
							Money Tag
						</Text>
						<Text style={styles.moneyTagId}>{userData.moneyTag}</Text>
					</View>

					<View>
						<Pressable
							onPress={() => {
								console.log('Add btn pressed!');
							}}
							style={styles.addButton}
						>
							<PlusIcon color={orange} />
							<Text style={[styles.addButtonTitle, { color: orange }]}>
								Add Money
							</Text>
						</Pressable>
						{/* <Drawer.Navigator drawerContent={() => <DrawerContent />}>
							// Add your screens here
						</Drawer.Navigator> */}
					</View>
				</View>

				<View
					style={{
						paddingVertical: 28,
						paddingHorizontal: 16,
						marginTop: 30,
						borderRadius: 10,
						backgroundColor: orange
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginBottom: 6
						}}
						lightColor={orange}
						darkColor={orange}
					>
						<Text
							style={{ fontSize: 14, fontFamily: FONT_400 }}
							lightColor={lightBackground}
							darkColor={darkBackground}
						>
							Avaliable Funds
						</Text>

						<TouchableOpacity onPress={() => {}}>
							<EyeIcon
								color={
									colorScheme === 'light' ? lightBackground : darkBackground
								}
							/>
						</TouchableOpacity>
					</View>

					<Text
						style={{ fontSize: 24, fontFamily: FONT_700 }}
						lightColor={lightBackground}
						darkColor={darkBackground}
					>
						{formattedCurrency(userTransaction[0].balance)}
					</Text>
					<Text
						style={{
							fontSize: 16,
							fontFamily: FONT_400,
							marginTop: 34
						}}
						lightColor={lightBackground}
						darkColor={darkBackground}
					>
						{userData.name}
					</Text>
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: Colors[colorScheme].iconBackground }
						]}
						onPress={() => {
							navigation.navigate('Receive');
						}}
					>
						<RecieveIcon color={orange} />
						<Text
							style={styles.buttonText}
							lightColor={orange}
							darkColor={orange}
						>
							Receive
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: Colors[colorScheme].iconBackground },
							styles.sendButton
						]}
						onPress={() => {
							navigation.navigate('Send');
						}}
					>
						<SendIcon color={orange} />
						<Text
							style={styles.buttonText}
							lightColor={orange}
							darkColor={orange}
						>
							Send
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: Colors[colorScheme].iconBackground }
						]}
						onPress={() => navigation.navigate('Withdraw')}
					>
						<WithdrawIcon color={orange} />
						<Text
							style={styles.buttonText}
							lightColor={orange}
							darkColor={orange}
						>
							Withdrawal
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<SectionList
				style={{ flex: 1, marginBottom: 5 }}
				sections={TransactionGroups(userTransaction)}
				keyExtractor={(item, index) => item.createdAt + index}
				renderItem={({ item }) => (
					<View
						style={[
							{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 24
							},
							styles.containerPadding
						]}
						lightColor={lightBackground}
						darkColor={darkBackground}
					>
						<View
							style={{ flexDirection: 'row', alignItems: 'center' }}
							lightColor={lightBackground}
							darkColor={darkBackground}
						>
							<View
								style={{
									width: 30,
									height: 30,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 50,
									backgroundColor: Colors[colorScheme].iconBackground,
									marginRight: 16
								}}
								lightColor={lightBackground}
								darkColor={darkBackground}
							>
								{item.kind === 'Credit' ? (
									<RecieveIcon color={orange} />
								) : item.category === 'withdrawal' ? (
									<WithdrawIcon color={orange} />
								) : (
									<SendIcon color={orange} />
								)}
							</View>

							<View lightColor={lightBackground} darkColor={darkBackground}>
								<Text style={{ fontSize: 14, fontFamily: FONT_500 }}>
									{item.title}
								</Text>
								<Text
									style={{
										color: Colors[colorScheme].gray,
										fontSize: 10,
										fontFamily: FONT_500,
										marginTop: 4
									}}
								>
									{formattedDateTime(item.createdAt).formattedTime}
								</Text>
							</View>
						</View>

						<Text
							style={{
								fontSize: 12,
								fontFamily: FONT_500,
								color:
									item.kind === 'Credit' ? '#04D400' : Colors[colorScheme].text
								// color: Colors[colorScheme].text
							}}
						>
							{item.kind === 'Credit' ? '+' : '-'}
							{formattedCurrency(item.amount)}
						</Text>
					</View>
				)}
				renderSectionHeader={({ section: { createdAt } }) => (
					<View style={styles.containerPadding}>
						<Text
							style={{
								color: Colors[colorScheme].gray,
								fontSize: 10,
								fontFamily: FONT_500,
								marginBottom: 16
							}}
						>
							{createdAt}
						</Text>
					</View>
				)}
				ListFooterComponent={
					<TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
						<View
							style={{
								position: 'relative',
								flexDirection: 'row',
								alignSelf: 'center',
								alignItems: 'center',
								backgroundColor: Colors[colorScheme].iconBackground,
								paddingVertical: 8,
								paddingHorizontal: 12,
								borderRadius: 8
							}}
						>
							<MoreSearchIcon color={orange} />
							<Text
								style={[styles.buttonText, { marginLeft: 4 }]}
								lightColor={orange}
								darkColor={orange}
							>
								View more
							</Text>
						</View>
					</TouchableOpacity>
				}
			/>

			<Modal
				visible={modalVisible}
				onClose={handleCloseModal}
				renderContent={() => (
					<Button title="Cancel" onPress={handleCloseModal} />
				)}
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;
