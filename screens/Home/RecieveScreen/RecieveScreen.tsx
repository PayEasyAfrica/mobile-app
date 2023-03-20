import {
	TouchableOpacity,
	TextInput,
	Share,
	Alert,
	View as RNView,
	Platform,
	Image
} from 'react-native';

import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { HomeStackScreenProps } from '../../../types';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import {
	SafeAreaView,
	ScrollView,
	Text,
	View
} from '../../../components/Themed';
import { ShareIcon } from '../../../components/CustomIcons';
import { useAppDispatch } from '../../../app/hooks';
import { finishLoading, startLoading } from '../../../features/loadingSlice';
import styles from './RecieveScreen.styles';
import InputField from '../../../components/InputField';
import {
	debounce,
	getSecureSaveValue
} from '../../../components/utils/functions';
import { Http, baseURL } from '../../../components/utils/http';
import { MiniSpinner, Spinner } from '../../../components/ActivityIndicator';
import { PASSCODE_VERIFICATION_DATA } from '../../../constants/Variables';
import Layout from '../../../constants/Layout';
import { logout } from '../../../features/auth/authSlice';
import { AxiosError } from 'axios';

// Defining the debounce delay time (in milliseconds)
const DEBOUNCE_DELAY = 1000;

const validationSchema = Yup.object().shape({
	amount: Yup.string()
});

const RecieveScreen: React.FC<HomeStackScreenProps<'Receive'>> = ({
	navigation
}) => {
	const [loading, setLoading] = useState(false);
	const [authorizationToken, setAuthorizationToken] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const [barcode, setBarcode] = useState('');
	const amountInputRef = useRef<TextInput>(null);
	const shareViewRef = useRef<RNView>(null);

	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();

	const { gray, orange, lightBackground, darkBackground, iconBackground } =
		Colors[colorScheme];

	useEffect(() => {
		(async () => {
			const passcodeToken = await getSecureSaveValue(
				PASSCODE_VERIFICATION_DATA
			);
			const { token } = passcodeToken && JSON.parse(passcodeToken);
			setAuthorizationToken(token);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const api = new Http({ baseURL });

			try {
				if (authorizationToken) {
					const apiResponse: { data: string } = await api.get(
						'/payments/barcodes',
						{
							headers: {
								Authorization: `Bearer ${authorizationToken}`
							}
						}
					);

					setBarcode(apiResponse.data);
				}
			} catch (error) {
				console.debug(error);
				const axiosError = error as AxiosError;
				const status = axiosError?.response?.status;

				if (status === 401) {
					dispatch(logout());
				}
			} finally {
				setLoading(false);
			}
		})();
	}, [authorizationToken]);

	const handleAmountFormat = (amount: string) => {
		console.log('amount', amount);

		amount = amount.replace(/[^0-9]/g, '');
		// Convert to number and format with two decimal places and commas
		const formattedAmount = (Number(amount) / 100).toLocaleString(undefined, {
			minimumFractionDigits: 1,
			maximumFractionDigits: 2
		});

		return formattedAmount;
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handlePressOutside = () => {
		if (amountInputRef.current) {
			amountInputRef.current.blur();
		}
	};

	const handleAmountChange = debounce(async (value) => {
		const api = new Http({ baseURL });

		setLoading(true);
		setBarcode('');

		try {
			if (value) {
				const apiResponse: { data: string } = await api.get(
					'/payments/barcodes',
					{
						params: { amount: value },
						headers: {
							Authorization: `Bearer ${authorizationToken}`
						}
					}
				);

				setBarcode(apiResponse.data);
			}
		} catch (error) {
			console.debug(error);
			const axiosError = error as AxiosError;
			const status = axiosError?.response?.status;

			if (status === 401) {
				dispatch(logout());
			}
		} finally {
			// setTimeout(() => {
			setLoading(false);
			// }, 2000);
		}
	}, DEBOUNCE_DELAY);

	const onShare = async () => {
		try {
			// Capture the view as an image
			const uri = await captureRef(shareViewRef, {
				format: 'png',
				quality: 1,
				result: 'data-uri'
			});

			// console.log('uri', uri);

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

	const handleShare = async (values: { amount: string }) => {
		console.log('values', values);
		// dispatch(startLoading());
	};

	return (
		<ScrollView style={styles.container}>
			<Formik
				initialValues={{
					amount: ''
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => handleShare(values)}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched
				}) => {
					// console.log('values', values);

					return (
						<>
							<View>
								{loading && (
									<MiniSpinner
										style={{
											position: 'absolute',
											top: '80%',
											right: 0,
											transform: [{ translateX: -38.5 }, { translateY: -38.5 }],
											zIndex: 9999
										}}
									/>
								)}

								<InputField
									label="Enter amount (optional)"
									placeholder="000,000.00"
									value={values.amount}
									keyboardType="phone-pad"
									error={errors.amount}
									touched={touched.amount}
									onChangeText={(value) => {
										handleChange('amount')(value); // Call the original handleChange function
										handleAmountChange(value); // Call the debounced function to make the API call
									}}
									onFocus={() => handleFocus()}
									onBlur={() => handleBlur('amount')}
									focusedIndex={isFocused}
								/>
							</View>

							<View style={styles.qrContainer}>
								{/* <QRCode value="http://awesome.link.qr" size={170} /> */}
								{barcode ? (
									<Image
										style={{
											width: '100%',
											height: '100%',
											resizeMode: 'contain'
										}}
										source={{
											uri: barcode
										}}
									/>
								) : (
									<View style={{ width: 170, height: 170 }}>
										<Spinner />
									</View>
								)}

								<Text style={styles.qrText}>Scan to pay</Text>
							</View>
						</>
					);
				}}
			</Formik>
			<TouchableOpacity
				onPress={() => {}}
				style={[styles.button, { backgroundColor: orange }]}
			>
				<>
					<ShareIcon color="#fff" />
					<Text style={styles.buttonText} lightColor={lightBackground}>
						Share
					</Text>
				</>
			</TouchableOpacity>

			{/* <View style={{ paddingBottom: 200 }} /> */}
		</ScrollView>
	);
};

export default RecieveScreen;
