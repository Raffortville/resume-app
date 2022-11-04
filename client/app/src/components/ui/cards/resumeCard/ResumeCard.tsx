import React from 'react';

import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import { BottomCard } from './bottomCard';

import './resumeCardStyles.scss';

interface CustomProps {
	bottomLabel: string;
	className?: string;
}

export const ResumeCard: React.FC<CustomProps> = ({
	className,
	bottomLabel,
}) => {
	return (
		<div className={`resume-card ${className}`}>
			<LibraryBooksTwoToneIcon className='resume-card-icon' />
			<BottomCard label={bottomLabel} />
		</div>
	);
};
