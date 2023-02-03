import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import type { IBaseUser, UserType } from '../../types/store';

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
		resetUser: (state) => {
			state.user = null;
		},
		updateUser: (state, { payload }: PayloadAction<UserType>) => {
			if (payload) {
				state.user = { ...state.user, ...payload };
			}
		},
	},
});

export const { setUser, resetUser, updateUser } = userSlice.actions;

export const userSelector = (state: RootState): IBaseUser | null =>
	state.userReducer.user;

export const userReducer = userSlice.reducer;
