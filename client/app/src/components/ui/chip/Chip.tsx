import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { ObjectIdLabel } from '../../../types/common';

interface CustomProps {
	chipData: ObjectIdLabel;
	onDeleteItem: (id: string) => void;
	className?: string;
	styles?: React.CSSProperties;
	chipMuiProps?: ChipProps;
}

export const ChipUI: React.FC<CustomProps> = ({
	chipData,
	onDeleteItem,
	className,
	styles,
	chipMuiProps,
}) => {
	return (
		<Chip
			id={chipData.id}
			label={chipData.label}
			onDelete={() => onDeleteItem(chipData.id)}
			className={className}
			variant='outlined'
			color='primary'
			style={styles}
			{...chipMuiProps}
		/>
	);
};
