import {
	PDFViewer,
	View,
	Page,
	Text,
	Document,
	StyleSheet,
	Font,
} from '@react-pdf/renderer';

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

const text = { fontSize: 11, fontFamily: 'Sofia' };
const textThin = { ...text, fontWeight: 300 };
const textBold = { ...text, fontWeight: 700 };
const title = { ...text, fontSize: 18 };
const titleBold = { ...title, fontWeight: 800 };

export const PDFResume: React.FC = () => {
	const styles = StyleSheet.create({
		page: { flexDirection: 'row' },
		aside: {
			height: '100%',
			width: '35%',
			backgroundColor: 'grey',
			color: 'white',
		},
		main: { height: '100%', width: '65%' },
		text: text,
		textThin: textThin,
		textBold: textBold,
		title: title,
		titleBold: titleBold,
	});
	return (
		<PDFViewer width='850px' height='700px'>
			<Document>
				<Page size='A4' style={styles.page}>
					<View style={styles.aside}>
						<Text style={styles.titleBold}>Title bold</Text>
						<Text style={styles.title}>Title</Text>
						<Text style={styles.text}>text</Text>
						<Text style={styles.textBold}>text bold</Text>
						<Text style={styles.textThin}>text thin</Text>
					</View>
					<View style={styles.main}>
						<Text>Section #2</Text>
					</View>
				</Page>
			</Document>
		</PDFViewer>
	);
};
