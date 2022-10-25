import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RootState, store } from '..';
import { fireBaseAuth } from '../../services';
import type { IUser, UserType } from '../types';

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

export const signUp = async (payload: {
	email: string;
	password: string;
}): Promise<any> => {
	const { email, password } = payload;
	try {
		const user = await createUserWithEmailAndPassword(
			fireBaseAuth,
			email,
			password
		);
		setUser({ email: 'tete', password: 'tetete' });
		return user;
	} catch (err) {
		return err;
	}
};

export const userSelector = (state: RootState) => state.userReducer.user;

export const userReducer = userSlice.reducer;
