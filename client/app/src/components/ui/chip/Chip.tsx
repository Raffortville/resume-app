import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface CustomProps {
	id: string;
	label: string;
	onDeleteItem: (id: string) => void;
	styles?: React.CSSProperties;
	chipMuiProps?: ChipProps;
}

export const ChipUI: React.FC<CustomProps> = ({
	id,
	label,
	onDeleteItem,
	styles,
	chipMuiProps,
}) => {
	return (
		<Chip
			id={id}
			label={label}
			onDelete={() => onDeleteItem(id)}
			variant='outlined'
			color='primary'
			style={styles}
			{...chipMuiProps}
		/>
	);
};
