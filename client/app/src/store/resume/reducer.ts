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
		deleteResume: (state, { payload }: PayloadAction<string>) => {
			if (state.resumes !== null) {
				state.resumes = state.resumes.filter(
					(resume) => resume._id !== payload
				);
			}
		},
		resetResumes: (state) => {
			state.resumes = null;
		},
		resetResume: (state) => {
			state.resume = null;
		},
	},
});

export const {
	setResume,
	setResumes,
	addResume,
	updateResume,
	deleteResume,
	resetResume,
	resetResumes,
} = resumeSlice.actions;

export const resumeReducer = resumeSlice.reducer;

export const resumeSelector = (state: RootState): IResume | null =>
	state.resumeReducer.resume;
export const resumesSelector = (state: RootState): IResume[] | null =>
	state.resumeReducer.resumes;
