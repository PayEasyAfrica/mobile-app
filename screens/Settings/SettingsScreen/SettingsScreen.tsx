import React from 'react';
import {
	Platform,
	ScrollView,
	SectionList,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import {
	AgentIcon,
	LockIcon,
	LogoutIcon,
	NotificationIcon,
	PersonIcon,
	PresentIcon,
	VerificationIcon
} from '../../../components/CustomIcons';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './SettingsScreen.styles';

interface SettingsItem {
	name: string;
	icon: (color: string) => JSX.Element;
	verificationStatus: string;
}

const DATA = [
	{
		sectionName: 'Accounts',
		data: [
			{
				name: 'My Profile',
				icon: (color: string) => <PersonIcon color={color} />
			},
			{
				name: 'Notification',
				icon: (color: string) => <NotificationIcon color={color} />
			},
			{
				name: 'Account Verification',
				icon: (color: string) => <VerificationIcon color={color} />,
				verificationStatus: 'Verified'
			}
		] as SettingsItem[]
	},
	{
		sectionName: 'Security',
		data: [
			{
				name: 'Change Pin',
				icon: (color: string) => <LockIcon color={color} />
			}
		] as SettingsItem[]
	},
	{
		sectionName: 'Others',
		data: [
			{
				name: 'Referral',
				icon: (color: string) => <PresentIcon color={color} />
			},
			{
				name: 'PayEasy Stamps',
				icon: (color: string) => <VerificationIcon color={color} />
			},
			{
				name: 'Become an Agent',
				icon: (color: string) => <AgentIcon color={color} />
			}
		] as SettingsItem[]
	},
	{
		sectionName: '',
		data: [
			{
				name: 'FAQ'
			},
			{
				name: 'Privacy policy'
			},
			{
				name: 'Terms and Conditions'
			}
		] as SettingsItem[]
	},
	{
		sectionName: '',
		data: [
			{
				name: 'Log Out',
				icon: (color: string) => <LogoutIcon color={color} />
			}
		] as SettingsItem[]
	}
];

export default function SettingsScreen() {
	const colorScheme = useColorScheme();
	const {
		orange,
		lightBackground,
		darkBackground,
		text: textColor
	} = Colors[colorScheme];

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Settings</Text>

			<SectionList
				style={{ marginBottom: Platform.OS === 'ios' ? 8 : 16 }}
				sections={DATA}
				keyExtractor={(item, index) => item.name + index}
				renderItem={({ item, index, section }) => (
					<TouchableOpacity>
						<View
							style={[
								styles.settingsItem,
								index === section.data.length - 1 && styles.settingslastItem,
								{
									borderColor:
										colorScheme === 'light'
											? 'rgba(167, 58, 0, 0.05)'
											: 'rgba(255, 197, 168, 0.1)'
								},
								!section.sectionName && styles.settingsItemWithoutIcon
							]}
						>
							{item.icon &&
								item.icon(item.name === 'Become an Agent' ? orange : textColor)}
							<Text
								style={[
									styles.settingsItemText,
									!item.icon && styles.settingsItemTextWithoutIcon,
									item.name === 'Become an Agent' && { color: orange }
								]}
							>
								{item.name}
							</Text>

							{item.verificationStatus && (
								<Text
									style={[
										styles.settingsVerificationText,
										{ color: '#04D400' }
									]}
								>
									{item.verificationStatus}
								</Text>
							)}
						</View>
					</TouchableOpacity>
				)}
				renderSectionHeader={({ section: { sectionName } }) => (
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionName}>{sectionName}</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
