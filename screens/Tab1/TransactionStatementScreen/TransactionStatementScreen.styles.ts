import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1
		// paddingHorizontal: 24,
		// paddingTop: 25
	},
	containerPadding: {
		paddingHorizontal: 24
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		marginVertical: 32,
		marginHorizontal: 24,
		height: 50,
		paddingLeft: 10
	},
	input: {
		flex: 1,
		fontSize: 14,
		fontFamily: 'Roboto_500Medium',
		marginLeft: 8
	}
});

export default styles;
