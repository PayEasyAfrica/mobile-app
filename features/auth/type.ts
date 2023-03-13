import { authFail, authLogout, authStart, authSuccess } from './authSlice';

export interface AuthState {
	token: string | null;
	error: string | null;
	loading: boolean;
}

export type AuthAction =
	| ReturnType<typeof authStart>
	| ReturnType<typeof authSuccess>
	| ReturnType<typeof authFail>
	| ReturnType<typeof authLogout>;
