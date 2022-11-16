export type ListItemType = {
	key: string;
	label: string;
};

export interface ISectionItemProps extends ListItemType {
	content: React.ReactNode;
}

export interface IIconItem {
	key: string;
	node: React.ReactNode;
}

// FORM
export type FormSectionType = 'contact' | 'profil' | 'experiences' | 'design';
