import React from 'react';

import './labelInputsStyles.scss';

interface ILabelInputProps {
	label: string;
}

export const LabelInput: React.FC<ILabelInputProps> = ({ label }) => {
	return <label className='labelInput'>{label}</label>;
};
