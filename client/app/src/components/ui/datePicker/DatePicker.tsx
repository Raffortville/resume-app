import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import {
	DateRangePicker,
	DateRange,
} from '@mui/x-date-pickers-pro/DateRangePicker';

import './datePickerStyles.scss';

interface IDatePickerFieldProps {
	onChangeDate: ({
		start,
		end,
	}: {
		start: string | undefined;
		end: string | undefined;
	}) => void;
	label?: string;
	helperText?: string;
}

export const DatePickerField: React.FC<IDatePickerFieldProps> = ({
	onChangeDate,
	label,
	helperText,
}) => {
	const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);

	const handleChange = (newValue: DateRange<Dayjs>): void => {
		setValue(newValue);
		const start = newValue[0]?.format('DD/MM/YYYY');
		const end = newValue[1]?.format('DD/MM/YYYY') ?? "aujourd'hui";
		onChangeDate({ start, end });
	};

	return (
		<div>
			{label && <label className='datePicker-label'>{label}</label>}
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				localeText={{ start: 'Début', end: 'Fin' }}>
				<DateRangePicker
					value={value}
					onChange={handleChange}
					renderInput={(startProps, endProps) => (
						<React.Fragment>
							<TextField
								{...startProps}
								variant='standard'
								helperText={helperText}
							/>
							<Box sx={{ mx: 2 }}> à </Box>
							<TextField {...endProps} variant='standard' />
						</React.Fragment>
					)}
				/>
			</LocalizationProvider>
		</div>
	);
};
