import React, { useState } from 'react';

import { useResume } from '../../../../../hooks/resume';
import { displayAlert } from '../../../../../store/alert/actions';
import { sendPicToStorage } from '../../../../../utils';
import { Backup } from '@mui/icons-material';
import { useAppDispatch } from '../../../../../store/hooks';
import { setResume } from '../../../../../store/resume/reducer';

interface IDesignFormInputFieldsProps {
	onUploadFile: (imageFile: FileList | null) => Promise<void>;
}

const DesignFormInputFields: React.FC<IDesignFormInputFieldsProps> = ({
	onUploadFile,
}) => {
	return (
		<div className='resume-form-container'>
			<label htmlFor='profil-pic' className='resume-form--design-button-upload'>
				Votre photo
				<Backup className='resume-form--design-button-upload-icon' />
			</label>
			<input
				hidden
				type='file'
				accept='png/jpeg'
				id='profil-pic'
				onChange={(e: React.ChangeEvent<HTMLInputElement>): Promise<void> =>
					onUploadFile(e.target.files)
				}
			/>
			{/* <div className='previewPic' style={{ marginTop: '20px' }}>
				<p style={{ marginRight: '10px' }}>Your choosen resume picture</p>
				<img src={previewPic} alt='/' className='imgAvatar' />
			</div> */}
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
