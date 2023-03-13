import {
	signinFail,
	signinLogout,
	signinStart,
	signinSuccess
} from './signinSlice';

export interface SigninState {
	token: string | null;
	error: string | null;
	loading: boolean;
}

export type SigninAction =
	| ReturnType<typeof signinStart>
	| ReturnType<typeof signinSuccess>
	| ReturnType<typeof signinFail>
	| ReturnType<typeof signinLogout>;
