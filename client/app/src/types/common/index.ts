export type ObjectKeyLabel = {
	key: string;
	label: string;
};

export type ObjKeyValueType = {
	key: string;
	value: string;
};

export type ObjectIdLabel = {
	id: string;
	label: string;
};

export type ObjectKeyListItems = {
	title: string;
	key: string;
	items: ObjectIdLabel[];
};

export interface ISectionItemProps extends ObjectKeyLabel {
	content: React.ReactNode;
}

export interface IKeyNodeItem {
	key: string;
	nodeElement: React.ReactNode;
}

// FORM
export type FormSectionType =
	| 'contact'
	| 'profil'
	| 'expertises'
	| 'experiences'
	| 'design';
