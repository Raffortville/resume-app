import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormSectionType, IKeyNodeItem } from '../../../../types/common';
import {
	ImportContacts,
	Face,
	Work,
	Brush,
	DeveloperMode,
	VisibilityRounded,
} from '@mui/icons-material/';
import { Button } from '@mui/material';
import { FormSkeleton } from '../../../layout/form';
import { ContactForm } from './contactForm';
import { ExpertisesForm } from './expertisesForm';
import { ProfileForm } from './profileForm';
import { ExperiencesForm } from './experiencesForm';
import { DesignForm } from './designForm/DesignForm';
import { BreadCrumbs } from '../../../ui/breadcrumbs';
import { UpdateTitleForm } from './updateTitleForm';
import { PreviewResumeFormValues } from './previewResumeFormValues';
import { ResumeStepper } from './resumeStepper';

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

	const location = useLocation();
	const navigate = useNavigate();

	const onNavigateToResumeView = (): void => {
		const { resumeId } = location.state;
		if (!resumeId) {
			return;
		}
		navigate(`/resume/view/${resumeId}`, { state: { resumeId: resumeId } });
	};

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
				return (
					<ExperiencesForm
						selectedExperienceId={experienceId}
						onSelecteExperienceId={(id): void => setExperienceId(id)}
						onSubmitForm={(): void => handleNavigateFormSections('next')}
					/>
				);

			case 'design':
				return <DesignForm />;

			default:
				return null;
		}
	};

	return (
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
				<Button
					onClick={onNavigateToResumeView}
					variant='outlined'
					color='info'
					startIcon={<VisibilityRounded color='info' fontSize='small' />}>
					<span>Voir CV</span>
				</Button>
			</div>
			<div className='resume-form-row'>
				<div className='resume-form--left'>
					<UpdateTitleForm />
					<ResumeStepper />
				</div>
				<div className='resume-form--inputFields'>
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
				<div className='resume-form--preview'>
					{(formSectionSelected === 'experiences' ||
						formSectionSelected === 'expertises') && (
						<PreviewResumeFormValues
							formSection={formSectionSelected}
							onSelectExperienceId={(id: string): void => {
								setExperienceId(id);
							}}
							experienceId={experienceId}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
