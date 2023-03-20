import React from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { FONT_400, FONT_500 } from '../constants/Style';
import useColorScheme from '../hooks/useColorScheme';
import ErrorText from './ErrorText';
import { Text, View } from './Themed';

interface InputProps {
	label: string;
	placeholder: string;
	keyboardType?: KeyboardTypeOptions | undefined;
	editable?: boolean;
	style?: object;
	maxLength?: number;
	value: string;
	error?: string | undefined;
	touched?: boolean | undefined;
	onChangeText: (text: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	focusedIndex?: boolean | undefined;
}

const InputField = (props: InputProps) => {
	const {
		label,
		placeholder,
		keyboardType = 'default',
		editable = true,
		maxLength,
		style,
		value,
		error,
		touched,
		onChangeText,
		onFocus,
		onBlur,
		focusedIndex
	} = props;

	const colorScheme = useColorScheme();
	const { gray, orange } = Colors[colorScheme];
	const borderColor =
		touched && error ? '#BA1A1A' : focusedIndex ? orange : gray;

	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				placeholder={placeholder}
				keyboardType={keyboardType}
				editable={editable}
				maxLength={maxLength && maxLength}
				style={[
					styles.input,
					focusedIndex && { borderColor: orange },
					colorScheme === 'dark' && { color: '#fff' },
					touched && error ? { borderColor } : null,
					style && style
				]}
				placeholderTextColor={gray}
				value={value}
				onChangeText={onChangeText}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			{touched && error && <ErrorText errorMsg={error} />}
		</View>
	);
};

const styles = {
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
	}
};

export default InputField;
