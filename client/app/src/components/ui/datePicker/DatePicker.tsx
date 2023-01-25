import * as React from 'react';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

import type { IPeriodRange } from '../../../types/common';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DateRange, DateRangePicker } from 'mui-daterange-picker';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import './datePickerStyles.scss';

interface IDatePickerFieldProps {
	period: IPeriodRange;
	onChangeDate: ({ start, end }: IPeriodRange) => void;
	label?: string;
}

export const DatePickerField: React.FC<IDatePickerFieldProps> = ({
	period,
	onChangeDate,
	label,
}) => {
	const [open, setOpen] = React.useState(false);
	const [dateRange, setDateRange] = React.useState<IPeriodRange | null>(period);

	React.useEffect(() => {
		setDateRange(period);
	}, [period]);

	const toggle = () => setOpen(!open);

	const setPeriod = (range: DateRange): IPeriodRange => {
		return {
			start: range.startDate
				? format(range.startDate, 'dd/MM/yyyy')
				: undefined,
			end: range.endDate ? format(range.endDate, 'dd/MM/yyyy') : undefined,
		};
	};

	const handleChange = (range: DateRange): void => {
		const period = setPeriod(range);
		setDateRange(period);
		onChangeDate(period);
	};

	return (
		<div className='datePicker'>
			{label && <label className='datePicker-label'>{label}</label>}

			<div className='wrapperDatePicker'>
				{open && (
					<div className='datePicker-icons'>
						{dateRange !== null && (
							<span
								onClick={(): void => {
									setOpen(false);
								}}>
								<CheckCircleOutlineIcon fontSize='large' color='success' />
							</span>
						)}
					</div>
				)}

				<DateRangePicker
					open={open}
					toggle={toggle}
					onChange={handleChange}
					locale={frLocale}
				/>
			</div>
			<div className='datePicker-inputs'>
				<TextField
					aria-readonly
					label='Début'
					value={dateRange?.start ?? ''}
					variant='standard'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={toggle}>
									<DateRangeIcon color='primary' fontSize='small' />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<TextField
					aria-readonly
					label='Fin'
					value={dateRange?.end ?? ''}
					variant='standard'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={toggle}>
									<DateRangeIcon color='primary' fontSize='small' />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</div>
		</div>
	);
};
