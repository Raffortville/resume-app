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
import { useAppSelector } from '../../../../../store/hooks';
import { userSelector } from '../../../../../store/user/reducer';
import {
	IEducation,
	IExperience,
	IExpertise,
} from '../../../../../types/store';

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

interface ICandidateInfosProps extends IResumeProps {
	picture: string;
	position: string | undefined;
	user: {
		name: string | undefined;
		lastName: string | undefined;
		email: string | undefined;
		phone: string | undefined;
		mediaLink: string | undefined;
		portfolio: string | undefined;
	};
}

const CandidateInfos: React.FC<ICandidateInfosProps> = ({
	mainColor,
	picture,
	position,
	user,
}) => {
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
	const subTittle = [styles.title, { fontSize: 14 }];

	const pictureElement = (
		<View style={[styles.photoContainer, { backgroundColor: mainColor }]}>
			<Image
				style={{ width: '90px', height: '90px', borderRadius: '50%' }}
				source={picture}
			/>
		</View>
	);

	return (
		<View style={[styles.column, { position: 'relative' }]}>
			<Text style={headLineBold}>{user.name}</Text>
			<Text style={headLine}>{user.lastName}</Text>
			<View style={styles.spacingS} />
			<Text style={subTittle}>{position}</Text>
			<View style={styles.spacingL} />
			{user.phone ? (
				<View style={[{ display: 'flex', flexDirection: 'row' }]}>
					<Text style={[styles.text, { marginRight: 4, fontSize: 10 }]}>
						phone:
					</Text>
					<Text style={[styles.textThin, { fontSize: 10 }]}>{user.phone}</Text>
				</View>
			) : null}

			<View style={[{ display: 'flex', flexDirection: 'row', fontSize: 10 }]}>
				<Text style={[styles.text, { marginRight: 4, fontSize: 10 }]}>
					email:
				</Text>
				<Text style={[styles.textThin, { fontSize: 10 }]}>{user.email}</Text>
			</View>
			{user.mediaLink ? (
				<View style={[{ display: 'flex', flexDirection: 'row', fontSize: 10 }]}>
					<Text style={[styles.text, { marginRight: 4, fontSize: 10 }]}>
						link:
					</Text>
					<Text style={[styles.textThin, { fontSize: 10 }]}>
						{user.mediaLink}
					</Text>
				</View>
			) : null}
			{user.portfolio ? (
				<View style={[{ display: 'flex', flexDirection: 'row', fontSize: 10 }]}>
					<Text style={[styles.text, { marginRight: 4, fontSize: 10 }]}>
						répertoire GIT:
					</Text>
					<Text style={[styles.textThin, { fontSize: 10 }]}>
						{user.portfolio}
					</Text>
				</View>
			) : null}

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

interface IListSkills {
	expertises: IExpertise[] | undefined;
}

const ListSkills: React.FC<IListSkills> = ({ expertises }) => {
	const renderSkills = () => {
		if (!expertises) {
			return null;
		}

		return expertises.map((expert, index) => {
			if (expert.items.length === 0) {
				return null;
			}
			return (
				<View key={index}>
					<Text style={styles.textBold}>{expert.title}</Text>
					{expert.items.map((item, index) => (
						<Text key={index} style={[styles.textThin, { fontSize: 10 }]}>
							* {item.value}
						</Text>
					))}
					<View style={styles.spacingS} />
				</View>
			);
		});
	};
	return (
		<>
			<Text style={styles.titleBold}>skills</Text>
			<View style={styles.spacing} />
			{renderSkills()}
		</>
	);
};

interface IExperiences extends IResumeProps {
	experiences: IExperience[] | undefined;
}

const Experiences: React.FC<IExperiences> = ({ mainColor, experiences }) => {
	const renderListExperiences = (): React.ReactNode => {
		if (!experiences) {
			return null;
		}
		return experiences.map((exp, index) => (
			<View key={index}>
				<View style={styles.box}>
					<Text style={[styles.text, { opacity: 1 }]}>
						{`${exp.period?.start} ${
							exp.period?.end !== "aujourd'hui" ? '-' : 'à'
						} ${exp.period?.end}`}
					</Text>
				</View>
				<View style={styles.spacingS} />
				<View>
					<View
						style={[styles.row, styles.box, { backgroundColor: mainColor }]}>
						<Text
							style={[
								styles.textBold,
								{ textTransform: 'capitalize', opacity: 1 },
							]}>
							{exp.company}
						</Text>

						<Text
							style={[
								styles.text,
								{ textTransform: 'capitalize', marginLeft: 2, opacity: 1 },
							]}>
							| {exp.place}
						</Text>
					</View>
					<View style={styles.spacingS} />
					<Text style={[styles.textBold, { fontSize: 10 }]}>
						{exp.occupiedPosition}
					</Text>
					<Text style={[styles.text, { fontSize: 10 }]}>{exp.description}</Text>
					<Text style={[styles.textThin, { fontSize: 10 }]}>{exp.project}</Text>
				</View>
				<View style={styles.spacingS} />
				<View key={index} style={styles.row}>
					{exp.stack.items.map((item, index) => (
						<Text key={index} style={[styles.textThin, { fontSize: 10 }]}>
							{item.value} /
						</Text>
					))}
				</View>
				<View style={styles.spacingS} />
				{exp.achievements.items.length !== 0 ? (
					<View style={styles.column}>
						<View style={styles.spacingS} />
						<View style={[styles.box, { backgroundColor: mainColor }]}>
							<Text style={[styles.text, { opacity: 1 }]}>PROJECTS</Text>
						</View>
						<View style={styles.spacingS} />
						{exp.achievements.items.map((item, index) => (
							<Text key={index} style={[styles.textThin, { fontSize: 8 }]}>
								* {item.value}
							</Text>
						))}
					</View>
				) : null}
				<View style={styles.spacingL} />
			</View>
		));
	};

	return (
		<View style={styles.column}>
			<View style={styles.row}>
				<Text style={styles.titleBold}>Experiences</Text>
				<Text style={[styles.title, { marginLeft: 4 }]}>Professionnelles</Text>
			</View>
			{renderListExperiences()}
		</View>
	);
};

const Education: React.FC<IEducation> = ({ academy, period, certificate }) => {
	return (
		<View style={styles.column}>
			<Text style={[styles.titleBold, { opacity: 1 }]}>Education</Text>
			<View style={styles.spacing} />
			{period ? (
				<>
					<View style={styles.box}>
						<Text style={[styles.text, { opacity: 1 }]}>
							{period.start} – {period.end}
						</Text>
					</View>
					<View style={styles.spacingS} />
				</>
			) : null}
			{academy ? <Text style={styles.textBold}>OpenClass rooms</Text> : null}
			{certificate ? (
				<Text style={styles.text}>Web applications developer</Text>
			) : null}
		</View>
	);
};

export const PDFResume: React.FC = () => {
	const { resumeDesign, resumeProfile, resumeExpertises, resumeExperiences } =
		useResume();
	const user = useAppSelector(userSelector);
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
							<ListSkills expertises={resumeExpertises} />
						</View>
					</View>

					<View style={styles.main}>
						<CandidateInfos
							mainColor={mainColor}
							picture={resumeDesign?.profilPic ?? ''}
							user={{
								name: user?.firstName,
								lastName: user?.lastName,
								phone: user?.phone,
								email: user?.emailPro,
								mediaLink: resumeProfile?.socialMedias,
								portfolio: resumeProfile?.portfolio,
							}}
							position={resumeProfile?.position}
						/>
						<View style={[styles.separator, { backgroundColor: mainColor }]} />
						<Experiences
							mainColor={mainColor}
							experiences={resumeExperiences}
						/>
						<View style={[styles.separator, { backgroundColor: mainColor }]} />
						<Education
							certificate={resumeProfile?.education?.certificate}
							academy={resumeProfile?.education?.academy}
							period={resumeProfile?.education?.period}
						/>
					</View>
				</Page>
			</Document>
		</PDFViewer>
	);
};
