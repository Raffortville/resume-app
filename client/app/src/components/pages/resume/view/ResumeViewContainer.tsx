import { PDFViewer, View, Page, Text, Document } from '@react-pdf/renderer';
import React from 'react';

export const ResumeViewContainer: React.FC = () => {
	return (
		<PDFViewer>
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
