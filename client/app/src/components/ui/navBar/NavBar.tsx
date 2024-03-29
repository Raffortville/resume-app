import React from 'react';
import type { ObjectKeyLabel } from '../../../types/common';

import './navBar.scss';

interface CustomPros {
	items: ObjectKeyLabel[];
	className?: string;
	onItemClick?: (key: string) => void;
}

export const NavBar: React.FC<CustomPros> = ({
	items,
	className,
	onItemClick,
}) => {
	const renderItems = (): React.ReactNode => {
		return items.map((item) => {
			return (
				<li
					key={item.key}
					onClick={() => {
						onItemClick && onItemClick(item.key);
					}}
					className='list-item'>
					{item.label}
				</li>
			);
		});
	};

	return (
		<nav className={`${className}`}>
			<ul className='nav-list'>{renderItems()}</ul>
		</nav>
	);
};
