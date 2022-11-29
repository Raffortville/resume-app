import React, { useState } from 'react';
import { ISectionItemProps } from '../../../types/common';

import './switchSections.scss';

interface CustomProps {
	items: ISectionItemProps[];
	defaultKey: string;
	title?: string;
	className?: string;
}

export const SwitchSections: React.FC<CustomProps> = ({
	items,
	defaultKey,
	title,
	className,
}) => {
	const [selectedKey, setSelectedKey] = useState<string>(defaultKey);

	const renderSections = (): React.ReactNode => {
		return items.map((item) => {
			return (
				<div
					key={item.key}
					className={`section ${selectedKey === item.key && 'isOnFocused'} `}
					onMouseOver={() => setSelectedKey(item.key)}>
					<label className='section-label'>{item.label}</label>
					<div className='section-content'>{item.content}</div>
				</div>
			);
		});
	};

	return (
		<div className='switchSections'>
			<h1 className='title'>{title}</h1>
			<div className={`switchSections-container ${className}`}>
				{renderSections()}
			</div>
		</div>
	);
};
