import React, { useState, useEffect, useRef } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Platform,
	Alert
} from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner';
import { Camera, FlashMode } from 'expo-camera';
import { HomeStackScreenProps } from '../../../types';
import {
	QRScannerFrameIcon,
	TouchlightIcon
} from '../../../components/CustomIcons';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import { setValues } from '../../../features/barcodeSlice';
import { useAppDispatch } from '../../../app/hooks';

const QRCodeScannerScreen: React.FC<HomeStackScreenProps<'Scanner'>> = ({
	navigation
}) => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState<boolean>(false);
	const [flashOn, setFlashOn] = useState<boolean>(false);
	const cameraRef = useRef<Camera>(null);

	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme();

	const { iconBackground, orange } = Colors[colorScheme];

	// // !IMPORTANT: Temporary Code, Remove
	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		navigation.navigate('Authorize');
	// 	}, 2000);

	// 	return () => clearTimeout(timeout);
	// }, []);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
		setScanned(true);

		const values = { moneyTag: '', amount: '' };

		// Split the string by the delimiter '/'
		const dataArr = data.split('/');
		console.log(type, data, dataArr);

		// Assign the values to an object
		if (dataArr.length >= 4) {
			values.moneyTag = dataArr[3];
		}
		if (dataArr.length >= 5) {
			values.amount = dataArr[4];
		}

		dispatch(setValues(values));
		navigation.goBack();

		// Alert.alert(
		// 	'',
		// 	`Bar code with type ${type} and data ${data} has been scanned!`,
		// 	[
		// 		{
		// 			text: 'Ok',
		// 			onPress: () =>
		// 				navigation.navigate('Authorize', { type: 'send' } as never)
		// 		}
		// 	]
		// );
	};

	const toggleFlash = () => {
		setFlashOn((prev) => !prev);
	};

	const handleFlashlight = async () => {
		if (cameraRef.current) {
			const { status } = await Camera.requestCameraPermissionsAsync();
			if (status === 'granted') {
				toggleFlash();
				// cameraRef.current?.setFlashMode(
				// 	flashOn ? FlashMode.off : FlashMode.torch
				// );
			}
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera
				ref={cameraRef}
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
				flashMode={flashOn ? FlashMode.torch : FlashMode.off}
			/>
			<View style={styles.scanAgainContainer}>
				<QRScannerFrameIcon />
			</View>

			<TouchableOpacity
				style={[styles.flashlightButton, { backgroundColor: iconBackground }]}
				onPress={handleFlashlight}
			>
				<TouchlightIcon color={orange} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
		// flexDirection: 'column',
		// justifyContent: 'center'
	},
	scanAgainContainer: {
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
		padding: 12,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%', // add this line to make the container take up the full width of the screen
		height: '100%'
	},
	scanAgainText: {
		color: '#fff',
		fontSize: 20
	},
	flashlightButton: {
		position: 'absolute',
		bottom: 40,
		alignSelf: 'center',
		borderRadius: 50,
		padding: 10
	}
});

export default QRCodeScannerScreen;
