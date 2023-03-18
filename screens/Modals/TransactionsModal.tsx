import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, SectionList, StyleSheet, TextInput } from 'react-native';
import { useAppDispatch } from '../../app/hooks';
import {
	RecieveIcon,
	SearchIcon,
	SendIcon,
	WithdrawIcon
} from '../../components/CustomIcons';
import { Text, View } from '../../components/Themed';
import {
	formattedCurrency,
	formattedDateTime,
	getSecureSaveValue
} from '../../components/utils/functions';
import { Http, baseURL } from '../../components/utils/http';
import Colors from '../../constants/Colors';
import { FONT_500 } from '../../constants/Style';
import { PASSCODE_VERIFICATION_DATA } from '../../constants/Variables';
import { logout } from '../../features/auth/authSlice';
import { finishLoading, startLoading } from '../../features/loadingSlice';
import useColorScheme from '../../hooks/useColorScheme';
import { PaymentTransaction, TransactionGroup } from '../Home/HomeScreen/type';
import LoadingScreen from '../LoadingScreen';

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

export default function TransactionsModal() {
	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme();
	const { orange, lightBackground, darkBackground } = Colors[colorScheme];

	const [loadingData, setLoadingData] = useState(true);
	const [userTransaction, setUserTransaction] = useState<PaymentTransaction[]>(
		[]
	);

	useEffect(() => {
		dispatch(startLoading());
		setLoadingData(true);
		const api = new Http({ baseURL });

		(async () => {
			const passcodeToken = await getSecureSaveValue(
				PASSCODE_VERIFICATION_DATA
			);

			const { token } = passcodeToken && JSON.parse(passcodeToken);

			api
				.get('/payments/transactions', {
					params: { page: 1 },
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					const apiResponse = res as { data: PaymentTransaction[] };

					setUserTransaction(apiResponse.data || []);
				})
				.catch((error) => {
					console.debug(error);
					const { status } = error?.response;

					if (status === 401) {
						dispatch(logout());
					}
				})
				.finally(() => {
					setLoadingData(false);
					dispatch(finishLoading());
				});
		})();
	}, []);

	if (loadingData) {
		return <LoadingScreen />;
	}

	return (
		<View style={styles.container}>
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

			<View
				style={[
					styles.searchContainer,
					{ backgroundColor: Colors[colorScheme].iconBackground }
				]}
			>
				<SearchIcon color={colorScheme === 'light' ? '#78767A' : '#808A8D'} />
				<TextInput
					style={[
						styles.input,
						{ color: colorScheme === 'light' ? '#78767A' : '#808A8D' }
					]}
					placeholder="Search"
					placeholderTextColor="#A9A9A9"
				/>
			</View>

			{TransactionGroups(userTransaction).length > 0 ? (
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
										item.kind === 'Credit'
											? '#04D400'
											: Colors[colorScheme].text
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
				/>
			) : (
				<View>
					<Text> You have no Transactions</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
		// paddingHorizontal: 24,
		// paddingTop: 25
	},
	containerPadding: {
		paddingHorizontal: 24
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		marginVertical: 32,
		marginHorizontal: 24,
		height: 50,
		paddingLeft: 10
	},
	input: {
		flex: 1,
		fontSize: 14,
		fontFamily: FONT_500,
		marginLeft: 8
	}
});
