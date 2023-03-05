import React from 'react';
import {
	Image,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View as RNView
} from 'react-native';
import { SelectImageIcon } from '../../../components/CustomIcons';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './ProfileScreen.styles';

export default function ProfileScreen() {
	const colorScheme = useColorScheme();
	const { border } = Colors[colorScheme];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.centralize}>
				<View>
					<View style={styles.imgContainer}>
						<Image
							source={require('../../../assets/images/profile-img.jpg')}
							style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
						/>
					</View>

					<TouchableOpacity>
						<RNView style={{ position: 'absolute', bottom: 0, right: 0 }}>
							<SelectImageIcon />
						</RNView>
					</TouchableOpacity>
				</View>
			</View>

			<View style={[styles.textContainer, { borderColor: border }]}>
				<Text style={styles.label}>Full Name</Text>
				<Text style={styles.text}>Blessing Mark</Text>
			</View>

			<View style={[styles.textContainer, { borderColor: border }]}>
				<Text style={styles.label}>Phone Number</Text>
				<Text style={styles.text}>+2348034344423</Text>
			</View>

			<View style={[styles.textContainer, { borderColor: border }]}>
				<Text style={styles.label}>Email Address</Text>
				<Text style={styles.text}>Blessing Mark</Text>
			</View>
		</SafeAreaView>
	);
}
