import {
	getSecureSaveValue,
	secureSave
} from '../../components/utils/functions';
import { baseURL, Http } from '../../components/utils/http';
import {
	OTP_VERIFICATION_DATA,
	PASSCODE,
	PASSCODE_TOKEN,
	PASSCODE_VERIFICATION_DATA
} from '../../constants/Variables';

type ApiResponse = {
	message: string;
	data?: {
		token: string;
	};
};

export async function signinApi() {
	try {
		const data = await getSecureSaveValue(OTP_VERIFICATION_DATA);

		if (data) {
			return JSON.parse(data);
		}
	} catch (error: any) {
		console.debug('authAPI', error);
		throw new Error(error);
	}
}

export async function checkVerificationPromiseToken(token: string) {
	return new Promise<boolean>(async (resolve, reject) => {
		// Simulate an API call that takes 1 second to respond
		// setTimeout(() => {
		// If the token is "mock-token", return true, otherwise return false
		// if (token === (await getSecureSaveValue(PASSCODE_TOKEN))) {
		resolve(true);
		// } else {
		// resolve(false);
		// }
		// }, 1000);
	});
}
