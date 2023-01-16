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
import React from 'react';

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

const mainColor = 'grey';

const text = { fontSize: 11, fontFamily: 'Sofia' };
const textThin = { ...text, fontWeight: 300 };
const textBold = { ...text, fontWeight: 700 };
const title = { ...text, fontSize: 14 };
const titleBold = { ...title, fontWeight: 800 };
const spacing = { margin: '4px 0' };
const spacingS = { margin: '2px 0' };
const spacingL = { margin: '8px  0' };

const styles = StyleSheet.create({
	page: { flexDirection: 'row' },
	aside: {
		height: '100%',
		width: '35%',
		padding: 16,
		backgroundColor: mainColor,
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
	column: { display: 'flex', flexDirection: 'column', gap: 8 },
	separator: {
		...spacingL,
		height: 1,
		width: '100%',
		backgroundColor: mainColor,
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

const CandidateInfos: React.FC = () => {
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
			<View
				style={[styles.spacingS, { display: 'flex', flexDirection: 'row' }]}>
				<Text style={[styles.text, { marginRight: 4 }]}>phone:</Text>
				<Text style={styles.textThin}>+37498254994</Text>
			</View>
			<View
				style={[styles.spacingS, { display: 'flex', flexDirection: 'row' }]}>
				<Text style={[styles.text, { marginRight: 4 }]}>email:</Text>
				<Text style={styles.textThin}>raffihaycan@gmail.com</Text>
			</View>
			{pictureElement}
		</View>
	);
};

const ProfilePro: React.FC = () => {
	return (
		<>
			<Text style={styles.titleBold}>Profile</Text>
			<Text style={styles.title}>professionnel</Text>
			<View style={styles.spacing} />
			<Text style={styles.text}>
				Junior React / Node developer, passionate about web development, driven
				by a strong desire to improve and apply my skills. Open to fresh job
				opportunities. My previous work experience in a french startup company
				Loumi.co allowed me to acquire a solid foundation in Front side and also
				Back side programming in a SaaS software environment. Throughout my
				internship experience as a Full Stack Javascript developer and a
				freelance project experience as a Web integrator, I am familiar with
				MERN stack, and I master Front end development. Also I made some full
				stack personal projects, during which I used React on client side and
				Firebase as server side. I started learning web development in 2019
				through OpenClassRoom Online training program. However, my constantly
				desire of acquiring knowledge driven me to be self-taught also.
			</Text>
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

export const PDFResume: React.FC = () => {
	return (
		<PDFViewer width='850px' height='700px'>
			<Document>
				<Page size='A4' style={styles.page}>
					<View style={styles.aside}>
						<View style={styles.column}>
							<ProfilePro />
							<View style={styles.spacingL} />
							<ListSkills />
						</View>
					</View>

					<View style={styles.main}>
						<CandidateInfos />
						<View style={styles.separator} />
					</View>
				</Page>
			</Document>
		</PDFViewer>
	);
};
