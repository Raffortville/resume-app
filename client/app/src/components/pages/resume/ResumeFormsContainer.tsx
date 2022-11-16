import React, { useState } from 'react';

import { alertSelector } from '../../../store/alert/reducer';
import { useAppSelector } from '../../../store/hooks';
import { FormSectionType } from '../../../types';

import { FormSkeleton } from '../../layout/form';
import { ToastAlert } from '../../ui/toastAlert';
import { ContactForm } from './forms/contactForm';
import { ProfileForm } from './forms/profileForm';
import { ExperiencesForm } from './forms/experiencesForm';
import { DesignForm } from './forms/designForm/DesignForm';

import './resumeFormsStyles.scss';

export const ResumeFormContainer: React.FC = () => {
	const [formSectionSelected, setFormSectionSelected] =
		useState<FormSectionType>('contact');

	const alert = useAppSelector(alertSelector);

	const getFormTitle = (): string => {
		switch (formSectionSelected) {
			case 'contact':
				return 'Vos Coordonnées';

			case 'profil':
				return 'Votre Profil';

			case 'experiences':
				return 'Vos Expériences professionnalles';

			case 'design':
				return 'Styliser votre CV';

			default:
				return '';
		}
	};

	const handleNavigateFormSections = (direction: 'back' | 'next'): void => {
		switch (formSectionSelected) {
			case 'contact':
				setFormSectionSelected('profil');
				break;
			case 'profil':
				setFormSectionSelected(
					direction === 'back' ? 'contact' : 'experiences'
				);
				break;

			case 'experiences':
				setFormSectionSelected(direction === 'back' ? 'profil' : 'design');
				break;

			case 'design':
				setFormSectionSelected('experiences');
				break;

			default:
				break;
		}
	};

	const getFormContent = (): React.ReactNode => {
		switch (formSectionSelected) {
			case 'contact':
				return (
					<ContactForm
						onSubmitForm={(): void => handleNavigateFormSections('next')}
					/>
				);

			case 'profil':
				return <ProfileForm />;

			case 'experiences':
				return <ExperiencesForm />;

			case 'design':
				return <DesignForm />;

			default:
				return null;
		}
	};

	return (
		<>
			{alert !== null && (
				<ToastAlert
					isOpen={alert !== null}
					message={alert?.message ?? ''}
					severity={alert?.type ?? 'info'}
				/>
			)}
			<div className='resume-form'>
				<FormSkeleton
					title={getFormTitle()}
					children={getFormContent()}
					hasBackButton={formSectionSelected !== 'contact'}
					hasNextButton={formSectionSelected !== 'design'}
					onNavigateButtonClick={(direction) =>
						handleNavigateFormSections(direction)
					}
				/>
			</div>
		</>
	);
};
