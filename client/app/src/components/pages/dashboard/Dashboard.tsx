import React from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteResumeFromDB } from '../../../store/resume/actions';
import { useAppSelector } from '../../../store/hooks';
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
	const alert = useAppSelector(alertSelector);
	const resumes = useAppSelector(resumesSelector);
	const navigate = useNavigate();

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
			<div key={index} className='dashboard-resumes-list--item'>
				<ResumeCard
					bottomLabel={resume.profil?.position ?? `Votre CV ${index + 1}`}
					icons={[
						{
							key: 'delete',
							nodeElement: (
								<Tooltip
									title='Supprimer CV'
									onClick={(): void => {
										resume._id && deleteResumeFromDB(resume._id);
									}}>
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
									onClick={(): void => navigate(`/resume/form/${resume._id}`)}>
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
					onClick={(): void => navigate('/resume/create')}
					icons={[
						{
							key: 'create',
							nodeElement: (
								<Tooltip
									title='Créer CV'
									onClick={(): void => navigate('/resume/create')}>
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
