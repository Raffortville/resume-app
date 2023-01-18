import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { getResumeById } from '../../store/resume/actions';
import {
	resumeDesignSelector,
	resumeExperiencesSelector,
	resumeExpertisesSelector,
	resumeProfileSelector,
	resumeSelector,
} from '../../store/resume/reducer';
import { IResume } from '../../types/store';
import { sortExperiencesByDate } from '../../utils/resume';

export const useResume = (): {
	resume: IResume | null;
	resumeProfile: IResume['profil'];
	resumeExpertises: IResume['expertises'] | undefined;
	resumeExperiences: IResume['experiences'];
	resumeDesign: IResume['design'];
	refetchResumeById: () => Promise<IResume | undefined>;
} => {
	const resume = useAppSelector(resumeSelector);
	const resumeProfile = useAppSelector(resumeProfileSelector);
	const resumeExpertises = useAppSelector(resumeExpertisesSelector);
	const resumeExperiences = useAppSelector(resumeExperiencesSelector);
	const resumeDesign = useAppSelector(resumeDesignSelector);

	const location = useLocation();
	const { resumeId } = location.state;

	useEffect(() => {
		if (resume !== null || !location.state?.resumeId) {
			return;
		}

		getResumeById(resumeId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resume]);

	const refetchResumeById = async (): Promise<IResume | undefined> => {
		const resume = await getResumeById(resumeId);
		return resume;
	};

	return {
		resume,
		resumeProfile,
		resumeExpertises,
		resumeExperiences: sortExperiencesByDate(resumeExperiences),
		resumeDesign,
		refetchResumeById,
	};
};
