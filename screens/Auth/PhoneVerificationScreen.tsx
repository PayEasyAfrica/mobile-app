import {
	TouchableOpacity,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback
} from 'react-native';

import { SafeAreaView, Text, View } from '../../components/Themed';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { RefObject, useRef, useState } from 'react';
import { RootStackScreenProps } from '../../types';

const PhoneVerificationScreen = ({
	navigation
}: RootStackScreenProps<'PhoneVerification'>) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const phoneInputRef: RefObject<TextInput> = useRef<TextInput>(null);

	const colorScheme = useColorScheme();

	const { orange, lightBackground, darkBackground, gray } = Colors[colorScheme];

	const handlePhoneNumberChange = (phoneNumber: string) => {
		setPhoneNumber(phoneNumber);
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handlePressOutside = () => {
		if (phoneInputRef.current) {
			phoneInputRef.current.blur();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>Verify Phone Number</Text>
				<Text style={styles.subtitle} lightColor="#5F5E62" darkColor={gray}>
					Verify your number to continue.
				</Text>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Phone Number</Text>
					<TextInput
						placeholder="Enter phone number"
						value={phoneNumber}
						onChangeText={handlePhoneNumberChange}
						keyboardType="phone-pad"
						maxLength={10}
						style={[
							styles.phoneInput,
							isFocused && { borderColor: orange },
							colorScheme === 'dark' && { color: '#fff' }
						]}
						onFocus={handleFocus}
						onBlur={handleBlur}
						ref={phoneInputRef}
					/>
				</View>

				<TouchableOpacity
					onPress={() => {
						navigation.navigate('OTPVerification');
					}}
					style={{ marginTop: 101 }}
				>
					<View style={[styles.button, { backgroundColor: orange }]}>
						<Text
							style={styles.buttonText}
							lightColor={lightBackground}
							darkColor={darkBackground}
						>
							Continue
						</Text>
					</View>
				</TouchableOpacity>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

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
	inputContainer: {
		marginTop: 48
	},
	label: {
		marginBottom: 8,
		fontSize: 14,
		fontFamily: 'Roboto_400Regular'
	},
	phoneInput: {
		borderWidth: 1,
		borderColor: '#78767A',
		fontFamily: 'Roboto_500Medium',
		borderRadius: 8,
		paddingVertical: 18,
		paddingHorizontal: 14
	},
	button: {
		paddingVertical: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8
	},
	buttonText: {
		fontSize: 16,
		fontFamily: 'Roboto_500Medium'
	}
});

export default PhoneVerificationScreen;
