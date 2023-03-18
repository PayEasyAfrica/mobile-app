import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BarcodeData {
	amount: string;
	moneyTag: string;
}

interface BarcodeDataState {
	values: BarcodeData | null;
}

const initialState: BarcodeDataState = {
	values: null
};

const barcodeInfoSlice = createSlice({
	name: 'send',
	initialState,
	reducers: {
		setValues: (state, action: PayloadAction<BarcodeData>) => {
			state.values = action.payload;
		},
		clearValues: (state) => {
			state.values = null;
		}
	}
});

export const { setValues, clearValues } = barcodeInfoSlice.actions;

export default barcodeInfoSlice.reducer;
