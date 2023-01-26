import React, { useState } from 'react';

import { useResume } from '../../../../../hooks/resume';

import { updateResumeToDB } from '../../../../../store/resume/actions';
import { CircularProgressLoad } from '../../../../ui/progress/circular';
import { EditRounded, TaskAlt, CloseRounded } from '@mui/icons-material';
import { InputInfo } from '../../../../ui/inputs/inputInfo';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';

import './updateTitleFormStyles.scss';

export const UpdateTitleForm: React.FC = () => {
	const { resume } = useResume();
	const [newTitle, setNewTitle] = useState<string>();
	const [openTextField, setOpenTextField] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (): Promise<void> => {
		if (!newTitle || newTitle === '' || resume === null) {
			return;
		}
		const updatedResume = await updateResumeToDB({
			...resume,
			title: newTitle,
		});
		setIsLoading(false);
		updatedResume && setOpenTextField(false);
	};

	const getInputInfoIcon = (): React.ReactNode => {
		return openTextField ? (
			<Tooltip title='Annuler modification'>
				<CloseRounded fontSize='small' color='primary' />
			</Tooltip>
		) : (
			<Tooltip title='Modifier le titre'>
				<EditRounded fontSize='small' color='primary' />
			</Tooltip>
		);
	};

	return (
		<div className='update-title'>
			<InputInfo
				value={resume?.title ?? 'Titre du cv'}
				label='Titre du CV'
				icon={getInputInfoIcon()}
				onIconClick={(): void => setOpenTextField(!openTextField)}
			/>

			{openTextField && (
				<div className='update-title--textField'>
					<TextField
						label='Nouveau titre'
						value={newTitle || ''}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							setNewTitle(e.target.value)
						}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									{isLoading ? (
										<CircularProgressLoad
											size={14}
											style={{ marginRight: '8px' }}
										/>
									) : (
										newTitle &&
										newTitle !== '' && (
											<Tooltip title='Enregitrer les changements'>
												<IconButton onClick={handleSubmit}>
													<TaskAlt fontSize='small' color='primary' />
												</IconButton>
											</Tooltip>
										)
									)}
								</InputAdornment>
							),
						}}
						variant='standard'
					/>
				</div>
			)}
		</div>
	);
};
