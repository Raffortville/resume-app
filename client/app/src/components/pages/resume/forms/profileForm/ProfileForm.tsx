import React from 'react';

import { TextField } from '@mui/material';

export const ProfileForm: React.FC = () => {
	return (
		<div className='resume-form-container'>
			<TextField label='Position' variant='standard' />
		</div>
	);
};
