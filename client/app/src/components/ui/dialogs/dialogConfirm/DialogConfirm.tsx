import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogProps,
	DialogTitle,
} from '@mui/material';
import React from 'react';

interface IDialogConfirmProps extends DialogProps {
	open: boolean;
	title: string;
	text: string;
	onConfirm: () => void;
	onCancel: () => void;
	cancelButtonLabel?: string;
	confirmButtonLabel?: string;
}

export const DialogConfirm: React.FC<IDialogConfirmProps> = ({
	open,
	title,
	text,
	onConfirm,
	onCancel,
	cancelButtonLabel,
	confirmButtonLabel,
	...rest
}) => {
	return (
		<Dialog
			sx={{ '& .MuiDialog-paper': { padding: '16px', width: '35%' } }}
			open={open}
			{...rest}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined'>{cancelButtonLabel ?? 'Cancel'}</Button>
				<Button variant='contained'>{confirmButtonLabel ?? 'OK'}</Button>
			</DialogActions>
		</Dialog>
	);
};
