import {
	createAsyncThunk,
	createSlice,
	Dispatch,
	PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
	OTP_VERIFICATION_DATA,
	PASSCODE,
	PASSCODE_TOKEN,
	PASSCODE_VERIFICATION_DATA
} from '../../constants/Variables';
import {
	deleteSecureSaveItem,
	getSecureSaveValue,
	secureSave
} from '../../components/utils/functions';
import { SigninAction, SigninState } from './type';
import { checkVerificationPromiseToken, signinApi } from './signinAPI';

const initialState: SigninState = {
	token: null,
	error: null,
	loading: false
};

export const checkVerificationTokenAsync = createAsyncThunk(
	'signin/checkVerificationToken',
	async () => {
		try {
			const userData = await getSecureSaveValue(OTP_VERIFICATION_DATA);
			const { token } = userData && JSON.parse(userData);
			if (!token) {
				throw new Error('No token found');
			}

			return token;
		} catch (err) {
			throw new Error('Token invalid or expired');
		}
	}
);

export const verificationLogin = () => {
	return async (dispatch: Dispatch<SigninAction>) => {
		dispatch(signinStart());
		try {
			// Make API call to authenticate user
			const resData = await signinApi();

			if (resData) {
				// Dispatch action to update Redux store with token
				setTimeout(() => {
					dispatch(signinSuccess(resData.token));
				}, 3000);
			}
		} catch (err) {
			console.debug(err);
			if (typeof err === 'string') {
				dispatch(signinFail(err));
				throw new Error(err);
			} else if (err instanceof Error && typeof err.message === 'string') {
				dispatch(signinFail(err.message));
				throw new Error(err.message);
			}
		}
	};
};

export const verificationLogout = () => {
	return async (dispatch: Dispatch<SigninAction>) => {
		// Remove token from AsyncStorage
		deleteSecureSaveItem(PASSCODE_VERIFICATION_DATA);
		deleteSecureSaveItem(OTP_VERIFICATION_DATA);
		deleteSecureSaveItem(PASSCODE_TOKEN);
		deleteSecureSaveItem(PASSCODE);

		// Dispatch action to update Redux store with null token
		dispatch(signinLogout());
	};
};

export const signinSlice = createSlice({
	name: 'signin',
	initialState,
	reducers: {
		signinStart: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.loading = true;
			state.error = null;
		},
		signinSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.token = action.payload;
			state.error = null;
		},
		signinFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		signinLogout: (state) => {
			state.loading = false;
			state.token = null;
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(checkVerificationTokenAsync.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(checkVerificationTokenAsync.fulfilled, (state, action) => {
			state.loading = false;
			state.token = action.payload;
			state.error = null;
		});
		builder.addCase(checkVerificationTokenAsync.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
			state.token = null;
		});
	}
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const signinToken = (state: RootState) => state.signin.token;

export const { signinStart, signinSuccess, signinFail, signinLogout } =
	signinSlice.actions;

export default signinSlice.reducer;
