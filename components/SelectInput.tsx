import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { FONT_400, FONT_500 } from '../constants/Style';
import useColorScheme from '../hooks/useColorScheme';
import { ArrowDropdown } from './CustomIcons';
import ErrorText from './ErrorText';
import InputField from './InputField';
import { SafeAreaView, ScrollView, Text, View } from './Themed';

type Bank = {
	name: string;
	deleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	id: string;
};

interface SelectInputProps {
	label: string;
	banks: Bank[] | null;
	style?: object;
	error: string | undefined;
	touched: boolean | undefined;
	onSelect: (bank: Bank) => void;
	onFocus: () => void;
	onBlur: () => void;
	focusedIndex: boolean | undefined;
}

const SelectInput = (props: SelectInputProps) => {
	const {
		label,
		banks,
		onSelect,
		style,
		error,
		touched,
		onFocus,
		onBlur,
		focusedIndex
	} = props;
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredBanks, setFilteredBanks] = useState<Bank[] | null>(null);
	const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const colorScheme = useColorScheme();
	const { border, gray, orange } = Colors[colorScheme];

	banks && banks.sort((a, b) => a.name.localeCompare(b.name));

	const handleSelect = (bank: Bank) => {
		setSelectedBank(bank);
		onSelect(bank);
		setSearchQuery('');
		setIsFocused(false);
		setModalVisible(false);
	};

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={[
					styles.input,
					focusedIndex && { borderColor: orange },
					colorScheme === 'dark' && { color: '#fff' },
					style && style
				]}
				onPress={() => setModalVisible(true)}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				<Text
					style={[styles.selectedItemText, !selectedBank && { color: gray }]}
				>
					{selectedBank ? selectedBank.name : 'Select Bank'}
				</Text>

				<ArrowDropdown />
			</TouchableOpacity>
			{touched && error && <ErrorText errorMsg={error} />}

			<Modal visible={modalVisible} animationType="slide">
				<SafeAreaProvider>
					<SafeAreaView style={styles.modalContainer}>
						<TouchableOpacity onPress={() => setModalVisible(false)}>
							<Text style={[styles.closeButton, { color: orange }]}>Close</Text>
						</TouchableOpacity>

						<InputField
							label=""
							placeholder="Search"
							value={searchQuery}
							onChangeText={(query) => {
								setSearchQuery(query);
								const filtered = banks?.filter((bank) =>
									bank.name.toLowerCase().includes(query.toLowerCase())
								);

								filtered && setFilteredBanks(filtered);
							}}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							focusedIndex={isFocused}
						/>

						<ScrollView>
							{searchQuery.length > 0
								? filteredBanks?.map((bank) => (
										<TouchableOpacity
											key={bank.id}
											onPress={() => handleSelect(bank)}
											style={[styles.selectItem, { borderBottomColor: border }]}
										>
											<Text style={styles.selectItemText}>{bank.name}</Text>
										</TouchableOpacity>
								  ))
								: banks &&
								  banks.map((bank) => (
										<TouchableOpacity
											key={bank.id}
											onPress={() => handleSelect(bank)}
											style={[styles.selectItem, { borderBottomColor: border }]}
										>
											<Text style={styles.selectItemText}>{bank.name}</Text>
										</TouchableOpacity>
								  ))}
						</ScrollView>
					</SafeAreaView>
				</SafeAreaProvider>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 24
	},
	label: {
		marginBottom: 8,
		fontSize: 14,
		fontFamily: FONT_400
	},
	input: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#EDE0DC',
		borderRadius: 8,
		paddingVertical: 18,
		paddingHorizontal: 14
	},
	selectedItemText: {
		fontFamily: FONT_500
		// color: '#333'
	},
	modalContainer: {
		flex: 1,
		paddingHorizontal: 24
	},
	closeButton: {
		fontSize: 18,
		fontFamily: FONT_500,
		marginBottom: 20
	},
	selectItem: {
		paddingVertical: 16,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	selectItemText: {
		fontSize: 16,
		fontFamily: FONT_400
	}
});

export default SelectInput;
