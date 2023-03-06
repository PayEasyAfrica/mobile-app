import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import styles from './DebitSummaryScreen.styles';

const TRANSACT = [
	{ label: 'Date & Time', text: '08/02/2023' },
	{ label: 'Amount', text: '-₦10,000' },
	{ label: 'Transaction Type', text: 'Send' },
	{ label: 'Fees', text: '₦10' },
	{ label: 'Bank', text: 'UBA' },
	{ label: 'Reciever', text: 'Abolorunke Mark' },
	{ label: 'Description', text: 'Bill' },
	{ label: 'Reference', text: 'WNFREDKRTE' },
	{ label: 'Status', text: 'Completed' }
];

const DebitSummaryScreen = ({
	navigation
}: HomeStackScreenProps<'DebitSummary'>) => {
	const colorScheme = useColorScheme();
	const { gray, green, orange, lightBackground, darkBackground } =
		Colors[colorScheme];

	return (
		// Login screen UI code goes here
		<SafeAreaView style={styles.container}>
			<Text style={styles.amount}>₦10,000</Text>

			<ScrollView>
				<View
					style={{
						backgroundColor:
							colorScheme === 'light' ? lightBackground : darkBackground
					}}
				>
					{TRANSACT.map((transactItem, index) => (
						<View
							style={[
								styles.transactionRow,
								index === TRANSACT.length - 1 && styles.transactionlastRow
							]}
							lightColor={lightBackground}
							darkColor={darkBackground}
							key={transactItem.label + index}
						>
							<Text style={[styles.transactionLabel, { color: gray }]}>
								{transactItem.label}
							</Text>

							{index === TRANSACT.length - 1 ? (
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={[styles.ellipse, { backgroundColor: green }]} />
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
								<Text style={[styles.transactionText]}>
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
