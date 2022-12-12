export type ObjectKeyLabel = {
	key: string;
	label: string;
};

export type ObjKeyValueType = {
	key: string;
	value: string;
};

export type ObjectIdValue = {
	id: string;
	value: string;
};

export type ObjectKeyListItems = {
	title: string;
	key: string;
	items: ObjectIdValue[];
};

export interface ISectionItemProps extends ObjectKeyLabel {
	content: React.ReactNode;
}

export interface IKeyNodeItem {
	key: string;
	nodeElement: React.ReactNode;
}

export type ColorKey = {
	name: string | undefined;
	hex: string | undefined;
};

// FORM
export type FormSectionType =
	| 'contact'
	| 'profil'
	| 'expertises'
	| 'experiences'
	| 'design';
