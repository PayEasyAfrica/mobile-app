import { StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';

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
		fontFamily: 'Roboto_500Medium',
		marginBottom: 16
	},
	subtitle: {
		fontSize: 14,
		fontFamily: 'Roboto_500Medium'
	},
	signoutContainer: {
		position: 'absolute',
		bottom: Layout.window.height * (Layout.window.height > 667 ? 0.1 : 0.05), // set to 10% of the window height
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	signoutText: {
		fontSize: 14,
		fontFamily: 'Roboto_500Medium'
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
		fontFamily: 'Roboto_700Bold'
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
