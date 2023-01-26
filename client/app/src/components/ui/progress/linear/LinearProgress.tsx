import * as React from 'react';
import { LinearProgress, LinearProgressProps } from '@mui/material';

import './linearProgressStyles.scss';

interface ILinearProgressBarProps extends LinearProgressProps {
	css?: {
		container?: React.CSSProperties;
		label?: React.CSSProperties;
	};
}

export const LinearProgressBar: React.FC<ILinearProgressBarProps> = ({
	css,
	...props
}) => {
	return (
		<div className='linearProgress' style={{ ...css?.container }}>
			<h4 className='linearProgress-label' style={{ ...css?.label }}>
				Loading
			</h4>
			<LinearProgress {...props} />
		</div>
	);
};
