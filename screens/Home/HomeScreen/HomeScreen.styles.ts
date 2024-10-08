import { StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import { FONT_400, FONT_500 } from '../../../constants/Style';

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
		fontFamily: FONT_500,
		marginBottom: 4
	},
	moneyTagId: {
		fontSize: 14,
		fontFamily: FONT_500,
		textTransform: 'uppercase'
	},
	addButton: { flexDirection: 'row', alignItems: 'center' },
	addButtonTitle: {
		fontSize: 12,
		fontFamily: FONT_500,
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
		fontFamily: FONT_500
	},
	sectionTitle: {
		fontSize: 20,
		fontFamily: FONT_500
	},
	noDataContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	noDataText: {
		textAlign: 'center',
		marginTop: 24,
		fontSize: 16,
		fontFamily: FONT_500
	},
	noDataSubText: {
		textAlign: 'center',
		marginTop: 14,
		fontSize: 12,
		fontFamily: FONT_400
	}
});

export default styles;
