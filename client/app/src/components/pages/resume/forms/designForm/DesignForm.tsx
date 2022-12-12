import React from 'react';

import { useResume } from '../../../../../hooks/resume';
import { displayAlert } from '../../../../../store/alert/actions';
import { useAppDispatch } from '../../../../../store/hooks';
import { setResume } from '../../../../../store/resume/reducer';
import { sendPicToStorage } from '../../../../../utils';

import { Button } from '@mui/material';
import { InputFile } from '../../../../ui/inputs/inputFile';

interface IDesignFormInputFieldsProps {
	onUploadFile: (imageFile: FileList | null) => Promise<void>;
}

const DesignFormInputFields: React.FC<IDesignFormInputFieldsProps> = ({
	onUploadFile,
}) => {
	return (
		<div className='resume-form-container'>
			<InputFile label='Votre Photo' onChangeFile={onUploadFile} />
			{/* <div className='previewPic' style={{ marginTop: '20px' }}>
				<p style={{ marginRight: '10px' }}>Your choosen resume picture</p>
				<img src={previewPic} alt='/' className='imgAvatar' />
			</div> */}
			<Button
				onClick={() => console.log('submit')}
				className='resume-form-button'
				variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};

export const DesignForm: React.FC = () => {
	const { resume, resumeDesign } = useResume();
	const dispatch = useAppDispatch();

	const saveProfilePicOnStore = async (inputFile: FileList | null) => {
		if (inputFile === null || !resume?._id) {
			return;
		}
		const imageURL = await sendPicToStorage(inputFile[0], resume._id);
		if (!imageURL) {
			displayAlert({
				payload: {
					message: "Erreur lors de l'enregistrement de votre photo",
					type: 'error',
				},
			});
			return;
		}
		dispatch(
			setResume({
				...resume,
				design: { ...resumeDesign, profilPic: imageURL },
			})
		);
	};

	return <DesignFormInputFields onUploadFile={saveProfilePicOnStore} />;
};
