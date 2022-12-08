import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { getResumeById } from '../../store/resume/actions';
import {
	resumeExperiencesSelector,
	resumeProfileSelector,
	resumeSelector,
} from '../../store/resume/reducer';
import { IResume } from '../../types/store';

export const useResume = (): {
	resume: IResume | null;
	resumeProfile: IResume['profil'];
	resumeExperiences: IResume['experiences'];
} => {
	const resume = useAppSelector(resumeSelector);
	const resumeProfile = useAppSelector(resumeProfileSelector);
	const resumeExperiences = useAppSelector(resumeExperiencesSelector);

	const location = useLocation();

	useEffect(() => {
		if (resume !== null || !location.state?.resumeId) {
			return;
		}
		const { resumeId } = location.state;
		getResumeById(resumeId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resume]);

	return {
		resume,
		resumeProfile,
		resumeExperiences,
	};
};
