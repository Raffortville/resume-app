import { PDFResume } from './pdf/PDFResume';
import React from 'react';

import './resumeViewStyles.scss';
import { useResume } from '../../../../hooks/resume';
import { CircularProgress } from '@mui/material';

export const ResumeViewContainer: React.FC = () => {
	const { resume } = useResume();

	if (!resume) {
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
		<div className='resumeView'>
			<PDFResume />
		</div>
	);
};
