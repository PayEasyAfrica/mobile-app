import { useEffect, useState } from 'react';
import {
	Alert,
	Image,
	Platform,
	ScrollView,
	ToastAndroid,
	TouchableOpacity,
	Share,
	View as RNView
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { CopyIcon, ShareIcon } from '../../../components/CustomIcons';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import { getSecureSaveValue } from '../../../components/utils/functions';
import Colors from '../../../constants/Colors';
import { FONT_500 } from '../../../constants/Style';
import { PASSCODE_VERIFICATION_DATA } from '../../../constants/Variables';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './ReferralScreen.style';

export default function ReferralScreen() {
	const [userTag, setUserTag] = useState('');
	const [feedback, setFeedback] = useState('');

	const colorScheme = useColorScheme();
	const { gray, lightBackground, darkBackground, orange, iconBackground } =
		Colors[colorScheme];

	useEffect(() => {
		getSecureSaveValue(PASSCODE_VERIFICATION_DATA).then((userData) => {
			if (userData) {
				const { user } = JSON.parse(userData);
				setUserTag(user.moneyTag);
			}
		});
	}, []);

	useEffect(() => {
		if (feedback) {
			if (Platform.OS === 'android') {
				ToastAndroid.show(feedback, ToastAndroid.SHORT);
			} else {
				Alert.alert(feedback);
			}
		}
	}, [feedback]);

	const copyToClipboard = async (userTag: string) => {
		try {
			await Clipboard.setStringAsync('userTag');
			setFeedback('Copied to clipboard!');
		} catch (error) {
			setFeedback('Failed to copy to clipboard');
		}
	};

	const handleShare = async () => {
		const url = `https://app.payeasy.africa/${userTag}`;

		//

		try {
			const result = await Share.share({
				message: `I wanted to introduce you to PayEasy - an amazing app that lets you make fast and reliable cashless transactions right from your phone! As a bonus, if you sign up using my referral tag , you'll also get a commission on your first transaction! \n\n ${url}`
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			// @ts-ignore
			alert(error.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator
				style={{ paddingHorizontal: 24 }}
			>
				<Text style={styles.title}>Referral code</Text>

				<View style={{ alignItems: 'center', marginTop: 60 }}>
					<View
						style={[
							{
								position: 'relative',
								width: 136,
								height: 136,
								borderRadius: 100
							},
							styles.shadow
						]}
						lightColor={lightBackground}
						darkColor={iconBackground}
					>
						<View
							style={{
								position: 'absolute',
								width: 40,
								height: 40,
								top: 0,
								left: 50
							}}
						>
							<Image
								source={require('../../../assets/images/ellipse1.png')}
								style={{
									width: '100%',
									height: '100%',
									resizeMode: 'cover'
								}}
							/>
						</View>

						<View style={{ width: 42, height: 42, top: 80, left: 85 }}>
							<Image
								source={require('../../../assets/images/ellipse2.png')}
								style={{
									width: '100%',
									height: '100%',
									resizeMode: 'cover'
								}}
							/>
						</View>

						<View style={{ width: 27, height: 27, top: 30, left: 0 }}>
							<Image
								source={require('../../../assets/images/ellipse3.png')}
								style={{
									width: '100%',
									height: '100%',
									resizeMode: 'cover'
								}}
							/>
						</View>
					</View>
				</View>

				<View style={{ alignItems: 'center', marginTop: 48 }}>
					<Text
						style={{
							fontSize: 20,
							fontFamily: FONT_500,
							textAlign: 'center',
							marginBottom: 24
						}}
					>
						Get Referral Commission
					</Text>

					<Text
						style={{
							fontSize: 16,
							fontFamily: FONT_500,
							textAlign: 'center',
							color: gray,
							maxWidth: 331,
							marginBottom: 58
						}}
					>
						You’ll get transaction commission when they sign up
					</Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: iconBackground,
						paddingVertical: 18,
						marginHorizontal: 17,
						borderRadius: 8
					}}
				>
					{userTag && (
						<Text
							style={{
								fontSize: 20,
								fontFamily: FONT_500,
								marginRight: 8,
								textTransform: 'uppercase'
							}}
						>
							{userTag}
						</Text>
					)}
					<TouchableOpacity onPress={() => copyToClipboard(userTag)}>
						<CopyIcon color={orange} />
					</TouchableOpacity>
				</View>

				<TouchableOpacity onPress={handleShare} style={{ marginTop: 101 }}>
					<View style={[styles.button, { backgroundColor: orange }]}>
						<ShareIcon
							color={colorScheme === 'light' ? lightBackground : darkBackground}
						/>
						<Text
							style={styles.buttonText}
							lightColor={lightBackground}
							darkColor={darkBackground}
						>
							Share
						</Text>
					</View>
				</TouchableOpacity>
				<View style={{ paddingBottom: 60 }} />
			</ScrollView>
		</SafeAreaView>
	);
}
