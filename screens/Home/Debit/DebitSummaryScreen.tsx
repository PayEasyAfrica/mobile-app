import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../../../app/hooks';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { finishLoading, startLoading } from '../../../features/loadingSlice';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import LoadingScreen from '../../LoadingScreen';
import styles from './DebitSummaryScreen.styles';

interface Transactions {
	createdAt: string;
	amount: string;
	title: string;
	description: string;
	fee: string;
	reference: string;
	status: string;
	type: string;
	kind: string;
	[key: string]: string;
}

function formatTransactionDetails(transaction: Transactions) {
	const {
		amount,
		balance,
		category,
		createdAt,
		description,
		fee,
		reference,
		status,
		title,
		toFrom,
		type,
		kind
	} = transaction;

	const formattedDate = new Date(createdAt).toLocaleString();
	const formattedAmount =
		Number(amount) < 0 ? `-₦${Math.abs(Number(amount))}` : `₦${amount}`;

	const transactionDetails = [
		{ label: 'Date & Time', text: formattedDate },
		{ label: 'Amount', text: formattedAmount },
		{ label: 'Transaction Type', text: kind },
		{ label: 'Fees', text: `₦${fee}` },
		// { label: 'Bank', text: '' }, // Replace with the bank name if available in the object
		{ label: 'Receiver', text: title },
		{ label: 'Description', text: description },
		{ label: 'Reference', text: reference },
		{ label: 'Status', text: status }
	];

	// const transactionString = transactionDetails
	// 	.map((detail) => `${detail.label}: ${detail.text}`)
	// 	.join('\n');

	return transactionDetails;
}

const DebitSummaryScreen = ({
	navigation
}: HomeStackScreenProps<'DebitSummary'>) => {
	const [loading, setLoading] = useState(true);
	const [transactionDetails, setTransactionDetails] = useState(
		[] as {
			label: string;
			text: string;
		}[]
	);

	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();
	const { gray, green, orange, lightBackground, darkBackground } =
		Colors[colorScheme];

	const route = useRoute();
	const { summary } = route.params as { summary: Transactions };

	useEffect(() => {
		dispatch(startLoading());
		console.log('DebitSummaryScreen', summary);

		setTransactionDetails(formatTransactionDetails(summary));
		setLoading(false);
		dispatch(finishLoading());
	}, [summary]);

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<Text style={styles.amount}>₦{summary.amount}</Text>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					style={{
						backgroundColor:
							colorScheme === 'light' ? lightBackground : darkBackground
					}}
				>
					{transactionDetails &&
						transactionDetails.map((transactItem, index) => (
							<View
								style={[
									styles.transactionRow,
									index === transactionDetails.length - 1 &&
										styles.transactionlastRow
								]}
								lightColor={lightBackground}
								darkColor={darkBackground}
								key={transactItem.label + index}
							>
								<Text style={[styles.transactionLabel, { color: gray }]}>
									{transactItem.label}
								</Text>

								{index === transactionDetails.length - 1 ? (
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<View
											style={[styles.ellipse, { backgroundColor: green }]}
										/>
										<Text
											style={[
												styles.transactionText,
												{ color: green, marginLeft: 4 }
											]}
										>
											{transactItem.text}
										</Text>
									</View>
								) : (
									<Text
										style={[
											styles.transactionText,
											transactItem.label === 'Reference' && {
												textTransform: 'uppercase'
											}
										]}
									>
										{transactItem.text}
									</Text>
								)}
							</View>
						))}
				</View>
			</ScrollView>

			<TouchableOpacity
				style={[styles.downloadButton, { borderColor: orange }]}
			>
				<Text style={[styles.downloadButtonText, { color: orange }]}>
					Download reciept
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default DebitSummaryScreen;
