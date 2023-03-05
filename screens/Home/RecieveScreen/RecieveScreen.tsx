import {
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	ScrollView,
	Share,
	Alert,
	View as RNView,
	Platform
} from 'react-native';

import { RefObject, useRef, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import { HomeStackScreenProps } from '../../../types';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import { ShareIcon } from '../../../components/CustomIcons';
import { useAppDispatch } from '../../../app/hooks';
import { finishLoading, startLoading } from '../../../features/loadingSlice';
import styles from './RecieveScreen.styles';

const RecieveScreen: React.FC<HomeStackScreenProps<'Receive'>> = ({
	navigation
}) => {
	const [amount, setAmount] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const amountInputRef = useRef<TextInput>(null);
	const shareViewRef = useRef<RNView>(null);

	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const { orange, lightBackground, darkBackground, iconBackground } =
		Colors[colorScheme];

	const handleAmountChange = (amountFig: string) => {
		setAmount(amountFig);
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handlePressOutside = () => {
		if (amountInputRef.current) {
			amountInputRef.current.blur();
		}
	};

	const onShare = async () => {
		try {
			// Capture the view as an image
			const uri = await captureRef(shareViewRef, {
				format: 'png',
				quality: 1,
				result: 'data-uri'
			});

			console.log('uri', uri);

			// Share the saved image using the Share API
			// const result = await Share.share({
			// 	message: 'Check out this awesome image!',
			// 	url: uri //`file://${fileUri}`
			// });

			// if (Platform.OS === 'ios') {
			// 	await Sharing.shareAsync(`file://${fileUri}`);
			// } else {
			// 	await Sharing.shareAsync(fileUri);
			// }

			// if (result.action === Share.sharedAction) {
			// 	if (result.activityType) {
			// 		// shared with activity type of result.activityType
			// 	} else {
			// 		// shared
			// 	}
			// } else if (result.action === Share.dismissedAction) {
			// 	// dismissed
			// }
		} catch (error: any) {
			Alert.alert(error.message);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
			<ScrollView>
				<SafeAreaView style={styles.container}>
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Enter amount (optional)</Text>
						<TextInput
							placeholder="000,000.00"
							value={amount}
							onChangeText={handleAmountChange}
							keyboardType="phone-pad"
							maxLength={10}
							style={[
								styles.amountInput,
								isFocused && { borderColor: orange },
								colorScheme === 'dark' && { color: '#fff' }
							]}
							onFocus={handleFocus}
							onBlur={handleBlur}
							ref={amountInputRef}
						/>
					</View>

					<View style={styles.qrContainer}>
						<QRCode value="http://awesome.link.qr" size={170} />
						<Text style={styles.qrText}>Scan to pay</Text>
					</View>

					<TouchableOpacity
						onPress={() => {
							dispatch(startLoading());
							onShare();

							setTimeout(() => {
								dispatch(finishLoading());
							}, 2000);
						}}
						style={{ marginTop: 101 }}
					>
						<View style={[styles.button, { backgroundColor: orange }]}>
							<ShareIcon
								color={
									colorScheme === 'light' ? lightBackground : darkBackground
								}
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

					<RNView ref={shareViewRef} style={styles.qrSharedImageContainer}>
						{/* The content that you want to share goes here
						<Text>Check out this awesome image!</Text> */}

						<Text style={styles.qrSharedImageTitle}>Scan to pay!</Text>

						<RNView
							style={[
								styles.qrSharedImage,
								{ backgroundColor: iconBackground }
							]}
						>
							<QRCode
								value="http://awesome.link.qr"
								size={200}
								backgroundColor="transparent"
							/>
						</RNView>

						<Text style={styles.qrSharedImageText}>
							Scan on smart phone to pay
						</Text>
					</RNView>
				</SafeAreaView>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default RecieveScreen;
