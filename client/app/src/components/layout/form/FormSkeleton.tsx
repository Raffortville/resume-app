import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material/';

import './formSkeletonStyles.scss';

interface CustomProps {
	title: string;
	children: React.ReactNode;
	hasNextButton?: boolean;
	hasBackButton?: boolean;
	onNavigateButtonClick?: (key: 'back' | 'next') => void;
	className?: string;
}

export const FormSkeleton: React.FC<CustomProps> = ({
	title,
	children,
	hasBackButton,
	hasNextButton,
	onNavigateButtonClick,
	className,
}) => {
	return (
		<div className={`skeleton ${className}`}>
			<div className='skeleton-button'>
				{hasBackButton && (
					<Button
						onClick={() => {
							onNavigateButtonClick && onNavigateButtonClick('back');
						}}
						className='button-nav'
						variant='contained'>
						<ArrowBack />
					</Button>
				)}
			</div>

			<div className='skeleton-container'>
				<div className='header'>
					<h1>{title}</h1>
				</div>
				{children}
			</div>
			<div className='skeleton-button'>
				{hasNextButton && (
					<Button
						onClick={() => {
							onNavigateButtonClick && onNavigateButtonClick('next');
						}}
						className='button-nav'
						variant='contained'>
						<ArrowForward />
					</Button>
				)}
			</div>
		</div>
	);
};
