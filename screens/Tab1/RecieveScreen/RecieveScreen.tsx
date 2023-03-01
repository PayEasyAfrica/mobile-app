import {
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback
} from 'react-native';

import { SafeAreaView, Text, View } from '../../../components/Themed';

import { RefObject, useRef, useState } from 'react';
import { HomeStackScreenProps } from '../../../types';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import QRCode from 'react-native-qrcode-svg';
import { ShareIcon } from '../../../components/CustomIcons';
import { useAppDispatch } from '../../../app/hooks';
import { finishLoading, startLoading } from '../../../features/loadingSlice';
import styles from './RecieveScreen.styles';

const RecieveScreen: React.FC<HomeStackScreenProps<'Receive'>> = ({
	navigation
}) => {
	const [amount, setAmount] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const amountInputRef: RefObject<TextInput> = useRef<TextInput>(null);

	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const { orange, lightBackground, darkBackground, gray } = Colors[colorScheme];

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

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
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

						setTimeout(() => {
							dispatch(finishLoading());
						}, 2000);
					}}
					style={{ marginTop: 101 }}
				>
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
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default RecieveScreen;
