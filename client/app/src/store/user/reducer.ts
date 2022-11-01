import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import type { UserType } from '../types';

export const initialState: { user: UserType } = {
	user: null,
};

const userSlice = createSlice({
	name: 'USER',
	initialState: initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<UserType>) => {
			state.user = payload;
		},
		resetUser: (state, { payload }: PayloadAction<UserType>) => {
			state.user = payload;
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

export const userReducer = userSlice.reducer;
