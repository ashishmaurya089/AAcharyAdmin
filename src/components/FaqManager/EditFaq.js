import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
	root: {},
	textField: {
		margin: theme.spacing(2, 0),
	},
}));

export default function EditFaq({
	openFaqManager,
	editFaq,
	saveEdit,
	handleClose,
}) {
	const classes = useStyles();
	const [maxWidth, setMaxWidth] = React.useState('md');
	const [faQues, setfaQues] = useState('');
	const [faAns, setfaAns] = useState('');

	useEffect(() => {
		setfaQues(editFaq.question);
		setfaAns(editFaq.awnser);
	}, [editFaq]);

	const handleSubmit = () => {
		let faq = {
			question: faQues,
			awnser: faAns,
		};
		if (!faQues || !faAns) {
			toast.error("Empty fileds can't be added");
		} else {
			saveEdit(faq);
			resetState();
		}
	};
	const resetState = () => {
		setfaQues('');
		setfaAns('');
	};

	return (
		<div className={classes.root}>
			<Dialog
				fullWidth={true}
				maxWidth={maxWidth}
				open={openFaqManager}
				onClose={handleClose}
				aria-labelledby='max-width-dialog-title'
			>
				{/* <DialogTitle id='max-width-dialog-title'>
					Add Each Topic with highlights
				</DialogTitle> */}
				<DialogContent className={classes.textField}>
					<TextField
						label='Question'
						fullWidth={true}
						multiline
						rowsMax={2}
						value={faQues}
						onChange={(e) => setfaQues(e.target.value)}
					/>
					<TextField
						label='Answer'
						fullWidth={true}
						multiline
						rowsMax={2}
						value={faAns}
						onChange={(e) => setfaAns(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant='contained' color='secondary'>
						Exit
					</Button>
					<Button onClick={handleSubmit} variant='contained' color='primary'>
						Edit FAQ's
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
