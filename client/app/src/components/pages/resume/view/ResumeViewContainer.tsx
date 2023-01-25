import { PDFResume } from './pdf/PDFResume';
import React, { useEffect, useState } from 'react';

import './resumeViewStyles.scss';
import { useResume } from '../../../../hooks/resume';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ResumeViewContainer: React.FC = () => {
	const { refetchResumeById, resume } = useResume();
	const navigate = useNavigate();
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

	if (isLoading || !resume) {
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
			<IconButton
				onClick={(): void => {
					navigate(`/resume/form/${resume._id}`, {
						state: { resumeId: resume._id },
					});
				}}
				color='primary'
				size='small'>
				<ArrowBackIcon />
				BACK TO FORM
			</IconButton>
			<div className='resumeView-pdf'>
				<PDFResume />
			</div>
		</div>
	);
};
