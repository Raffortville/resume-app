import { CircularProgress, CircularProgressProps } from '@mui/material';
import React from 'react';

export const CircularProgressLoad: React.FC<CircularProgressProps> = ({
	...props
}) => {
	return (
		<CircularProgress
			color='primary'
			size={72}
			style={{
				position: 'absolute',
				right: '50%',
				top: '50%',
			}}
			{...props}
		/>
	);
};
