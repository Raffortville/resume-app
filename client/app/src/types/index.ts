export type ListItemType = {
	key: string;
	label: string;
};

export interface ISectionItemProps extends ListItemType {
	content: React.ReactNode;
}
