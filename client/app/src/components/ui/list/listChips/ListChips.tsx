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
}

export const ListChips: React.FC<CustomProps> = ({ chips, onDeleteChip }) => {
	const renderChipsItem = ({
		chipItems,
		chipKey,
	}: {
		chipItems: ObjectIdValue[];
		chipKey: string;
	}) => {
		return chipItems.map((item) => {
			return (
				<ChipUI
					key={item.id}
					chipData={{
						id: item.id,
						value: item.value,
					}}
					onDeleteItem={(): void => onDeleteChip({ chipKey, itemId: item.id })}
				/>
			);
		});
	};

	return (
		<>
			{chips.map(
				(chip) =>
					chip.items.length > 0 && (
						<div key={chip.key} className='listChips'>
							<h3>{chip.title}</h3>
							<div className='listChips-items'>
								{renderChipsItem({ chipItems: chip.items, chipKey: chip.key })}
							</div>
						</div>
					)
			)}
		</>
	);
};
