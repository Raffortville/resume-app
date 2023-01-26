import React, { useEffect } from 'react';

import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/user/reducer';
import { getResumes } from '../../store/resume/actions';
import { resumesSelector } from '../../store/resume/reducer';

import { Dashboard } from '../../components/pages/dashboard';
import { CircularProgressLoad } from '../../components/ui/progress/circular';

export const DashboardPage: React.FC = () => {
	const user = useAppSelector(userSelector);
	const resumes = useAppSelector(resumesSelector);

	const getResumesByUser = (): void => {
		if (user === null || !user._id) {
			return;
		}
		getResumes(user?._id);
	};

	useEffect(() => {
		if (resumes === null) {
			getResumesByUser();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resumes]);

	if (resumes === null) {
		return <CircularProgressLoad />;
	}

	return <Dashboard />;
};
