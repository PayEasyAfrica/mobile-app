import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

const LoadingScreen = () => {
	return <View style={styles.container} />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default LoadingScreen;
