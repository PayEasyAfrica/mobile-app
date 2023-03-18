import { StyleSheet } from 'react-native';
import { FONT_500 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1
		// paddingHorizontal: 24
	},
	title: {
		fontSize: 24,
		fontFamily: FONT_500,
		textAlign: 'center',
		marginTop: 25
	},
	shadow: {
		// elevation: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 10
		},
		shadowOpacity: 0.04,
		shadowRadius: 20
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 18,
		borderRadius: 8
	},
	buttonText: {
		fontSize: 16,
		fontFamily: FONT_500,
		marginLeft: 22
	}
});

export default styles;
