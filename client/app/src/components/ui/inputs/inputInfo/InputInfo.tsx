import React from 'react';

import { TextField, InputAdornment, IconButton } from '@mui/material';

interface CustomProps {
	value: string;
	label: string;
	icon?: React.ReactNode;
	onIconClick?: () => void;
}

export const InputInfo: React.FC<CustomProps> = ({
	value,
	label,
	icon,
	onIconClick,
}) => {
	return (
		<TextField
			aria-readonly
			value={value}
			label={label}
			InputProps={
				icon
					? {
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={onIconClick}>{icon}</IconButton>
								</InputAdornment>
							),
					  }
					: undefined
			}
		/>
	);
};
