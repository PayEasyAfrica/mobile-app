import { StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 25
	},
	containerPadding: {
		paddingHorizontal: 24
	},
	moneyTagContainer: {
		// flexDirection: 'row',
		// justifyContent: 'space-between'
	},
	moneyTagTitle: {
		fontSize: 10,
		fontFamily: 'Roboto_500Medium',
		marginBottom: 4
	},
	moneyTagId: {
		fontSize: 14,
		fontFamily: 'Roboto_500Medium'
	},
	addButton: { flexDirection: 'row', alignItems: 'center' },
	addButtonTitle: {
		fontSize: 12,
		fontFamily: 'Roboto_500Medium',
		marginLeft: 8
	},

	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24,
		marginBottom: 24
	},
	button: {
		...(!Layout.isSmallDevice && { flex: 1 }),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 12,
		borderRadius: 8,
		padding: 12
	},
	sendButton: {
		marginHorizontal: 14
	},
	buttonText: {
		marginLeft: 8,
		fontFamily: 'Roboto_500Medium'
	}
});

export default styles;
