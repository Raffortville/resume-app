import React from 'react';

import { LibraryBooksTwoTone } from '@mui/icons-material';
import { IKeyNodeItem } from '../../../../types';
import { BottomCard } from './bottomCard';

import './resumeCardStyles.scss';

interface CustomProps {
	bottomLabel: string;
	onClick?: () => void;
	icons?: IKeyNodeItem[];
	className?: string;
}

export const ResumeCard: React.FC<CustomProps> = ({
	bottomLabel,
	onClick,
	icons,
	className,
}) => {
	const renderIconsElement = (): React.ReactNode => {
		return icons?.map((icon) => <div key={icon.key}>{icon.nodeElement}</div>);
	};

	return (
		<div className={`resume-card ${className}`} onClick={onClick}>
			{icons && (
				<div className='resume-card-action-icons'>{renderIconsElement()}</div>
			)}
			<LibraryBooksTwoTone className='resume-card-icon' />
			<BottomCard label={bottomLabel} />
		</div>
	);
};
