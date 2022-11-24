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
	styles?: React.CSSProperties;
}

export const ResumeCard: React.FC<CustomProps> = ({
	bottomLabel,
	onClick,
	icons,
	className,
	styles,
}) => {
	const renderIconsElement = (): React.ReactNode => {
		return icons?.map((icon) => <div key={icon.key}>{icon.nodeElement}</div>);
	};

	return (
		<>
			{icons && (
				<div className='resume-card-action-icons'>{renderIconsElement()}</div>
			)}
			<div
				className={`resume-card ${className}`}
				style={styles}
				onClick={onClick}>
				<LibraryBooksTwoTone className='resume-card-icon' />
				<BottomCard label={bottomLabel} />
			</div>
		</>
	);
};
