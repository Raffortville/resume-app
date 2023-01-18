import React from 'react';
import { ObjectIdValue, ObjectKeyListItems } from '../../../../types/common';
import { Cancel } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import './listTextsStyles.scss';

interface CustomProps {
	texts: ObjectKeyListItems[];
	onDeleteText: ({
		textKey,
		itemId,
	}: {
		textKey: string;
		itemId: string;
	}) => void;
	className?: string;
}

export const ListTexts: React.FC<CustomProps> = ({
	texts,
	onDeleteText,
	className,
}) => {
	const rendeTextsItem = ({
		textItems,
		textKey,
	}: {
		textItems: ObjectIdValue[];
		textKey: string;
	}) => {
		return textItems.map((item, index) => {
			return (
				<li key={index} className='listTexts-items--item'>
					<span>{item.value}</span>
					<IconButton
						onClick={(): void => onDeleteText({ textKey, itemId: item.id })}>
						<Cancel fontSize='small' color='primary' />
					</IconButton>
				</li>
			);
		});
	};

	return (
		<ul className={className}>
			{texts.map(
				(text, index) =>
					text.items.length > 0 && (
						<li key={index} className='listTexts'>
							<h3>{text.title}</h3>
							<ul className='listTexts-items'>
								{rendeTextsItem({
									textItems: text.items,
									textKey: text.key,
								})}
							</ul>
						</li>
					)
			)}
		</ul>
	);
};
