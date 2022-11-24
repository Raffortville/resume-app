import React from 'react';

import './separatorStyles.scss';

interface CustomProps {
	className?: string;
	size?: number;
	color?: string;
	spacing?: number;
}

export const Separator: React.FC<CustomProps> = ({
	className,
	size,
	color,
	spacing,
}) => {
	return (
		<div
			className={`separator ${className}`}
			style={{
				height: size,
				backgroundColor: color,
				marginTop: spacing,
				marginBottom: spacing,
			}}
		/>
	);
};
