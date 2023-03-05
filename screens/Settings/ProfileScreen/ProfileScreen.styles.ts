import { StyleSheet } from 'react-native';
import { FONT_400, FONT_500 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	imgContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		overflow: 'hidden'
	},
	textContainer: {
		paddingVertical: 2,
		marginBottom: 24,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	label: {
		color: '#B4A9A5',
		fontSize: 14,
		fontFamily: FONT_500,
		marginBottom: 8
	},
	text: {
		fontSize: 16,
		fontFamily: FONT_400
	},
	centralize: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30
	}
});

export default styles;
