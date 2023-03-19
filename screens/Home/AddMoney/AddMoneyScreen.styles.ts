import { StyleSheet } from 'react-native';
import { FONT_400, FONT_500 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 112
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
