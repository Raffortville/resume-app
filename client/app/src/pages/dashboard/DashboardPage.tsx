import React, { useEffect } from 'react';

import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/user/reducer';
import { getResumes } from '../../store/resume/actions';
import { resumesSelector } from '../../store/resume/reducer';

import { CircularProgress } from '@mui/material';
import { Dashboard } from '../../components/pages/dashboard';
import { ToastAlert } from '../../components/ui/toastAlert';
import { alertSelector } from '../../store/alert/reducer';

export const DashboardPage: React.FC = () => {
	const user = useAppSelector(userSelector);
	const resumes = useAppSelector(resumesSelector);
	const alert = useAppSelector(alertSelector);

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
		return (
			<CircularProgress
				color='primary'
				size={72}
				style={{
					position: 'absolute',
					right: '50%',
					top: '50%',
				}}
			/>
		);
	}

	return (
		<>
			{alert !== null && (
				<ToastAlert
					isOpen={alert !== null}
					message={alert?.message ?? ''}
					severity={alert?.type ?? 'info'}
				/>
			)}
			<Dashboard />
		</>
	);
};
