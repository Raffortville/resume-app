import React from 'react';

import { ResumeCard } from '../../ui/cards/resumeCard';

import './dashboardStyles.scss';

export const Dashboard: React.FC = () => {
	return (
		<div className='dashboard'>
			<ResumeCard bottomLabel='creér cv' />
		</div>
	);
};
