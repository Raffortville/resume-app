import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WebIcon from '@mui/icons-material/Web';

import './homePageStyles.scss';

const labels: { text: string; icon: React.ReactNode }[] = [
	{
		text: 'Une app pour créer son CV orienté tech',
		icon: <WebIcon className='homePage-caption-icon' />,
	},
	{
		text: 'Une app pour stocker ses CV',
		icon: <SaveAsIcon className='homePage-caption-icon' />,
	},
	{
		text: 'CV générés au format PDF',
		icon: <PictureAsPdfIcon className='homePage-caption-icon' />,
	},
	{
		text: 'Un formulaire simple et intiuitif',
		icon: <AutoAwesomeIcon className='homePage-caption-icon' />,
	},
];

export const HomePageContainer: React.FC = () => {
	const renderListLabels = (): React.ReactNode => {
		return labels.map(({ text, icon }, index) => (
			<div key={index} className='homePage-caption'>
				{icon}
				<h2 className='homePage-label'>{text}</h2>
			</div>
		));
	};

	return (
		<div className='homePage'>
			<h1 style={{ fontStyle: 'oblique' }}>Make my CV Tech !</h1>
			<div className='homePage-list'>{renderListLabels()}</div>
		</div>
	);
};
