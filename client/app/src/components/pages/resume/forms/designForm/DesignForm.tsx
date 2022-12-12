import React, { useState } from 'react';

import { useResume } from '../../../../../hooks/resume';
import { updateResumeToDB } from '../../../../../store/resume/actions';
import { ColorKey } from '../../../../../types/common';
import { IDesign } from '../../../../../types/store';
import { colors } from '../../../../../constants';

import { Button } from '@mui/material';
import { InputFile } from '../../../../ui/inputs/inputFile';

import './designFormStyles.scss';

type MediaValuesFormType = {
	profilePic: string | undefined;
	mainColor: ColorKey;
};
interface IDesignFormInputFieldsProps {
	initialState: MediaValuesFormType;
	onSubmit: (values: MediaValuesFormType) => void;
}

const DesignFormInputFields: React.FC<IDesignFormInputFieldsProps> = ({
	initialState,
	onSubmit,
}) => {
	const [mediaValues, setMediaValues] =
		useState<MediaValuesFormType>(initialState);

	const renderColors = (): React.ReactNode => {
		return colors.map((color, index) => {
			return (
				<div
					key={index}
					className={`resume-design--colorPick ${color.name}`}
					onClick={(): void =>
						setMediaValues({
							...mediaValues,
							mainColor: { name: color.name, hex: color.hex },
						})
					}
				/>
			);
		});
	};

	return (
		<div className='resume-form-container'>
			<InputFile
				label='Importer un photo'
				onChangeFile={(imageURL) =>
					setMediaValues({ ...mediaValues, profilePic: imageURL })
				}
			/>
			{mediaValues.profilePic && (
				<img className='previewPicImg' src={mediaValues.profilePic} alt='/' />
			)}

			<h4 style={{ textAlign: 'center' }}>
				Sélectionner une couleur pour votre CV
			</h4>

			<div className='resume-design--colors'>{renderColors()}</div>
			{mediaValues.mainColor.name && (
				<>
					<h4 style={{ textAlign: 'center' }}>Votre couleur sélectionné</h4>
					<div
						className={`resume-design--colorPick selected ${mediaValues.mainColor.name}`}
					/>
				</>
			)}

			<Button
				onClick={(): void => onSubmit(mediaValues)}
				className='resume-form-button'
				variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};

export const DesignForm: React.FC = () => {
	const { resumeDesign, resume } = useResume();

	const initialMediaValuesState: MediaValuesFormType = {
		profilePic: resumeDesign?.profilPic,
		mainColor: {
			name: resumeDesign?.colorMain?.name,
			hex: resumeDesign?.colorMain?.hex,
		},
	};

	const updateResumeMedia = async (
		mediaValues: MediaValuesFormType
	): Promise<void> => {
		if (!resume) {
			return;
		}
		const design: IDesign = {
			profilPic: mediaValues.profilePic,
			colorMain: {
				name: mediaValues.mainColor.name,
				hex: mediaValues.mainColor.hex,
			},
		};
		await updateResumeToDB({
			...resume,
			design,
		});
	};

	return (
		<DesignFormInputFields
			initialState={initialMediaValuesState}
			onSubmit={updateResumeMedia}
		/>
	);
};
