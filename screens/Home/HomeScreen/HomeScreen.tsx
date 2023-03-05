import { useCallback, useState } from 'react';
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
import { logout } from '../../../features/auth/authSlice';
import Modal from '../../../components/Modal';
import { FONT_400, FONT_500, FONT_700 } from '../../../constants/Style';

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

const HomeScreen: React.FC<HomeStackScreenProps<'Home'>> = ({ navigation }) => {
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();
	const [modalVisible, setModalVisible] = useState(false);

	const { orange, gray, lightBackground, darkBackground } = Colors[colorScheme];

	const handleShowModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
		// Do any necessary cleanup or state changes here
	};

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
						₦ 20,000.00
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
						Blessing Mark
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

							// dispatch(logout());
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
						onPress={() => {
							dispatch(logout());
						}}
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
								<Text style={{ fontSize: 14, fontFamily: FONT_500 }}>
									{item.name}
								</Text>
								<Text
									style={{
										color: Colors[colorScheme].gray,
										fontSize: 10,
										fontFamily: FONT_500,
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
								fontFamily: FONT_500,
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
								fontFamily: FONT_500,
								marginBottom: 16
							}}
						>
							{date}
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
