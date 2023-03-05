import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, FONT_400, FONT_500 } from '../../../constants/Style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	sectionContainer: { paddingTop: 32, paddingBottom: 14 },
	sectionName: {
		fontSize: 14,
		fontFamily: FONT_500,
		color: '#B4A9A5'
	},
	NotificationsItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		borderTopWidth: StyleSheet.hairlineWidth
	},
	NotificationslastItem: {
		borderBottomWidth: StyleSheet.hairlineWidth
	},

	NotificationsItemText: {
		fontSize: 16,
		fontFamily: FONT_400,
		marginHorizontal: 14
	},
	button: {
		paddingVertical: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: BORDER_RADIUS
	},
	buttonText: {
		fontSize: 16,
		fontFamily: FONT_500
	}
});

export default styles;
