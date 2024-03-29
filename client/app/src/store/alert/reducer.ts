import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { AlertType, IAlert } from '../../types/store';

export const initialState: { alert: AlertType } = { alert: null };

const alertSlice = createSlice({
	name: 'ALERT',
	initialState: initialState,
	reducers: {
		setAlert: (state, { payload }: PayloadAction<IAlert>) => {
			state.alert = payload;
		},
		resetAlert: (state) => {
			state.alert = null;
		},
	},
});

export const { setAlert, resetAlert } = alertSlice.actions;

export const alertSelector = (state: RootState) => state.alertReducer.alert;
export const alertReducer = alertSlice.reducer;
