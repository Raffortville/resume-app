import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import type { UserType } from '../types';

export const initialState: { user: UserType; isLogged: boolean } = {
	user: null,
	isLogged: false,
};

const userSlice = createSlice({
	name: 'USER',
	initialState: initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<UserType>) => {
			state.user = payload;
			state.isLogged = true;
		},
		resetUser: (state, { payload }: PayloadAction<UserType>) => {
			state.user = payload;
			state.isLogged = false;
		},
		updateUser: (state, { payload }: PayloadAction<UserType>) => {
			if (payload) {
				state.user = { ...state.user, ...payload };
			}
		},
	},
});

export const { setUser, resetUser, updateUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.userReducer.user;
export const isUserLoggedSelector = (state: RootState) =>
	state.userReducer.isLogged;

export const userReducer = userSlice.reducer;
