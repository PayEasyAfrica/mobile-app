import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import barcodeReducer from '../features/barcodeSlice';
import loadingReducer from '../features/loadingSlice';
import signinReducer from '../features/signin/signinSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		loading: loadingReducer,
		signin: signinReducer,
		barcode: barcodeReducer
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
