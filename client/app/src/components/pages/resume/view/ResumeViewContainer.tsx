import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useResume } from '../../../../hooks/resume';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { PDFResume } from './pdf/PDFResume';

import './resumeViewStyles.scss';

export const ResumeViewContainer: React.FC = () => {
	const { refetchResumeById, resume, resumeDesign } = useResume();
	const navigate = useNavigate();

	const getResume = async (): Promise<void> => {
		await refetchResumeById();
	};

	useEffect(() => {
		getResume();
	}, []);

	return (
		<div className='resumeView'>
			<IconButton
				onClick={(): void => {
					if (!resume) {
						return;
					}
					navigate(`/resume/form/${resume._id}`, {
						state: { resumeId: resume._id },
					});
				}}
				color='info'
				size='small'>
				<ArrowBackIcon />
				BACK TO FORM
			</IconButton>
			{resumeDesign && (
				<div className='resumeView-pdf'>
					<PDFResume mainColor={resumeDesign.colorMain.hex} />
				</div>
			)}
		</div>
	);
};
