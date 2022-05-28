import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ImagePreview({
	open,
	preview,
	selectedFile,
	handleClose,
	handleSubmission,
	width,
	text,
}) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{text}</DialogTitle>
				<DialogContent>
					<img src={preview} width={width} height={'auto'} alt='uploaded-img' />
					<div>
						<p>Filename: {selectedFile.name}</p>
						<p>Filetype: {selectedFile.type}</p>
						<p>Size in KB: {Number(selectedFile.size / 1024).toFixed(2)}</p>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary'>
						Back
					</Button>
					<Button onClick={handleSubmission} color='primary' autoFocus>
						Confirm Upload
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
