import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export const MiniSpinner = ({ style }: { style: object }) => {
	const spinValue = new Animated.Value(0);

	useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true
			})
		).start();
	}, [spinValue]);

	const spin = spinValue.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ['0deg', '180deg', '360deg']
	});

	return (
		<View style={style || styles.spinnerContainer}>
			<Animated.View style={{ transform: [{ rotate: spin }] }}>
				<Svg width={13} height={15} fill="none">
					<Path
						d="M11.092 12.48a6.178 6.178 0 0 1-7.108-.148C1.232 10.316.624 6.465 2.626 3.73 4.254 1.506 7.109.706 9.599 1.57"
						stroke="#E7BEAF"
						strokeWidth={2}
						strokeMiterlimit={10}
						strokeLinecap="round"
					/>
				</Svg>
			</Animated.View>
		</View>
	);
};

export const Spinner = () => {
	const spinValue = new Animated.Value(0);

	useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true
			})
		).start();
	}, [spinValue]);

	const spin = spinValue.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ['0deg', '180deg', '360deg']
	});

	return (
		<View style={styles.spinnerContainer}>
			<Animated.View style={{ transform: [{ rotate: spin }] }}>
				<Svg width={77} height={77} fill="none">
					<Path
						d="M54.876 61.292c-9.521 6.471-22.466 6.617-32.285-.573-12.477-9.137-15.185-26.657-6.048-39.134 7.432-10.149 20.412-13.834 31.712-9.938"
						stroke="#E7BEAF"
						strokeWidth={10}
						strokeMiterlimit={10}
						strokeLinecap="round"
					/>
				</Svg>
			</Animated.View>
		</View>
	);
};

const ActivityIndicator = () => {
	const colorScheme = useColorScheme();

	return (
		<View
			style={[styles.overlay, { backgroundColor: Colors[colorScheme].mask }]}
		>
			<Spinner />
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		// backgroundColor: 'rgba(33, 0, 93, 0.16);',
		zIndex: 9999
	},
	spinnerContainer: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -38.5 }, { translateY: -38.5 }],
		zIndex: 9999
	}
});

export default ActivityIndicator;
