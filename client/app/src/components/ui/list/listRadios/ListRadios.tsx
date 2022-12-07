import React, { useState } from 'react';

import { ObjectIdValue, ObjectKeyListItems } from '../../../../types/common';
import { IconButton, Radio } from '@mui/material';
import { Cancel } from '@mui/icons-material';

import './listRadiosStyles.scss';

interface CustomProps {
	radios: ObjectKeyListItems[];
	onSelectRadio: (id: string) => void;
	onDeleteRadio: ({
		radioKey,
		itemId,
	}: {
		radioKey: string;
		itemId: string;
	}) => void;
	className?: string;
}

export const ListRadios: React.FC<CustomProps> = ({
	radios,
	onSelectRadio,
	onDeleteRadio,
	className,
}) => {
	const [selectedRadio, setSelectedRadio] = useState<string>();

	const rendeRadiosItem = ({
		radioItems,
		radioKey,
	}: {
		radioItems: ObjectIdValue[];
		radioKey: string;
	}) => {
		return radioItems.map((item) => {
			return (
				<li key={item.id} className='listRadios-items--item'>
					<div className='listRadios-radio'>
						<Radio
							size='small'
							value={item.id}
							checked={selectedRadio === item.id}
							onChange={(): void => {
								setSelectedRadio(item.id);
								onSelectRadio(item.id);
							}}
							style={{ padding: 'unset' }}
						/>
						<p>{item.value}</p>
					</div>
					<IconButton
						onClick={(): void => onDeleteRadio({ radioKey, itemId: item.id })}>
						<Cancel fontSize='small' color='primary' />
					</IconButton>
				</li>
			);
		});
	};

	return (
		<ul className={className}>
			{radios.map((radio) => (
				<li key={radio.key} className='listRadios'>
					<h3>{radio.title}</h3>
					<ul className='listRadios-items'>
						{rendeRadiosItem({ radioItems: radio.items, radioKey: radio.key })}
					</ul>
				</li>
			))}
		</ul>
	);
};
