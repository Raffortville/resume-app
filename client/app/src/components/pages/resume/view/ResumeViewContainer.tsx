import { PDFResume } from './pdf/PDFResume';
import React, { useEffect, useState } from 'react';

import './resumeViewStyles.scss';
import { useResume } from '../../../../hooks/resume';
import { CircularProgress } from '@mui/material';

export const ResumeViewContainer: React.FC = () => {
	const { refetchResumeById } = useResume();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getResume = async (): Promise<void> => {
		setIsLoading(true);
		const resume = await refetchResumeById();
		if (resume) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getResume();
	}, []);

	if (isLoading) {
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
