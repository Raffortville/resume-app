import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { ObjectIdValue } from '../../../types/common';

interface CustomProps {
	chipData: ObjectIdValue;
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
			label={chipData.value}
			onDelete={() => onDeleteItem(chipData.id)}
			className={className}
			variant='outlined'
			color='primary'
			style={styles}
			{...chipMuiProps}
		/>
	);
};
