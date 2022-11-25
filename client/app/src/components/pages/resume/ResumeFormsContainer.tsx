import React, { useEffect, useRef, useState } from 'react';

import { alertSelector } from '../../../store/alert/reducer';
import { useAppSelector } from '../../../store/hooks';
import { FormSectionType, IKeyNodeItem } from '../../../types';

import {
	ImportContacts,
	Face,
	Work,
	Brush,
	DeveloperMode,
} from '@mui/icons-material/';
import { FormSkeleton } from '../../layout/form';
import { ToastAlert } from '../../ui/toastAlert';
import { ContactForm } from './forms/contactForm';
import { ExpertisesForm } from './forms/expertisesForm';
import { ProfileForm } from './forms/profileForm';
import { ExperiencesForm } from './forms/experiencesForm';
import { DesignForm } from './forms/designForm/DesignForm';
import { BreadCrumbs } from '../../ui/breadcrumbs';

import './resumeFormsStyles.scss';
import { useLocation } from 'react-router-dom';

export const ResumeFormContainer: React.FC = () => {
	const [formSectionSelected, setFormSectionSelected] =
		useState<FormSectionType>('contact');

	const alert = useAppSelector(alertSelector);
	const location = useLocation();
	const previousPathKey = useRef(location.state?.previousPathKey);

	useEffect(() => {
		if (
			!location.pathname.includes(previousPathKey?.current) &&
			formSectionSelected !== 'contact'
		) {
			setFormSectionSelected('contact');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	const breadcrumbsItems: IKeyNodeItem[] = [
		{
			key: 'contact',
			nodeElement: (
				<>
					<ImportContacts style={{ fontSize: '1em' }} /> Contact
				</>
			),
		},
		{
			key: 'profil',
			nodeElement: (
				<>
					<Face style={{ fontSize: '1em' }} /> Profil
				</>
			),
		},
		{
			key: 'expertises',
			nodeElement: (
				<>
					<DeveloperMode style={{ fontSize: '1em' }} /> Expertises
				</>
			),
		},
		{
			key: 'experiences',
			nodeElement: (
				<>
					<Work style={{ fontSize: '1em' }} /> Expériences
				</>
			),
		},
		{
			key: 'design',
			nodeElement: (
				<>
					<Brush style={{ fontSize: '1em' }} /> Design
				</>
			),
		},
	];

	const getFormTitle = (): string => {
		switch (formSectionSelected) {
			case 'contact':
				return 'Vos Coordonnées';

			case 'profil':
				return 'Votre Profil';

			case 'experiences':
				return 'Expériences professionnelles';

			case 'design':
				return 'Styliser votre CV';

			case 'expertises':
				return 'Vos expertises';

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
				setFormSectionSelected(direction === 'back' ? 'contact' : 'expertises');
				break;

			case 'expertises':
				setFormSectionSelected(direction === 'back' ? 'profil' : 'experiences');
				break;

			case 'experiences':
				setFormSectionSelected(direction === 'back' ? 'expertises' : 'design');
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

			case 'expertises':
				return <ExpertisesForm />;

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
			<ToastAlert
				isOpen={alert !== null}
				message={alert?.message ?? ''}
				severity={alert?.type ?? 'info'}
			/>

			<div className='resume-form'>
				<div className='resume-form-breadcrumbs-container'>
					<BreadCrumbs
						items={breadcrumbsItems}
						onItemClick={(key): void =>
							setFormSectionSelected(key as FormSectionType)
						}
						selectedKey={formSectionSelected}
						hasTextLink
					/>
				</div>
				<div className='resume-form--section'>
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
			</div>
		</>
	);
};
