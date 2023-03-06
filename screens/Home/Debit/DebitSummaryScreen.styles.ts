import { StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import { BORDER_RADIUS, FONT_400, FONT_500 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	amount: {
		fontSize: 28,
		fontFamily: FONT_400,
		textAlign: 'center',
		marginBottom: 16
	},
	transactionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 34
	},
	transactionlastRow: { marginBottom: 0 },
	transactionLabel: { fontSize: 16, fontFamily: FONT_500 },
	transactionText: {
		fontSize: 16,
		fontFamily: FONT_500
	},
	downloadButton: {
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: BORDER_RADIUS,
		paddingVertical: 18,
		marginTop: 30,
		marginBottom: 40
	},
	downloadButtonText: {
		fontSize: 16,
		fontFamily: FONT_500
	},
	ellipse: {
		width: 10,
		height: 10,
		borderRadius: 50
	}
});

export default styles;
