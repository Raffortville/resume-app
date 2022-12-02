import { AddCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { Box } from '../box/Box';

interface CustomProps {
	label: string;
	icon?: React.ReactNode;
	className?: string;
	styles?: {
		container?: React.CSSProperties;
		content?: React.CSSProperties;
	};
}

export const BoxLabelAction: React.FC<CustomProps> = ({
	label,
	icon,
	className,
	styles,
}) => {
	return (
		<Box className={className} styles={styles?.container}>
			<h3>{label}</h3>
			{icon && <IconButton>{icon}</IconButton>}
		</Box>
	);
};
