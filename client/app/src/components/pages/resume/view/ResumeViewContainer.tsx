import { PDFResume } from './pdf/PDFResume';
import React from 'react';

import './resumeViewStyles.scss';

export const ResumeViewContainer: React.FC = () => {
	return (
		<div className='resumeView'>
			<PDFResume />
		</div>
	);
};
