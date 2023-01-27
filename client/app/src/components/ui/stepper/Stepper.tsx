import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

import './stepperStyles.scss';

export type StepType = {
	label: string;
	isCompleted: boolean;
};

interface IStepperProgress {
	steps: StepType[];
	title?: string;
}

export const StepperProgress: React.FC<IStepperProgress> = ({
	steps,
	title,
}) => {
	return (
		<div className='stepper'>
			<h3>{title ?? 'Progression'}</h3>
			<Stepper orientation='vertical'>
				{steps.map((step, index) => (
					<Step key={index}>
						<div className='stepper-label'>
							{step.isCompleted ? (
								<CheckCircleIcon color='success' fontSize='small' />
							) : (
								<PendingIcon color='disabled' fontSize='small' />
							)}

							<p>{step.label}</p>
						</div>
					</Step>
				))}
			</Stepper>
		</div>
	);
};
