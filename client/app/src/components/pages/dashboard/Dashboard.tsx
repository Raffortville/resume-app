import React from 'react';

import { ResumeCard } from '../../ui/cards/resumeCard';
import { AddCircleRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import './dashboardStyles.scss';
import { Tooltip } from '@mui/material';

export const Dashboard: React.FC = () => {
	const navigate = useNavigate();

	const onNavigateToCreatePage = (): void => {
		navigate('/create/contact');
	};
	return (
		<div className='dashboard'>
			<ResumeCard
				bottomLabel='creér cv'
				onClick={onNavigateToCreatePage}
				icons={[
					{
						key: 'create',
						node: (
							<Tooltip title='Créer CV' onClick={onNavigateToCreatePage}>
								<AddCircleRounded className='action-icon' />
							</Tooltip>
						),
					},
				]}
			/>
		</div>
	);
};
