import React, { useState, useEffect, ReactNode } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Text } from './Themed';

const { width, height } = Dimensions.get('screen');

type ModalProps = {
	visible: boolean;
	onClose: () => void;
	renderContent: () => ReactNode;
};

const Modal = ({ visible, onClose, renderContent }: ModalProps) => {
	const colorScheme = useColorScheme();
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		if (visible) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true
			}).start();
		} else {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true
			}).start(() => {
				onClose && onClose();
			});
		}
	}, [visible]);

	return (
		<>
			{visible ? (
				<View style={styles.overlay}>
					<Animated.View
						style={[
							styles.modalContainer,
							{ opacity: fadeAnim },
							{ backgroundColor: Colors[colorScheme].background }
						]}
					>
						<Text style={styles.modalText}>
							Are you sure you want to logout?
						</Text>
						{renderContent()}
					</Animated.View>
				</View>
			) : null}
		</>
	);
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(33, 0, 93, 0.16);',
		zIndex: 9999,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContainer: {
		borderRadius: 10,
		height: 192,
		width: 277,
		paddingHorizontal: 19,
		paddingVertical: 42,
		alignItems: 'center',
		justifyContent: 'center'
	},
	modalText: {
		fontSize: 16,
		fontFamily: 'Roboto_500Medium',
		textAlign: 'center'
	}
});

export default Modal;
