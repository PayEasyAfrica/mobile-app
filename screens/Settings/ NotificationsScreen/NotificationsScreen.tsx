import React, { useState } from 'react';
import {
	SectionList,
	Switch,
	TouchableOpacity,
	View as RNView
} from 'react-native';
import { MailIcon, PersonIcon } from '../../../components/CustomIcons';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './NotificationsScreen.styles';

interface NotificationsItem {
	name: string;
	slug: string;
	icon: (color: string) => JSX.Element;
}

interface NotificationStates {
	[key: string]: boolean;
}

const DATA = [
	{
		sectionName: 'Login Alerts',
		data: [
			{
				name: 'SMS',
				slug: 'login_sms',
				icon: (color: string) => <PersonIcon color={color} />
			}
		] as NotificationsItem[]
	},
	{
		sectionName: 'Transaction Alerts',
		data: [
			{
				name: 'Email',
				slug: 'transaction_email',
				icon: (color: string) => <MailIcon color={color} />
			},
			{
				name: 'SMS',
				slug: 'transaction_sms',
				icon: (color: string) => <PersonIcon color={color} />
			}
		] as NotificationsItem[]
	}
];

export default function NotificationsScreen() {
	const [notificationStates, setNotificationStates] =
		useState<NotificationStates>({});

	const colorScheme = useColorScheme();
	const {
		border,
		text: textColor,
		lightBackground,
		darkBackground,
		orange
	} = Colors[colorScheme];

	const toggleSwitch = (name: string) => {
		setNotificationStates((prevState) => ({
			...prevState,
			[name]: !prevState[name]
		}));
	};

	return (
		<SafeAreaView style={styles.container}>
			<SectionList
				sections={DATA}
				keyExtractor={(item, index) => item.name + index}
				renderItem={({ item, index, section }) => (
					<View
						style={[
							styles.NotificationsItem,
							index === section.data.length - 1 && styles.NotificationslastItem,
							{
								borderColor: border
							}
						]}
					>
						{item.icon(textColor)}
						<Text style={[styles.NotificationsItemText]}>{item.name}</Text>

						<RNView style={{ marginLeft: 'auto' }}>
							<Switch
								trackColor={{ false: '#D0C4C0', true: '#EF672A' }}
								thumbColor={
									notificationStates[item.slug] ? '#FFFFFF' : '#FBEEEA'
								}
								ios_backgroundColor="#D0C4C0"
								onValueChange={() => toggleSwitch(item.slug)}
								value={notificationStates[item.slug]}
							/>
						</RNView>
					</View>
				)}
				renderSectionHeader={({ section: { sectionName } }) => (
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionName}>{sectionName}</Text>
					</View>
				)}
				ListFooterComponent={
					<TouchableOpacity onPress={() => {}} style={{ marginTop: 52 }}>
						<View style={[styles.button, { backgroundColor: orange }]}>
							<Text style={styles.buttonText} lightColor={lightBackground}>
								Continue
							</Text>
						</View>
					</TouchableOpacity>
				}
			/>
		</SafeAreaView>
	);
}
