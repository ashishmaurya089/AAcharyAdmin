import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '60%',
	},
}));

export default function EditManager({
	editor,
	editData,
	setEditData,
	save,
	handleClose,
}) {
	const classes = useStyles();
	const [maxWidth, setMaxWidth] = React.useState('md');
	const [fullWidth, setFullWidth] = React.useState(true);
	return (
		<div>
			<Dialog
				open={editor}
				onClose={handleClose}
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Edit Text</DialogTitle>
				<DialogContent>
					<TextField
						label='Text Editor'
						fullWidth={true}
						value={editData}
						multiline
						rowsMax={4}
						onChange={(e) => setEditData(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							save();
							handleClose();
						}}
						color='primary'
						autoFocus
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
