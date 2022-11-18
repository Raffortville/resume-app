import React from 'react';

import { AddCircleOutline } from '@mui/icons-material';
import { InputAdornment, TextareaAutosize, TextField } from '@mui/material';

export const ExpertisesForm: React.FC = () => {
	return (
		<>ExpertisesForm</>
		// <TextField
		// 	label='Languages informatiques'
		// 	name='languages'
		// 	value={expertisesValue.languages}
		// 	onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
		// 		setExpertisesValue({ ...expertisesValue, languages: e.target.value })
		// 	}
		// 	variant='standard'
		// 	helperText='Saisir vos languages maîtrisés et cliquer pour ajouter'
		// 	InputProps={{
		// 		endAdornment: (
		// 			<InputAdornment position='end'>
		// 				<AddCircleOutline
		// 					color='primary'
		// 					onClick={(): void =>
		// 						setProfileValues({
		// 							...profileValues,
		// 							expertises: {
		// 								...profileValues.expertises,
		// 								languages: [
		// 									...(profileValues?.expertises?.languages || []),
		// 									{
		// 										key: expertisesValue.languages,
		// 										value: expertisesValue.languages,
		// 									},
		// 								],
		// 							},
		// 						})
		// 					}
		// 					style={{ fontSize: '1.5em', cursor: 'pointer' }}
		// 				/>
		// 			</InputAdornment>
		// 		),
		// 	}}
		// />
	);
};
