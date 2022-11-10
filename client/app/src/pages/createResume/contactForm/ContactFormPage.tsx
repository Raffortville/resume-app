import React from 'react';
import { FormSkeleton } from '../../../components/layout/form';

export const ContactFormPage: React.FC = () => {
	return (
		<>
			<FormSkeleton
				title='contact'
				children={<div>tetetete</div>}
				hasBackButton
				hasNextButton
			/>
		</>
	);
};
