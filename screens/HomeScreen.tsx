import {
	Pressable,
	SectionList,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import {
	CustomTabBarIconProps,
	EyeIcon,
	PlusIcon,
	RecieveIcon,
	SendIcon,
	WithdrawIcon
} from '../components/CustomIcons';
import { SafeAreaView, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootTabScreenProps } from '../types';
import React, { useCallback } from 'react';

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
	}
];

const HomeScreen: React.FC<RootTabScreenProps<'TabOne'>> = ({ navigation }) => {
	const colorScheme = useColorScheme();

	const { orange, gray, lightBackground, darkBackground } = Colors[colorScheme];

	const handleButtonPress = useCallback(() => {
		// handle button press
	}, []);

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
						<Text style={styles.moneyTagId}>123765BF</Text>
					</View>

					<Pressable onPress={() => {}} style={styles.addButton}>
						<PlusIcon color={orange} />
						<Text style={[styles.addButtonTitle, { color: orange }]}>
							Add Money
						</Text>
					</Pressable>
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
							style={{ fontSize: 14, fontFamily: 'Roboto_400Regular' }}
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
						style={{ fontSize: 24, fontFamily: 'Roboto_700Bold' }}
						lightColor={lightBackground}
						darkColor={darkBackground}
					>
						₦ 20,000.00
					</Text>
					<Text
						style={{
							fontSize: 16,
							fontFamily: 'Roboto_400Regular',
							marginTop: 34
						}}
						lightColor={lightBackground}
						darkColor={darkBackground}
					>
						Blessing Mark
					</Text>
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: Colors[colorScheme].iconBackground }
						]}
						onPress={handleButtonPress}
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
						onPress={handleButtonPress}
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
						onPress={handleButtonPress}
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
				sections={DATA}
				style={{ marginTop: 24 }}
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
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingHorizontal: 24,
		paddingTop: 25
	},
	containerPadding: {
		paddingHorizontal: 24
	},
	moneyTagContainer: {
		// flexDirection: 'row',
		// justifyContent: 'space-between'
	},
	moneyTagTitle: {
		fontSize: 10,
		fontFamily: 'Roboto_500Medium',
		marginBottom: 4
	},
	moneyTagId: {
		fontSize: 14,
		fontFamily: 'Roboto_500Medium'
	},
	addButton: { flexDirection: 'row', alignItems: 'center' },
	addButtonTitle: {
		fontSize: 12,
		fontFamily: 'Roboto_500Medium',
		marginLeft: 8
	},

	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 12,
		fontFamily: 'Roboto_500Medium',
		borderRadius: 8,
		padding: 12
	},
	sendButton: {
		marginHorizontal: 14
	},
	buttonText: {
		marginLeft: 8
	}
});

export default HomeScreen;
