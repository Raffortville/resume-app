import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { getResumeById } from '../../store/resume/actions';
import { resumeSelector } from '../../store/resume/reducer';

export const useResume = () => {
	const resume = useAppSelector(resumeSelector);
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
	};
};
