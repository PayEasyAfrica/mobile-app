import React, { useRef, useState } from 'react';
import {
	ScrollView,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import { QRIcon } from '../../../components/CustomIcons';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import styles from './SendScreen.styles';

const SendScreen: React.FC<HomeStackScreenProps<'Send'>> = ({ navigation }) => {
	const [formData, setFormData] = useState({
		name: '',
		amount: '',
		description: ''
	});
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const colorScheme = useColorScheme();
	const inputRefs = useRef<Array<TextInput>>([]);

	const { gray, orange, lightBackground, darkBackground, iconBackground } =
		Colors[colorScheme];

	const handlePressOutside = () => {
		setFocusedIndex(-1);
	};

	const handleFocus = (index: number) => {
		setFocusedIndex(index);
	};

	const handleBlur = () => {
		setFocusedIndex(-1);
	};

	const handleInputChange = (key: string, value: string) => {
		setFormData({ ...formData, [key]: value });
	};

	const handleSend = () => {
		// Handle sending form data
	};

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
			<View style={styles.container}>
				<ScrollView>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Scanner');
						}}
					>
						<View
							style={[styles.scanButton, { backgroundColor: iconBackground }]}
						>
							<QRIcon color={orange} />
							<Text style={[styles.scanButtonText, { color: orange }]}>
								Scan
							</Text>
						</View>
					</TouchableOpacity>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Money Tag</Text>
						<TextInput
							placeholder="Enter tag"
							placeholderTextColor={gray}
							ref={(ref) => ref && (inputRefs.current[0] = ref)}
							style={[
								styles.input,
								focusedIndex === 0 && { borderColor: orange },
								colorScheme === 'dark' && { color: '#fff' }
							]}
							value={formData.name}
							onChangeText={(text) => handleInputChange('name', text)}
							onFocus={() => handleFocus(0)}
							onBlur={handleBlur}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Recipient’s Name</Text>
						<TextInput
							placeholder="Tag Holder Name"
							placeholderTextColor={gray}
							ref={(ref) => ref && (inputRefs.current[1] = ref)}
							style={[
								styles.input,
								focusedIndex === 1 && { borderColor: orange },
								colorScheme === 'dark' && { color: '#fff' }
							]}
							value={formData.name}
							onChangeText={(text) => handleInputChange('name', text)}
							onFocus={() => handleFocus(0)}
							onBlur={handleBlur}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Amount</Text>
						<TextInput
							placeholder="000,000.00"
							placeholderTextColor={gray}
							ref={(ref) => ref && (inputRefs.current[2] = ref)}
							style={[
								styles.input,
								focusedIndex === 2 && { borderColor: orange },
								colorScheme === 'dark' && { color: '#fff' }
							]}
							value={formData.amount}
							onChangeText={(text) => handleInputChange('amount', text)}
							onFocus={() => handleFocus(1)}
							onBlur={handleBlur}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Description</Text>
						<TextInput
							ref={(ref) => ref && (inputRefs.current[3] = ref)}
							style={[
								styles.input,
								focusedIndex === 3 && { borderColor: orange },
								colorScheme === 'dark' && { color: '#fff' }
							]}
							value={formData.description}
							onChangeText={(text) => handleInputChange('description', text)}
							onFocus={() => handleFocus(2)}
							onBlur={handleBlur}
						/>
					</View>

					<TouchableOpacity
						style={[styles.button, { backgroundColor: orange }]}
						onPress={handleSend}
					>
						<Text
							style={styles.buttonText}
							lightColor={lightBackground}
							darkColor={darkBackground}
						>
							Send
						</Text>
					</TouchableOpacity>

					<View style={{ paddingBottom: 40 }} />
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SendScreen;
