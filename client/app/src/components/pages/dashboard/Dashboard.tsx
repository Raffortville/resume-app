import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createResumeToDB } from '../../../store/resume/actions';
import { useAppSelector } from '../../../store/hooks';
import { userSelector } from '../../../store/user/reducer';
import { alertSelector } from '../../../store/alert/reducer';
import { resumesSelector } from '../../../store/resume/reducer';

import { Tooltip } from '@mui/material';
import {
	AddCircleRounded,
	RemoveCircleRounded,
	CreateRounded,
	VisibilityRounded,
} from '@mui/icons-material';
import { ResumeCard } from '../../ui/cards/resumeCard';
import { ToastAlert } from '../../ui/toastAlert';
import { Separator } from '../../ui/separator';

import './dashboardStyles.scss';

export const Dashboard: React.FC = () => {
	const user = useAppSelector(userSelector);
	const alert = useAppSelector(alertSelector);
	const resumes = useAppSelector(resumesSelector);
	const navigate = useNavigate();

	const onNavigateToResumeForm = (resumeId?: string): void => {
		resumeId && navigate(`/resume/form/${resumeId}`);
	};

	const onCreateNewResume = async (): Promise<void> => {
		if (user === null || !user._id) {
			return;
		}

		const createdResume = await createResumeToDB({ userId: user._id });
		createdResume && onNavigateToResumeForm(createdResume._id);
	};

	const onDeleteResume = (resumeId?: string): void => {
		if (!resumeId) {
			return;
		}
		console.log(resumeId, 'delete');
	};

	const onViewResume = (resumeId?: string) => {
		if (!resumeId) {
			return;
		}
		console.log(resumeId, 'view');
	};

	const renderListResumes = (): React.ReactNode => {
		if (resumes === null) {
			return null;
		}

		return resumes.map((resume, index: number) => (
			<div className='dashboard-resumes-list--item'>
				<ResumeCard
					key={index}
					bottomLabel={resume.profil?.position ?? `Votre CV ${index + 1}`}
					icons={[
						{
							key: 'delete',
							nodeElement: (
								<Tooltip
									title='Supprimer CV'
									onClick={(): void => onDeleteResume(resume._id)}>
									<RemoveCircleRounded className='action-icon' />
								</Tooltip>
							),
						},
						{
							key: 'view',
							nodeElement: (
								<Tooltip
									title='Voir CV'
									onClick={(): void => onViewResume(resume._id)}>
									<VisibilityRounded className='action-icon' />
								</Tooltip>
							),
						},
						{
							key: 'edit',
							nodeElement: (
								<Tooltip
									title='Modifier CV'
									onClick={(): void => onNavigateToResumeForm(resume._id)}>
									<CreateRounded className='action-icon' />
								</Tooltip>
							),
						},
					]}
					styles={{ pointerEvents: 'none' }}
				/>
			</div>
		));
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
					onClick={onCreateNewResume}
					icons={[
						{
							key: 'create',
							nodeElement: (
								<Tooltip title='Créer CV' onClick={onCreateNewResume}>
									<AddCircleRounded className='action-icon' />
								</Tooltip>
							),
						},
					]}
					styles={{ border: '1px dotted' }}
				/>
				<Separator spacing={40} />
				<div className='dashboard-resumes-list'>{renderListResumes()}</div>
			</div>
		</>
	);
};
