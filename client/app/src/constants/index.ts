import { ColorKey } from '../types/common';
import { IExpertise } from '../types/store';

export const expertises: IExpertise[] = [
	{ key: 'languages', title: 'Languages', items: [] },
	{ key: 'frameworks', title: 'Frameworks', items: [] },
	{ key: 'databases', title: 'Base de données', items: [] },
	{ key: 'services', title: 'Services', items: [] },
	{
		key: 'control_version',
		title: 'Contrôle de version',
		items: [],
	},
	{ key: 'productivity', title: 'Productivité', items: [] },
	{ key: 'soft_skills', title: 'Soft skill', items: [] },
];

export const colors: ColorKey[] = [
	{ name: 'grey', hex: '#0d8fcd' },
	{ name: 'maroon', hex: '#6a4952' },
	{ name: 'berry', hex: '#847a9f' },
	{ name: 'blue', hex: ' #0d8fcd' },
];
