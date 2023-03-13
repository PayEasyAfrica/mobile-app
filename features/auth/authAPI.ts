import {
	getSecureSaveValue,
	secureSave
} from '../../components/utils/functions';
import { baseURL, Http } from '../../components/utils/http';
import {
	OTP_VERIFICATION_DATA,
	PASSCODE_TOKEN,
	PASSCODE_VERIFICATION_DATA
} from '../../constants/Variables';

type ApiResponse = {
	message: string;
	data?: {
		token: string;
	};
};

export async function login(passcode: string) {
	const api = new Http({ baseURL });

	try {
		const userData = await getSecureSaveValue(OTP_VERIFICATION_DATA);

		if (userData) {
			const { token } = JSON.parse(userData);

			const response: ApiResponse = await api.post('/auth/login', {
				passcode,
				token
			});

			const { message, data } = response;

			console.log('authAPI: ', data, message);
			if (data) {
				secureSave(PASSCODE_VERIFICATION_DATA, JSON.stringify(data));
				return data;
			}
		}
	} catch (error: any) {
		console.debug('authAPI', error);
		throw new Error(error);
	}
}

export async function checkToken(token: string) {
	return new Promise<boolean>(async (resolve, reject) => {
		// Simulate an API call that takes 1 second to respond
		// setTimeout(() => {
		// If the token is "mock-token", return true, otherwise return false
		if (token === (await getSecureSaveValue(PASSCODE_TOKEN))) {
			resolve(true);
		} else {
			resolve(false);
		}
		// }, 1000);
	});
}
