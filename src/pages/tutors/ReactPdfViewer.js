import React, { useState } from 'react';
import PDFViewer from 'pdf-viewer-reactjs'
import { Grid } from '@material-ui/core';

export default function ReactPdfViewer({ pdf }) {
	const [numPages, setNumPages] = useState(null);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<Grid spacing={2} style={{ margin: "auto" }}>
			<PDFViewer
				document={{
					url: pdf,
				}}
			/>
		</Grid>

	);
}
