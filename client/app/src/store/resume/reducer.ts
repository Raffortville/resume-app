import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import type { IResume } from '../types';

export const initialState: {
	resumes: IResume[] | null;
	resume: IResume | null;
} = {
	resumes: null,
	resume: null,
};

const resumeSlice = createSlice({
	name: 'RESUME',
	initialState: initialState,
	reducers: {
		setResumes: (state, { payload }: PayloadAction<IResume[]>) => {
			state.resumes = payload;
		},
		setResume: (state, { payload }: PayloadAction<IResume>) => {
			state.resume = payload;
		},
		updateResume: (state, { payload }: PayloadAction<IResume>) => {
			state.resume = { ...state.resume, ...payload };
		},
		addResume: (state, { payload }: PayloadAction<IResume>) => {
			if (state.resumes !== null) {
				state.resumes = [...state.resumes, payload];
			}
		},
	},
});

// const userSlice = createSlice({
// 	name: 'USER',
// 	initialState: initialState,
// 	reducers: {
// 		setUser: (state, { payload }: PayloadAction<UserType>) => {
// 			state.user = payload;
// 		},
// 		resetUser: (state, { payload }: PayloadAction<UserType>) => {
// 			state.user = payload;
// 		},
// 		updateUser: (state, { payload }: PayloadAction<UserType>) => {
// 			if (payload) {
// 				state.user = { ...state.user, ...payload };
// 			}
// 		},
// 	},
// });

// export const { setUser, resetUser, updateUser } = userSlice.actions;

// export const userSelector = (state: RootState) => state.userReducer.user;

// export const userReducer = userSlice.reducer;
