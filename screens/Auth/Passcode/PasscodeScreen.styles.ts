import { StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import { FONT_500, FONT_700 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 30
		// alignItems: 'center',
		// justifyContent: 'center'
	},
	title: {
		fontSize: 24,
		fontFamily: FONT_500,
		marginBottom: 16
	},
	subtitle: {
		fontSize: 14,
		fontFamily: FONT_500,
		marginBottom: 60
	},
	signoutContainer: {
		position: 'absolute',
		bottom: Layout.window.height * (Layout.window.height > 667 ? 0.1 : 0.05),
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	signoutText: {
		fontSize: 14,
		fontFamily: FONT_500
	},
	pinContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 90
	},
	pinDisplay: {
		flexDirection: 'row',
		marginBottom: 16
	},
	pinDigitContainer: {
		width: 10,
		height: 10,
		borderRadius: 50,
		backgroundColor: '#FFDBCE',
		marginHorizontal: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
	pinDigitContainerFilled: {
		width: 13,
		height: 13,
		backgroundColor: '#EF672A'
	},
	pinDigit: {
		fontSize: 24
	},
	keypad: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	keypadIcon: {
		width: Layout.isSmallDevice ? 50 : 65,
		height: Layout.isSmallDevice ? 50 : 65,
		justifyContent: 'center',
		alignItems: 'center'
		// marginVertical: 19,
		// marginHorizontal: 27
	},
	keypadButton: {
		borderRadius: 50,
		width: Layout.isSmallDevice ? 50 : 65,
		height: Layout.isSmallDevice ? 50 : 65,
		marginVertical: 19,
		marginHorizontal: 27,
		alignItems: 'center',
		justifyContent: 'center'
	},
	keypadButtonText: {
		fontSize: 28,
		fontFamily: FONT_700
	},
	deleteButton: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		width: 80,
		height: 80,
		margin: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightgray'
	},
	deleteButtonText: {
		fontSize: 24,
		color: 'white'
	}
});

export default styles;
