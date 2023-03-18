import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View as RNView } from 'react-native';
import { useAppDispatch } from '../../../app/hooks';
import { SelectImageIcon } from '../../../components/CustomIcons';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import { getSecureSaveValue } from '../../../components/utils/functions';
import { Http, baseURL } from '../../../components/utils/http';
import Colors from '../../../constants/Colors';
import { PASSCODE_VERIFICATION_DATA } from '../../../constants/Variables';
import { logout } from '../../../features/auth/authSlice';
import { finishLoading, startLoading } from '../../../features/loadingSlice';
import useColorScheme from '../../../hooks/useColorScheme';
import { iUserData } from '../../Home/HomeScreen/type';
import LoadingScreen from '../../LoadingScreen';
import styles from './ProfileScreen.styles';

export default function ProfileScreen() {
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();
	const [userData, setUserData] = useState({} as iUserData);
	const [loadingData, setLoadingData] = useState(true);

	const { border } = Colors[colorScheme];

	useEffect(() => {
		dispatch(startLoading());
		setLoadingData(true);
		const api = new Http({ baseURL });

		(async () => {
			const passcodeToken = await getSecureSaveValue(
				PASSCODE_VERIFICATION_DATA
			);

			const { token } = passcodeToken && JSON.parse(passcodeToken);

			api
				.get('/users/me', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					const apiResponse = res as { data: iUserData };
					// console.log(apiResponse.data);

					setUserData(apiResponse.data);
				})
				.catch((error) => {
					console.debug(error);
					const { status } = error?.response;

					if (status === 401) {
						dispatch(logout());
					}
				})
				.finally(() => {
					dispatch(finishLoading());
					setLoadingData(false);
				});
		})();
	}, []);

	if (loadingData) {
		return <LoadingScreen />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.centralize}>
				<View>
					<View style={styles.imgContainer}>
						<Image
							source={{ uri: userData.avatar }}
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
				<Text style={styles.text}>{userData.name}</Text>
			</View>

			<View style={[styles.textContainer, { borderColor: border }]}>
				<Text style={styles.label}>Phone Number</Text>
				<Text style={styles.text}>{userData.phoneNumber}</Text>
			</View>

			<View style={[styles.textContainer, { borderColor: border }]}>
				<Text style={styles.label}>Email Address</Text>
				<Text style={styles.text}>
					{userData.email ? userData.email : 'N/A'}
				</Text>
			</View>
		</SafeAreaView>
	);
}
