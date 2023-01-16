import {
	PDFViewer,
	Image,
	View,
	Page,
	Text,
	Document,
	StyleSheet,
	Font,
} from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { useResume } from '../../../../../hooks/resume';

Font.register({
	family: 'Sofia',
	fonts: [
		{
			src: 'http://fonts.gstatic.com/s/sofiasans/v10/Yq6E-LCVXSLy9uPBwlAThu1SY8Cx8rlT69AksK3trvKCXl8k.ttf',
			fontWeight: 300,
		},
		{
			src: 'http://fonts.gstatic.com/s/sofiasans/v10/Yq6E-LCVXSLy9uPBwlAThu1SY8Cx8rlT69B6sK3trvKCXl8k.ttf',
		},
		{
			src: 'http://fonts.gstatic.com/s/sofiasans/v10/Yq6E-LCVXSLy9uPBwlAThu1SY8Cx8rlT69Cdt63trvKCXl8k.ttf',
			fontWeight: 700,
		},

		{
			src: 'http://fonts.gstatic.com/s/sofiasans/v10/Yq6E-LCVXSLy9uPBwlAThu1SY8Cx8rlT69D6t63trvKCXl8k.ttf',
			fontWeight: 800,
		},
	],
});

const defaultMainColor = 'grey';

const text = { fontSize: 11, fontFamily: 'Sofia' };
const textThin = { ...text, fontWeight: 300 };
const textBold = { ...text, fontWeight: 700 };
const title = { ...text, fontSize: 14 };
const titleBold = { ...title, fontWeight: 800 };
const spacing = { margin: '4px 0' };
const spacingS = { margin: '2px 0' };
const spacingL = { margin: '8px  0' };
const box = {
	opacity: 0.1,
	padding: 2,
};

const styles = StyleSheet.create({
	page: { flexDirection: 'row' },
	aside: {
		height: '100%',
		width: '35%',
		padding: 16,
		color: 'white',
	},
	main: { height: '100%', width: '65%', padding: 16 },
	text,
	textThin,
	textBold,
	spacing,
	spacingS,
	spacingL,
	title: { ...title, textTransform: 'uppercase' },
	titleBold: { ...titleBold, textTransform: 'uppercase' },
	row: { display: 'flex', flexDirection: 'row' },
	column: { display: 'flex', flexDirection: 'column' },
	box,
	separator: {
		...spacingL,
		height: 1,
		width: '100%',
		opacity: 0.3,
	},
	photoContainer: {
		height: '92px',
		width: '92px',
		position: 'absolute',
		borderRadius: '50%',
		left: '250px',
		top: '0',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

interface IResumeProps {
	mainColor: string;
}

const CandidateInfos: React.FC<IResumeProps> = ({ mainColor }) => {
	const headLineBold = {
		fontSize: 28,
		fontFamily: 'Helvetica-Bold',
		letterSpacing: '1px',
		color: mainColor,
	};
	const headLine = {
		fontSize: 30,
		fontFamily: 'Helvetica',
		letterSpacing: '1px',
		color: '#414A4C',
	};
	const subTittle = [styles.title, { letterSpacing: 1, fontSize: 15 }];

	const pictureElement = (
		<View style={[styles.photoContainer, { backgroundColor: mainColor }]}>
			<Image
				style={{ width: '90px', height: '90px', borderRadius: '50%' }}
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/L%C3%BCdinghausen%2C_Burg_Kakesbeck_--_2021_--_8860.jpg/2560px-L%C3%BCdinghausen%2C_Burg_Kakesbeck_--_2021_--_8860.jpg'
			/>
		</View>
	);

	return (
		<View style={[styles.column, { position: 'relative' }]}>
			<Text style={headLineBold}>Raffi</Text>
			<Text style={headLine}>HAYCAN</Text>
			<View style={styles.spacingS} />
			<Text style={subTittle}>REACT / NODE JS DEVELOPER</Text>
			<View style={styles.spacingL} />
			<View style={[{ display: 'flex', flexDirection: 'row' }]}>
				<Text style={[styles.text, { marginRight: 4, fontSize: 10 }]}>
					phone:
				</Text>
				<Text style={[styles.textThin, { fontSize: 10 }]}>+37498254994</Text>
			</View>
			<View style={[{ display: 'flex', flexDirection: 'row', fontSize: 10 }]}>
				<Text style={[styles.text, { marginRight: 4, fontSize: 10 }]}>
					email:
				</Text>
				<Text style={[styles.textThin, { fontSize: 10 }]}>
					raffihaycan@gmail.com
				</Text>
			</View>
			{pictureElement}
		</View>
	);
};

interface IProfileProps {
	introduction: string | undefined;
}

const ProfilePro: React.FC<IProfileProps> = ({ introduction }) => {
	return (
		<>
			<Text style={styles.titleBold}>Profile</Text>
			<Text style={styles.title}>professionnel</Text>
			<View style={styles.spacing} />
			<Text style={styles.text}>{introduction}</Text>
		</>
	);
};

const ListSkills: React.FC = () => {
	return (
		<>
			<Text style={styles.titleBold}>skills</Text>
			<View style={styles.spacing} />
			<Text style={styles.textBold}>Programming Languages:</Text>
			<Text style={styles.textThin}>* HTML5/CSS3 JAVASCRIPT (ES6)</Text>
			<View style={styles.spacingS} />
			<Text style={styles.textBold}>Frameworks & Librairies:</Text>
			<Text style={styles.textThin}>* React Js Functional Component</Text>
			<Text style={styles.textThin}>* Node Js/Express Js</Text>
		</>
	);
};

const Experiences: React.FC<IResumeProps> = ({ mainColor }) => {
	const infosElement = (
		<View>
			<View style={styles.row}>
				<Text style={[styles.textBold, { textTransform: 'capitalize' }]}>
					loumi
				</Text>

				<Text
					style={[styles.text, { textTransform: 'capitalize', marginLeft: 2 }]}>
					| Paris
				</Text>
			</View>
			<View style={styles.spacingS} />
			<Text style={styles.textBold}>FullStack Javascript Developer</Text>
			<Text style={styles.text}>SaaS environment MERN Stack</Text>
			<Text style={styles.textThin}>https://www.loumi.co/</Text>
		</View>
	);

	const stackListElement = (
		<View style={styles.column}>
			<View style={styles.spacingS} />
			<Text style={styles.textThin}>* React Functional components</Text>
			<Text style={styles.textThin}>* Express.js</Text>
		</View>
	);

	const projectsListElement = (
		<View style={styles.column}>
			<View style={[styles.box, { backgroundColor: mainColor }]}>
				<Text style={[styles.text, { opacity: 1 }]}>PROJECTS</Text>
			</View>
			<View style={styles.spacingS} />
			<Text style={[styles.textThin, { fontSize: 10 }]}>
				* Design and implementation of new frontend features (forms, pages)
			</Text>
			<Text style={[styles.textThin, { fontSize: 10 }]}>
				* Graphic integration from a design system (Figma)
			</Text>
		</View>
	);

	return (
		<View style={styles.column}>
			<View style={styles.row}>
				<Text style={styles.titleBold}>Experiences</Text>
				<Text style={[styles.title, { marginLeft: 4 }]}>Professionnelles</Text>
			</View>
			<View style={styles.spacing} />
			<View style={styles.box}>
				<Text style={[styles.text, { opacity: 1 }]}>02/2021 - 07/2021</Text>
			</View>
			<View style={styles.spacingS} />
			{infosElement}
			<View style={styles.spacingS} />
			{stackListElement}
			<View style={styles.spacingL} />
			{projectsListElement}
		</View>
	);
};

const Education: React.FC = () => {
	return (
		<View style={styles.column}>
			<Text style={[styles.titleBold, { opacity: 1 }]}>Education</Text>
			<View style={styles.spacing} />
			<View style={styles.box}>
				<Text style={[styles.text, { opacity: 1 }]}>09/2019 – 08/2020</Text>
			</View>
			<View style={styles.spacingS} />
			<Text style={styles.textBold}>OpenClass rooms</Text>
			<Text style={styles.text}>Web applications developer</Text>
		</View>
	);
};

export const PDFResume: React.FC = () => {
	const { resumeDesign, resumeProfile } = useResume();
	const [mainColor, setMainColor] = useState<string>(defaultMainColor);
	useEffect(() => {
		if (resumeDesign?.colorMain?.hex) {
			setMainColor(resumeDesign.colorMain.hex);
		}
	}, [resumeDesign]);

	return (
		<PDFViewer width='850px' height='700px'>
			<Document>
				<Page size='A4' style={styles.page}>
					<View style={[styles.aside, { backgroundColor: mainColor }]}>
						<View style={styles.column}>
							<ProfilePro introduction={resumeProfile?.introduction} />
							<View style={styles.spacingL} />
							<ListSkills />
						</View>
					</View>

					<View style={styles.main}>
						<CandidateInfos mainColor={mainColor} />
						<View style={[styles.separator, { backgroundColor: mainColor }]} />
						<Experiences mainColor={mainColor} />
						<View style={[styles.separator, { backgroundColor: mainColor }]} />
						<Education />
					</View>
				</Page>
			</Document>
		</PDFViewer>
	);
};
