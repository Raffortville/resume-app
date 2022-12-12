import React from 'react';
import { Backup } from '@mui/icons-material';

import './inputFileStyles.scss';
import { sendPicToStorage } from '../../../../utils';
import { displayAlert } from '../../../../store/alert/actions';

interface CustomProps {
	label: string;
	onChangeFile: (fileURL: string) => void;
}

export const InputFile: React.FC<CustomProps> = ({ label, onChangeFile }) => {
	const onChange = async (inputFile: FileList | null) => {
		if (inputFile === null) {
			return;
		}
		const imageURL = await sendPicToStorage(inputFile[0], inputFile[0].name);
		if (!imageURL) {
			displayAlert({
				payload: {
					message: "Erreur lors de l'enregistrement de votre photo",
					type: 'error',
				},
			});
			return;
		}
		onChangeFile(imageURL);
	};
	return (
		<div className='inputFile'>
			<label htmlFor='inputFile' className='inputFile--label'>
				{label}
				<Backup />
			</label>
			<input
				id='inputFile'
				type='file'
				accept='image/png, image/jpeg'
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					onChange(e.target.files);
				}}
				hidden
			/>
			<small className='inputFile--helperText'>
				Seuls les formats png/jpeg sont pris en compte
			</small>
		</div>
	);
};
