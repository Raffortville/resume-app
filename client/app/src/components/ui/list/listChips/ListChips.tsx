import React, { useState } from 'react';
import { ObjectIdLabel } from '../../../../types';
import { ChipUI } from '../../chip';

type ListChipsObject = {
	title: string;
	key: string;
	items: ObjectIdLabel[];
};

interface CustomProps {
	chips: ListChipsObject[];
}

export const ListChips: React.FC<CustomProps> = ({ chips }) => {
	const [listChips, setListChips] = useState<ListChipsObject[]>(chips);

	const renderChipsItem = ({
		chipItems,
		chipKey,
	}: {
		chipItems: ObjectIdLabel[];
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
		};

		return chipItems.map((item) => {
			return (
				<ChipUI
					key={item.id}
					chipData={{
						id: item.id,
						label: item.label,
					}}
					onDeleteItem={handleDeleteItem}
				/>
			);
		});
	};

	return (
		<>
			{listChips.map((chip) => (
				<div key={chip.key}>
					<h2>{chip.title}</h2>
					{renderChipsItem({ chipItems: chip.items, chipKey: chip.key })}
				</div>
			))}
		</>
	);
};
