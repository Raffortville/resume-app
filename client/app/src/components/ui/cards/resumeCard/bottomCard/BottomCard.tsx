import React from 'react';

import './bottomCardStyles.scss';

interface CustomProps {
	label: string;
	className?: string;
}

export const BottomCard: React.FC<CustomProps> = ({ label, className }) => {
	return (
		<div className={`bottom-card ${className}`}>
			<p className='text'>{label}</p>
		</div>
	);
};
