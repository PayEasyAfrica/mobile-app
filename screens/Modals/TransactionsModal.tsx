import { StatusBar } from 'expo-status-bar';
import { Platform, SectionList, StyleSheet, TextInput } from 'react-native';
import { RecieveIcon, SearchIcon } from '../../components/CustomIcons';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

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
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' },
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' }
		]
	},
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
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' },
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' }
		]
	},
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
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' },
			{ name: 'Abolorunke Blessing', time: '12:20pm', amount: '+₦10,000' }
		]
	}
];

export default function TransactionsModal() {
	const colorScheme = useColorScheme();
	const { orange, lightBackground, darkBackground } = Colors[colorScheme];

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

			<SectionList
				sections={DATA}
				keyExtractor={(item, index) => item.time + index}
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
								<RecieveIcon color={orange} />
							</View>

							<View lightColor={lightBackground} darkColor={darkBackground}>
								<Text style={{ fontSize: 14, fontFamily: 'Roboto_500Medium' }}>
									{item.name}
								</Text>
								<Text
									style={{
										color: Colors[colorScheme].gray,
										fontSize: 10,
										fontFamily: 'Roboto_500Medium',
										marginTop: 4
									}}
								>
									{item.time}
								</Text>
							</View>
						</View>

						<Text
							style={{
								fontSize: 12,
								fontFamily: 'Roboto_500Medium',
								color:
									item.amount.charAt(0) === '+'
										? '#04D400'
										: Colors[colorScheme].text
							}}
						>
							{item.amount}
						</Text>
					</View>
				)}
				renderSectionHeader={({ section: { date } }) => (
					<View style={styles.containerPadding}>
						<Text
							style={{
								color: Colors[colorScheme].gray,
								fontSize: 10,
								fontFamily: 'Roboto_500Medium',
								marginBottom: 16
							}}
						>
							{date}
						</Text>
					</View>
				)}
			/>
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
		fontFamily: 'Roboto_500Medium',
		marginLeft: 8
	}
});
