import React, { useEffect, useRef, useState } from 'react';
import {
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import InputField from '../../../components/InputField';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { HomeStackScreenProps } from '../../../types';
import styles from './AddMoneyScreen.styles';

const validationSchema = Yup.object().shape({
	amount: Yup.string().required('This is required.')
});

const AddMoneyScreen: React.FC<HomeStackScreenProps<'AddMoney'>> = ({
	navigation
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const colorScheme = useColorScheme();

	const { orange, lightBackground, darkBackground, iconBackground } =
		Colors[colorScheme];

	const handlePressOutside = () => {
		setIsFocused(false);
	};

	const handleContinue = (values: { amount: string }) => {
		console.log(values);
	};

	return (
		<TouchableWithoutFeedback onPress={handlePressOutside}>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Formik
						initialValues={{
							amount: ''
						}}
						validationSchema={validationSchema}
						onSubmit={(values) => handleContinue(values)}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
							touched
						}) => (
							<>
								<InputField
									label="Enter amount"
									placeholder="000,000.00"
									value={values.amount}
									keyboardType="phone-pad"
									error={errors.amount}
									touched={touched.amount}
									onChangeText={handleChange('amount')}
									onFocus={() => setIsFocused(true)}
									onBlur={() => handleBlur('amount')}
									focusedIndex={isFocused}
								/>

								<TouchableOpacity
									style={[styles.button, { backgroundColor: orange }]}
									onPress={() => handleSubmit()}
								>
									<Text style={styles.buttonText} lightColor={lightBackground}>
										Continue
									</Text>
								</TouchableOpacity>
							</>
						)}
					</Formik>

					<View style={{ paddingBottom: 40 }} />
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AddMoneyScreen;
