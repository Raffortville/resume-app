import {
	PDFViewer,
	View,
	Page,
	Text,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';

export const PDFResume: React.FC = () => {
	// const styles = StyleSheet.create({
	// 	page: { backgroundColor: 'tomato', width: 600 },
	// 	section: { color: 'white', textAlign: 'center', margin: 30 },
	// });
	return (
		<PDFViewer width='850px' height='700px'>
			<Document>
				<Page size='A4'>
					<View>
						<Text>Section #1</Text>
					</View>
					<View>
						<Text>Section #2</Text>
					</View>
				</Page>
			</Document>
		</PDFViewer>
	);
};
