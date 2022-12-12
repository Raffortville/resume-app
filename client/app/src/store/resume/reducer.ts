import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import type { ExpertiseKeyType, IResume } from '../../types/store';

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
		addResume: (state, { payload }: PayloadAction<IResume>) => {
			if (state.resumes !== null) {
				state.resumes = [...state.resumes, payload];
			}
		},
		addExpertiseToResume: (
			state,
			{
				payload,
			}: PayloadAction<{
				expertiseKey: ExpertiseKeyType;
				skill: {
					id: string;
					value: string;
				};
			}>
		) => {
			if (state.resume === null) {
				return;
			}
			state.resume = {
				...state.resume,
				expertises: [...state.resume.expertises].map((expertise) => {
					if (expertise.key === payload.expertiseKey) {
						return { ...expertise, items: [...expertise.items, payload.skill] };
					}
					return expertise;
				}),
			};
		},
		deleteExpertiseFromResume: (
			state,
			{
				payload,
			}: PayloadAction<{ expertiseKey: ExpertiseKeyType; skillId: string }>
		) => {
			if (state.resume === null) {
				return;
			}
			state.resume = {
				...state.resume,
				expertises: [...state.resume.expertises].map((expertise) => {
					if (expertise.key === payload.expertiseKey) {
						return {
							...expertise,
							items: [...expertise.items].filter(
								(item) => item.id !== payload.skillId
							),
						};
					}
					return expertise;
				}),
			};
		},
		addAchievementOrStackToResumeExperience: (
			state,
			{
				payload,
			}: PayloadAction<{
				categoryKey: 'achievements' | 'stack';
				experienceId: string;
				objectValue: { id: string; value: string };
			}>
		) => {
			if (state.resume === null || !state.resume.experiences?.length) {
				return;
			}
			state.resume = {
				...state.resume,
				experiences: state.resume.experiences.map((experience) => {
					if (payload.experienceId === experience.exp_id) {
						return {
							...experience,
							[payload.categoryKey]: {
								...experience[payload.categoryKey],
								items: [
									...experience[payload.categoryKey].items,
									payload.objectValue,
								],
							},
						};
					}
					return experience;
				}),
			};
		},
		deleteAchievementOrStackFromResumeExperience: (
			state,
			{
				payload,
			}: PayloadAction<{
				categoryKey: 'achievements' | 'stack';
				experienceId: string;
				itemId: string;
			}>
		) => {
			if (!state.resume || !state.resume.experiences?.length) {
				return;
			}
			state.resume = {
				...state.resume,
				experiences: state.resume.experiences.map((experience) => {
					if (experience.exp_id === payload.experienceId) {
						return {
							...experience,
							[payload.categoryKey]: {
								...[payload.categoryKey],
								items: experience[payload.categoryKey].items.filter(
									(item) => item.id !== payload.itemId
								),
							},
						};
					}
					return experience;
				}),
			};
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
	addExpertiseToResume,
	deleteExpertiseFromResume,
	addAchievementOrStackToResumeExperience,
	deleteAchievementOrStackFromResumeExperience,
	deleteResume,
	resetResume,
	resetResumes,
} = resumeSlice.actions;

export const resumeReducer = resumeSlice.reducer;

export const resumeSelector = (state: RootState): IResume | null =>
	state.resumeReducer.resume;

export const resumeProfileSelector = (state: RootState): IResume['profil'] =>
	state.resumeReducer.resume?.profil;

export const resumeExpertisesSelector = (
	state: RootState
): IResume['expertises'] | undefined => state.resumeReducer.resume?.expertises;

export const resumeExperiencesSelector = (
	state: RootState
): IResume['experiences'] => state.resumeReducer.resume?.experiences;

export const resumeDesignSelector = (state: RootState): IResume['design'] =>
	state.resumeReducer.resume?.design;

export const resumesSelector = (state: RootState): IResume[] | null =>
	state.resumeReducer.resumes;
