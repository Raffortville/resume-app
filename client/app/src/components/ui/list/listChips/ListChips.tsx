import React, { useState } from 'react';
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
	const [listChips, setListChips] = useState<ObjectKeyListItems[]>(chips);

	const renderChipsItem = ({
		chipItems,
		chipKey,
	}: {
		chipItems: ObjectIdValue[];
		chipKey: string;
	}) => {
		const handleDeleteItem = (id: string): void => {
			setListChips(
				listChips.map((listChip) => {
					if (listChip.key === chipKey) {
						return {
							...listChip,
							items: listChip.items.filter((item) => item.id !== id),
						};
					}
					return listChip;
				})
			);
			onDeleteChip({ chipKey: chipKey, itemId: id });
		};

		return chipItems.map((item) => {
			return (
				<ChipUI
					key={item.id}
					chipData={{
						id: item.id,
						value: item.value,
					}}
					onDeleteItem={handleDeleteItem}
				/>
			);
		});
	};

	return (
		<>
			{listChips.map((chip) => (
				<div key={chip.key} className='listChips'>
					<h3>{chip.title}</h3>
					<div className='listChips-items'>
						{renderChipsItem({ chipItems: chip.items, chipKey: chip.key })}
					</div>
				</div>
			))}
		</>
	);
};
