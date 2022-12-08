import React, { useEffect, useState } from 'react';

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
	defaultSelectedRadio?: string;
	className?: string;
}

export const ListRadios: React.FC<CustomProps> = ({
	radios,
	onSelectRadio,
	onDeleteRadio,
	defaultSelectedRadio,
	className,
}) => {
	const [selectedRadio, setSelectedRadio] = useState<string | undefined>(
		defaultSelectedRadio
	);

	useEffect(() => {
		defaultSelectedRadio && setSelectedRadio(defaultSelectedRadio);
	}, [defaultSelectedRadio]);

	const rendeRadiosItem = ({
		radioItems,
		radioKey,
	}: {
		radioItems: ObjectIdValue[];
		radioKey: string;
	}) => {
		return radioItems.map((item, index) => {
			return (
				<li key={index} className='listRadios-items--item'>
					<div className='listRadios-radio'>
						<Radio
							size='small'
							value={item.id}
							checked={selectedRadio ? selectedRadio === item.id : index === 0}
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
			{radios.map((radio, index) => {
				return (
					radio.items.length > 0 && (
						<li key={index} className='listRadios'>
							<h3>{radio.title}</h3>
							<ul className='listRadios-items'>
								{rendeRadiosItem({
									radioItems: radio.items,
									radioKey: radio.key,
								})}
							</ul>
						</li>
					)
				);
			})}
		</ul>
	);
};
