import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteResumeFromDB } from '../../../store/resume/actions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { resumesSelector, setResume } from '../../../store/resume/reducer';

import { Tooltip } from '@mui/material';
import {
	AddCircleRounded,
	RemoveCircleRounded,
	CreateRounded,
	VisibilityRounded,
} from '@mui/icons-material';
import { ResumeCard } from '../../ui/cards/resumeCard';
import { Separator } from '../../ui/separator';
import { DialogConfirm } from '../../ui/dialogs/dialogConfirm';

import './dashboardStyles.scss';

export const Dashboard: React.FC = () => {
	const resumes = useAppSelector(resumesSelector);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [openDialog, setOpenDialog] = useState<boolean>(false);

	const resumeId = useRef<string | null>(null);
	const hasResumeIems = resumes !== null && resumes?.length > 0;

	const onDeleteResume = (): void => {
		if (resumeId.current === null) {
			return;
		}
		const id = resumeId.current;
		deleteResumeFromDB(id);
		setOpenDialog(false);
		resumeId.current = null;
	};

	const renderListResumes = (): React.ReactNode => {
		if (resumes === null) {
			return null;
		}

		return resumes.map((resume, index: number) => (
			<div key={index} className='dashboard-resumes-list--item'>
				<ResumeCard
					bottomLabel={resume.title}
					icons={[
						{
							key: 'delete',
							nodeElement: (
								<Tooltip
									title='Supprimer CV'
									onClick={(): void => {
										setOpenDialog(true);
										resumeId.current = resume._id;
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
									onClick={(): void => {
										navigate(`/resume/view/${resume._id}`, {
											state: { resumeId: resume._id },
										});
										dispatch(setResume(resume));
									}}>
									<VisibilityRounded className='action-icon' />
								</Tooltip>
							),
						},
						{
							key: 'edit',
							nodeElement: (
								<Tooltip
									title='Modifier CV'
									onClick={(): void => {
										navigate(`/resume/form/${resume._id}`, {
											state: { resumeId: resume._id },
										});
									}}>
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
			<DialogConfirm
				open={openDialog}
				onCancel={(): void => {
					setOpenDialog(false);
					resumeId.current = null;
				}}
				onConfirm={onDeleteResume}
				title='Suppression CV'
				text='Confirmez vous la suppression de votre cv ?'
			/>
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
				{hasResumeIems && <Separator spacing={40} />}

				<div className='dashboard-resumes-list'>{renderListResumes()}</div>
			</div>
		</>
	);
};
