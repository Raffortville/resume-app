import React, { useEffect, useState } from 'react';

import { IKeyNodeItem } from '../../../types';

import { Breadcrumbs } from '@mui/material';

import './breadCrumbsStyles.scss';

interface CustomProps {
	items: IKeyNodeItem[];
	onItemClick: (key: string) => void;
	selectedKey?: string;
	hasTextLink?: boolean;
	className?: string;
}

export const BreadCrumbs: React.FC<CustomProps> = ({
	items,
	onItemClick,
	selectedKey,
	hasTextLink,
	className,
}) => {
	const [activeKey, setActiveKey] = useState<string>(items[0].key);

	useEffect(() => {
		if (selectedKey) {
			setActiveKey(selectedKey);
		}
	}, [selectedKey]);

	const renderBreadcrumbsElement = (): React.ReactNode => {
		return items.map((item) => (
			<div
				key={item.key}
				className={`${hasTextLink ? 'breadcrumbs-item' : null} ${
					item.key === activeKey ? 'active' : null
				}`}
				onClick={(): void => {
					setActiveKey(item.key);
					onItemClick(item.key);
				}}>
				{item.nodeElement}
			</div>
		));
	};
	return (
		<Breadcrumbs className={`breadcrumbs ${className}`}>
			{renderBreadcrumbsElement()}
		</Breadcrumbs>
	);
};
