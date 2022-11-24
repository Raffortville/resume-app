import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createResumeToDB } from '../../../store/resume/actions';
import { useAppSelector } from '../../../store/hooks';
import { userSelector } from '../../../store/user/reducer';
import { alertSelector } from '../../../store/alert/reducer';

import { Tooltip } from '@mui/material';
import { AddCircleRounded } from '@mui/icons-material';
import { ResumeCard } from '../../ui/cards/resumeCard';
import { ToastAlert } from '../../ui/toastAlert';

import './dashboardStyles.scss';

export const Dashboard: React.FC = () => {
	const user = useAppSelector(userSelector);
	const alert = useAppSelector(alertSelector);
	const navigate = useNavigate();

	const onNavigateToResumeForm = async (): Promise<void> => {
		if (user === null || !user._id) {
			return;
		}

		const createdResume = await createResumeToDB({ userId: user._id });
		if (createdResume) {
			navigate(`/resume_form/create/${createdResume._id}`);
		}
	};

	return (
		<>
			{alert !== null && (
				<ToastAlert
					isOpen={alert !== null}
					message={alert?.message ?? ''}
					severity={alert?.type ?? 'info'}
				/>
			)}
			<div className='dashboard'>
				<ResumeCard
					bottomLabel='creér cv'
					onClick={onNavigateToResumeForm}
					icons={[
						{
							key: 'create',
							nodeElement: (
								<Tooltip title='Créer CV' onClick={onNavigateToResumeForm}>
									<AddCircleRounded className='action-icon' />
								</Tooltip>
							),
						},
					]}
				/>
			</div>
		</>
	);
};
