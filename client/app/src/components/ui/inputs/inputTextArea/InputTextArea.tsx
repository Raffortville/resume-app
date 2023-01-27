import { TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import { LabelInput } from '../../label';

import './inputTextAreaStyles.scss';

interface IInputTextAreaProps {
	value: string | undefined;
	name: string;
	label?: string;
	onChange: ({ name, value }: { name: string; value: string }) => void;
}

export const InputTextArea: React.FC<IInputTextAreaProps> = ({
	value,
	name,
	label,
	onChange,
}) => {
	const [text, setText] = useState<string | undefined>(value);
	return (
		<div className='inputTextArea'>
			{label && <LabelInput label={label} />}
			<TextareaAutosize
				name={name}
				value={text || ''}
				minRows={3}
				maxRows={6}
				onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
					const { name, value } = event.target;
					setText(value);
					onChange({ name, value });
				}}
			/>
		</div>
	);
};
