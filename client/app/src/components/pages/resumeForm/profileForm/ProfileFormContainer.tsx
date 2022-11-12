import { TextField } from '@mui/material';
import React from 'react';

import { FormSkeleton } from '../../../layout/form';

const ProfileFormInputFields: React.FC = () => {
	return <TextField label='Position' variant='standard' />;
};

export const ProfileFormContainer: React.FC = () => {
	return (
		<FormSkeleton title='Votre Profil' hasNextButton hasBackButton>
			<ProfileFormInputFields />
		</FormSkeleton>
	);
};
