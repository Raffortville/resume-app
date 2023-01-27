import React from 'react';
import { useResumeProgress } from '../../../../../hooks/resumeProgress';
import { StepperProgress } from '../../../../ui/stepper';

export const ResumeStepper: React.FC = () => {
	const { stepperItems } = useResumeProgress();
	return <StepperProgress steps={stepperItems} />;
};
