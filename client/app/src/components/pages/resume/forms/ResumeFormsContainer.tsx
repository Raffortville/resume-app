import React, { useState } from 'react';

import { FormSectionType, IKeyNodeItem } from '../../../../types/common';

import {
	ImportContacts,
	Face,
	Work,
	Brush,
	DeveloperMode,
} from '@mui/icons-material/';
import { FormSkeleton } from '../../../layout/form';
import { ContactForm } from './contactForm';
import { ExpertisesForm } from './expertisesForm';
import { ProfileForm } from './profileForm';
import { ExperiencesForm } from './experiencesForm';
import { DesignForm } from './designForm/DesignForm';
import { BreadCrumbs } from '../../../ui/breadcrumbs';
import { UpdateTitleForm } from './updateTitleForm';
import { PreviewResumeFormValues } from './previewResumeFormValues';

import './resumeFormsStyles.scss';

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

export const ResumeFormContainer: React.FC = () => {
	const [formSectionSelected, setFormSectionSelected] =
		useState<FormSectionType>('contact');
	const [experienceId, setExperienceId] = useState<string>();

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
				return (
					<ProfileForm
						onSubmitForm={(): void => handleNavigateFormSections('next')}
					/>
				);

			case 'expertises':
				return (
					<ExpertisesForm
						onSubmitForm={(): void => handleNavigateFormSections('next')}
					/>
				);

			case 'experiences':
				return <ExperiencesForm selectedExperienceId={experienceId} />;

			case 'design':
				return <DesignForm />;

			default:
				return null;
		}
	};

	const showPreviewResumeForm =
		formSectionSelected === 'experiences' ||
		formSectionSelected === 'expertises';

	return (
		<>
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
					<UpdateTitleForm />
					<FormSkeleton
						title={getFormTitle()}
						children={getFormContent()}
						hasBackButton={formSectionSelected !== 'contact'}
						hasNextButton={formSectionSelected !== 'design'}
						onNavigateButtonClick={(direction) =>
							handleNavigateFormSections(direction)
						}
					/>

					{showPreviewResumeForm && (
						<PreviewResumeFormValues
							formSection={formSectionSelected}
							onSelectExperienceId={(id: string): void => setExperienceId(id)}
						/>
					)}
				</div>
			</div>
		</>
	);
};
