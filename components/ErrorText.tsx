import { StyleSheet } from 'react-native';
import { FONT_400 } from '../constants/Style';
import { Text, View } from './Themed';

interface ErrorTextProps {
	errorMsg: string;
}

function ErrorText({ errorMsg }: ErrorTextProps) {
	return (
		<View style={styles.errorContainer}>
			<View style={styles.errorDot} />
			<Text style={styles.errorText}>{errorMsg}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	errorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8
	},
	errorDot: {
		height: 4,
		width: 4,
		borderRadius: 50,
		backgroundColor: '#BA1A1A'
	},
	errorText: {
		fontSize: 14,
		fontFamily: FONT_400,
		color: '#BA1A1A',
		marginLeft: 10
	}
});

export default ErrorText;
