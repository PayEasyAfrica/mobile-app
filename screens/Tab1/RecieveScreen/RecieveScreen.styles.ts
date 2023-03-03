import { StyleSheet } from 'react-native';
import { FONT_400, FONT_500 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 30
	},
	title: {
		fontSize: 24,
		fontFamily: FONT_500,
		marginBottom: 16
	},
	subtitle: {
		fontSize: 14,
		fontFamily: FONT_500
	},
	inputContainer: {
		marginTop: 48
	},
	label: {
		marginBottom: 8,
		fontSize: 14,
		fontFamily: FONT_400
	},
	amountInput: {
		borderWidth: 1,
		borderColor: '#78767A',
		fontFamily: FONT_500,
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
		fontFamily: FONT_400,
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
		fontFamily: FONT_500,
		marginLeft: 22
	}
});

export default styles;
