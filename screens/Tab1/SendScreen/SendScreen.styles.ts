import { StyleSheet } from 'react-native';
import { FONT_400, FONT_500 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 40
	},
	scanButton: {
		flexDirection: 'row',
		alignItems: `center`,
		justifyContent: 'center',
		paddingVertical: 18,
		borderRadius: 8,
		marginTop: 48,
		marginBottom: 24
	},
	scanButtonText: {
		fontSize: 20,
		fontFamily: FONT_500,
		marginLeft: 8
	},
	inputContainer: {
		marginBottom: 24
	},
	label: {
		marginBottom: 8,
		fontSize: 14,
		fontFamily: FONT_400
	},
	input: {
		borderWidth: 1,
		borderColor: '#EDE0DC',
		fontFamily: FONT_500,
		borderRadius: 8,
		paddingVertical: 18,
		paddingHorizontal: 14
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		paddingVertical: 18,
		marginTop: 28
	},
	buttonText: {
		fontSize: 16,
		fontFamily: FONT_500,
		marginLeft: 22
	}
});

export default styles;
