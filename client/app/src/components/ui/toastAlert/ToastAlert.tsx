import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

interface CustomProps {
	isOpen: boolean;
	message: string;
	severity: AlertColor | undefined;
	autoHideDuration?: number | null | undefined;
}

export const ToastAlert: React.FC<CustomProps> = React.memo(
	({ isOpen, message, severity, autoHideDuration }) => {
		const [open, setOpen] = useState(false);

		useEffect(() => {
			setOpen(isOpen);
		}, [isOpen]);

		return (
			<Snackbar
				open={open}
				onClose={(_, reason: string) => {
					if (reason === 'clickaway') {
						return;
					}
					setOpen(false);
				}}
				autoHideDuration={autoHideDuration ?? 6000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
				<MuiAlert severity={severity} elevation={3}>
					{message}
				</MuiAlert>
			</Snackbar>
		);
	}
);
