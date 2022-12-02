import React from 'react';

import './boxStyles.scss';

interface CustomProps {
	children: React.ReactNode;
	className?: string;
	styles?: React.CSSProperties;
}

export const Box: React.FC<CustomProps> = ({ children, className, styles }) => {
	return (
		<div className={`box ${className}`} style={styles}>
			{children}
		</div>
	);
};
