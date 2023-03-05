import { StyleSheet } from 'react-native';
import { FONT_400, FONT_500 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	title: {
		fontSize: 24,
		fontFamily: FONT_500,
		textAlign: 'center',
		marginTop: 25,
		marginBottom: 8
	},
	sectionContainer: { paddingTop: 24, paddingBottom: 14 },
	sectionName: {
		fontSize: 14,
		fontFamily: FONT_500,
		color: '#B4A9A5'
	},
	settingsItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		borderTopWidth: StyleSheet.hairlineWidth
	},
	settingslastItem: {
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	settingsItemWithoutIcon: {
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	settingsItemText: {
		fontSize: 16,
		fontFamily: FONT_400,
		marginHorizontal: 14
	},
	settingsItemTextWithoutIcon: {
		marginHorizontal: 0
	},
	settingsVerificationText: {
		fontFamily: FONT_400,
		marginLeft: 'auto'
	}
});

export default styles;
