import React from 'react';
import { ObjectIdValue, ObjectKeyListItems } from '../../../../types/common';
import { ChipUI } from '../../chip';

import './listChipsStyles.scss';

interface CustomProps {
	chips: ObjectKeyListItems[];
	onDeleteChip: ({
		chipKey,
		itemId,
	}: {
		chipKey: string;
		itemId: string;
	}) => void;
	className?: string;
}

export const ListChips: React.FC<CustomProps> = ({
	chips,
	onDeleteChip,
	className,
}) => {
	const renderChipsItem = ({
		chipItems,
		chipKey,
	}: {
		chipItems: ObjectIdValue[];
		chipKey: string;
	}) => {
		return chipItems.map((item, index) => {
			return (
				<li key={index}>
					<ChipUI
						chipData={{
							id: item.id,
							value: item.value,
						}}
						onDeleteItem={(): void =>
							onDeleteChip({ chipKey, itemId: item.id })
						}
						chipMuiProps={{ size: 'small' }}
						styles={{ fontSize: '0.7em' }}
					/>
				</li>
			);
		});
	};

	return (
		<ul className={className}>
			{chips.map(
				(chip, index) =>
					chip.items.length > 0 && (
						<li key={index} className='listChips'>
							<h3>{chip.title}</h3>
							<ul className='listChips-items'>
								{renderChipsItem({ chipItems: chip.items, chipKey: chip.key })}
							</ul>
						</li>
					)
			)}
		</ul>
	);
};
