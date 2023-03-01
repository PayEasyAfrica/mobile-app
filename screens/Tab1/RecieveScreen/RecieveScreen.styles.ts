import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 30
	},
	title: {
		fontSize: 24,
		fontFamily: 'Roboto_500Medium',
		marginBottom: 16
	},
	subtitle: {
		fontSize: 14,
		fontFamily: 'Roboto_500Medium'
	},
	inputContainer: {
		marginTop: 48
	},
	label: {
		marginBottom: 8,
		fontFamily: 'Roboto_400Regular'
	},
	amountInput: {
		borderWidth: 1,
		borderColor: '#78767A',
		fontFamily: 'Roboto_500Medium',
		borderRadius: 8,
		paddingVertical: 18,
		paddingHorizontal: 14
	},
	qrContainer: {
		alignItems: 'center',
		marginTop: 70
	},
	qrText: {
		fontSize: 16,
		fontFamily: 'Roboto_400Regular',
		marginTop: 30
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		paddingVertical: 18
	},
	buttonText: {
		fontSize: 16,
		fontFamily: 'Roboto_500Medium',
		marginLeft: 22
	}
});

export default styles;
