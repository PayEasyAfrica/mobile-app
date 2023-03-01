import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner';
import { HomeStackScreenProps } from '../../../types';
import { QRScannerFrameIcon } from '../../../components/CustomIcons';

const QRCodeScannerScreen: React.FC<HomeStackScreenProps<'Scanner'>> = ({
	navigation
}) => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
		setScanned(true);
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{/* {scanned && ( */}
			<View style={styles.scanAgainContainer}>
				{/* <Text style={styles.scanAgainText} onPress={() => setScanned(false)}>
					Tap to Scan Again
				</Text> */}

				<QRScannerFrameIcon />
			</View>
			{/* )} */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
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
	}
});

export default QRCodeScannerScreen;
