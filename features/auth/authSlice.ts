import {
	createAsyncThunk,
	createSlice,
	Dispatch,
	PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, checkToken as apiCheckToken } from './authAPI';

export interface AuthState {
	token: string | null;
	error: string | null;
	loading: boolean;
}

const initialState: AuthState = {
	token: null,
	error: null,
	loading: false
};

export const checkTokenAsync = createAsyncThunk('auth/checkToken', async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		if (!token) {
			throw new Error('No token found');
		}
		await apiCheckToken(token);
		return token;
	} catch (err) {
		throw new Error('Token invalid or expired');
	}
});

type AuthAction =
	| ReturnType<typeof authStart>
	| ReturnType<typeof authSuccess>
	| ReturnType<typeof authFail>
	| ReturnType<typeof authLogout>;

export const login = (username: string, password: string) => {
	return async (dispatch: Dispatch<AuthAction>) => {
		dispatch(authStart());
		try {
			// Make API call to authenticate user
			const resData = await apiLogin(username, password);

			// Save token to AsyncStorage
			await AsyncStorage.setItem('token', JSON.stringify(resData.token));

			// Dispatch action to update Redux store with token
			dispatch(authSuccess(resData.token));
		} catch (err) {
			console.log(err);
			if (typeof err === 'string') {
				dispatch(authFail(err));
				throw new Error(err);
			} else if (err instanceof Error && typeof err.message === 'string') {
				dispatch(authFail(err.message));
				throw new Error(err.message);
			}
		}
	};
};

export const logout = () => {
	return async (dispatch: Dispatch<AuthAction>) => {
		// Remove token from AsyncStorage
		await AsyncStorage.removeItem('token');

		// Dispatch action to update Redux store with null token
		dispatch(authLogout());
	};
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authStart: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.loading = true;
			state.error = null;
		},
		authSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.token = action.payload;
			state.error = null;
		},
		authFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		authLogout: (state) => {
			state.token = null;
			state.loading = false;
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(checkTokenAsync.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(checkTokenAsync.fulfilled, (state, action) => {
			state.loading = false;
			state.token = action.payload;
			state.error = null;
		});
		builder.addCase(checkTokenAsync.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
			state.token = null;
		});
	}
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToken = (state: RootState) => state.auth.token;

export const { authStart, authSuccess, authFail, authLogout } =
	authSlice.actions;

export default authSlice.reducer;
