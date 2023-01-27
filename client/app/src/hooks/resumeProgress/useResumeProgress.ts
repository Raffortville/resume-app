import { useCallback, useEffect, useState } from 'react';
import { StepType } from '../../components/ui/stepper';
import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/user/reducer';
import {
	checkResumeDesignProgress,
	checkResumeExperiencesProgress,
	checkResumeExpertisesProgress,
	checkUserContactProgress,
	checResumeProfileProgress,
} from '../../utils/resume';
import { useResume } from '../resume/useResume';

const initialStepperItems: StepType[] = [
	{ label: 'Contact', isCompleted: true },
	{ label: 'Profile', isCompleted: false },
	{ label: 'Expertises', isCompleted: false },
	{ label: 'Expériences', isCompleted: false },
	{ label: 'Design', isCompleted: false },
];

interface IuseResumeProgressOutput {
	stepperItems: StepType[];
}

export const useResumeProgress = (): IuseResumeProgressOutput => {
	const [stepperItems, setStepperItems] =
		useState<StepType[]>(initialStepperItems);
	const {
		resume,
		resumeProfile,
		resumeExpertises,
		resumeExperiences,
		resumeDesign,
	} = useResume();
	const user = useAppSelector(userSelector);

	const setResumeProgress = useCallback(() => {
		if (!resume) {
			return;
		}
		setStepperItems(
			stepperItems.map((step) => {
				if (step.label === 'Contact') {
					return { ...step, isCompleted: checkUserContactProgress(user) };
				}
				if (step.label === 'Profile') {
					return {
						...step,
						isCompleted: checResumeProfileProgress(resumeProfile),
					};
				}
				if (step.label === 'Expertises') {
					return {
						...step,
						isCompleted: checkResumeExpertisesProgress(resumeExpertises),
					};
				}
				if (step.label === 'Expériences') {
					return {
						...step,
						isCompleted: checkResumeExperiencesProgress(resumeExperiences),
					};
				}
				if (step.label === 'Design') {
					return {
						...step,
						isCompleted: checkResumeDesignProgress(resumeDesign),
					};
				}
				return step;
			})
		);
	}, [resumeDesign, resumeExperiences, resumeExpertises, resumeProfile, user]);

	useEffect(() => {
		setResumeProgress();
	}, [resumeDesign, resumeExperiences, resumeExpertises, resumeProfile, user]);

	return { stepperItems };
};
