import React, { useCallback, useEffect, useState } from 'react';

import { useResume } from '../../../../../hooks/resume';
import {
	addAchievementOrStackToResumeExperience,
	setResume,
} from '../../../../../store/resume/reducer';
import { useAppDispatch } from '../../../../../store/hooks';

import { isStringEmpty } from '../../../../../helpers';
import {
	Button,
	IconButton,
	InputAdornment,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import { AddCircle, AddCircleOutline, Cancel } from '@mui/icons-material';
import { BoxLabelAction } from '../../../../ui/boxes/boxLabelAction';
import { updateResumeToDB } from '../../../../../store/resume/actions';
import { IExperience, IResume } from '../../../../../types/store';
import { DatePickerField } from '../../../../ui/datePicker';

type ExperiencesFormType = {
	occupiedPosition: string | undefined;
	period: { start: string | undefined; end: string | undefined };
	place: string | undefined;
	project: string | undefined;
	description: string | undefined;
	achievements: string | undefined;
	stack: string | undefined;
};

type CompanyFormType = {
	value: string | undefined;
	errorText: string | undefined;
};

const initialState: CompanyFormType = {
	value: undefined,
	errorText: undefined,
};

interface IBoxAddNewExperience {
	onAddNewExperience: (companyValue: string) => void;
}

const BoxAddNewExperience: React.FC<IBoxAddNewExperience> = ({
	onAddNewExperience,
}) => {
	const [company, setCompany] = useState<CompanyFormType>(initialState);
	const [openTextField, setOpenTextField] = useState<boolean>(false);

	const getBoxLabelActionIcon = (): React.ReactNode => {
		const onIconClick = (): void => {
			setCompany(initialState);
			setOpenTextField(!openTextField);
		};

		return (
			<IconButton onClick={onIconClick}>
				{openTextField ? (
					<Cancel style={{ color: '#303952' }} />
				) : (
					<AddCircle style={{ color: '#303952' }} />
				)}
			</IconButton>
		);
	};

	const getBoxLabelText = (): string => {
		return openTextField ? 'Annuler' : 'Ajouter une expérience';
	};

	const handleAddExperience = (): void => {
		if (!company.value || isStringEmpty(company?.value)) {
			setCompany({ ...company, errorText: 'Veuillez remplir le champs' });
			return;
		}
		setOpenTextField(false);
		onAddNewExperience(company.value);
	};

	return (
		<>
			<BoxLabelAction
				label={getBoxLabelText()}
				icon={getBoxLabelActionIcon()}
				styles={{
					container: {
						alignItems: 'center',
						justifyContent: 'space-between',
						backgroundColor: 'whitesmoke',
						color: '#303952',
						border: '1px solid #303952',
					},
				}}
			/>
			{openTextField && (
				<>
					<TextField
						label="Nom de l'entrepise"
						value={company?.value || ''}
						name='position'
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							setCompany({ value: e.target.value, errorText: undefined })
						}
						required
						variant='standard'
						error={!!company.errorText}
						helperText={company.errorText}
					/>
					<Button
						className='resume-form-button'
						onClick={handleAddExperience}
						variant='contained'>
						AJOUTER
					</Button>
				</>
			)}
		</>
	);
};

interface IExperiencesFormInputFieldsProps {
	initialState: ExperiencesFormType;
	companyName: string;
	onSubmit: () => void;
	onBlur: (experienceValues: ExperiencesFormType) => void;
	addAchievementsOrStack: (
		category: 'achievements' | 'stack',
		value: string | undefined
	) => void;
}

const ExperiencesFormInputFields: React.FC<
	IExperiencesFormInputFieldsProps
> = ({
	initialState,
	addAchievementsOrStack,
	companyName,
	onSubmit,
	onBlur,
}) => {
	const [experienceValues, setExperienceValues] =
		useState<ExperiencesFormType>(initialState);

	useEffect(() => {
		setExperienceValues(initialState);
	}, [initialState]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
	): void => {
		const { name, value } = e.target;
		setExperienceValues({ ...experienceValues, [name]: value });
	};

	return (
		<div className='resume-form-container'>
			<TextField
				label={`Poste occupé à ${companyName}`}
				value={experienceValues.occupiedPosition || ''}
				name='occupiedPosition'
				onChange={handleChange}
				onBlur={(): void => onBlur(experienceValues)}
				helperText='Intitulé du poste'
				variant='standard'
			/>
			<DatePickerField
				label={`Période évolué à ${companyName}`}
				onChangeDate={(period): void => {
					setExperienceValues({ ...experienceValues, period: period });
					onBlur({ ...experienceValues, period: period });
				}}
			/>
			<TextField
				label={`Lieu de travail à ${companyName}`}
				value={experienceValues.place || ''}
				name='place'
				onChange={handleChange}
				onBlur={(): void => onBlur(experienceValues)}
				helperText='Ville, pays ou full-remote'
				variant='standard'
			/>
			<TextField
				label={`Projet chez ${companyName}`}
				value={experienceValues.project || ''}
				name='project'
				onChange={handleChange}
				onBlur={(): void => onBlur(experienceValues)}
				helperText='Lien vers le projet'
				variant='standard'
			/>
			<TextareaAutosize
				name={`Description de la mission à ${companyName}`}
				value={experienceValues.description || ''}
				onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
					const { value } = event.target;
					setExperienceValues({ ...experienceValues, description: value });
				}}
				onBlur={(): void => onBlur(experienceValues)}
				minRows={3}
				maxRows={6}
				placeholder='Décrivez la mission globale réalisée'
			/>
			<TextField
				label={`Réalisations accomplis à ${companyName}`}
				name='achievements'
				value={experienceValues.achievements || ''}
				onChange={handleChange}
				helperText='Listez les tâches réalisées'
				variant='standard'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => {
									addAchievementsOrStack(
										'achievements',
										experienceValues.achievements
									);
									setExperienceValues({
										...experienceValues,
										achievements: undefined,
									});
								}}
								className='resume-form--icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label={`Technologies utilisées à ${companyName}`}
				name='stack'
				value={experienceValues.stack || ''}
				onChange={handleChange}
				helperText='Ajouter les technos employées'
				variant='standard'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => {
									addAchievementsOrStack('stack', experienceValues.stack);
									setExperienceValues({
										...experienceValues,
										stack: undefined,
									});
								}}
								className='resume-form--icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<Button
				className='resume-form-button'
				onClick={onSubmit}
				variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};

interface IExperiencesFormProps {
	selectedExperienceId: string | undefined;
	onSelecteExperienceId: (id: string) => void;
	onSubmitForm: () => void;
}

export const ExperiencesForm: React.FC<IExperiencesFormProps> = ({
	selectedExperienceId,
	onSelecteExperienceId,
	onSubmitForm,
}) => {
	const { resumeExperiences, resume } = useResume();
	const dispatch = useAppDispatch();

	const experienceSelected = resumeExperiences
		? selectedExperienceId
			? resumeExperiences.find((exp) => exp.exp_id === selectedExperienceId)
			: resumeExperiences[0]
		: undefined;

	const initialExperiencesState: ExperiencesFormType = {
		occupiedPosition: experienceSelected?.occupiedPosition,
		period: experienceSelected?.period ?? { start: '', end: '' },
		place: experienceSelected?.place,
		description: experienceSelected?.description,
		project: experienceSelected?.project,
		achievements: undefined,
		stack: undefined,
	};

	const onAddNewExperience = useCallback(
		(companyValue: string): void => {
			if (!resume) {
				return;
			}
			const experiencesCopy = resumeExperiences ?? [];
			const exp_id = Date.now().toString();
			const experienceCreated = {
				exp_id,
				company: companyValue,
				achievements: {
					title: companyValue,
					key: exp_id,
					items: [],
				},
				stack: { title: companyValue, key: exp_id, items: [] },
			};
			dispatch(
				setResume({
					...resume,
					experiences: [...experiencesCopy, experienceCreated],
				})
			);
			onSelecteExperienceId(experienceCreated.exp_id);
		},
		[dispatch, onSelecteExperienceId, resume, resumeExperiences]
	);

	const onAddAchievementsOrStack = useCallback(
		(category: 'achievements' | 'stack', value: string | undefined) => {
			if (!resume || !value || !experienceSelected?.exp_id) {
				return;
			}
			dispatch(
				addAchievementOrStackToResumeExperience({
					categoryKey: category,
					experienceId: experienceSelected.exp_id,
					objectValue: { value, id: Date.now().toString() },
				})
			);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[experienceSelected?.exp_id, resume]
	);

	const updateExperienceValueToStore = (
		experienceValues: ExperiencesFormType
	): IResume | undefined => {
		if (resume === null || !experienceSelected) {
			return;
		}
		const experienceValuesFiltred = Object.fromEntries(
			Object.entries(experienceValues).filter(
				([key, value]) => value !== undefined
			)
		);
		const experience: IExperience = {
			...experienceSelected,
			...experienceValuesFiltred,
		};
		const experiences: IResume['experiences'] = resumeExperiences?.map((exp) =>
			exp.exp_id === experience.exp_id ? experience : exp
		);
		dispatch(setResume({ ...resume, experiences: experiences }));
	};

	const updateResume = async (): Promise<void> => {
		if (resume === null) {
			return;
		}
		const resumeUpdated = await updateResumeToDB(resume);
		resumeUpdated && onSubmitForm();
	};

	return (
		<div className='resume-form-container'>
			<BoxAddNewExperience onAddNewExperience={onAddNewExperience} />
			{experienceSelected && (
				<ExperiencesFormInputFields
					initialState={initialExperiencesState}
					companyName={experienceSelected.company}
					onSubmit={updateResume}
					onBlur={updateExperienceValueToStore}
					addAchievementsOrStack={onAddAchievementsOrStack}
				/>
			)}
		</div>
	);
};
