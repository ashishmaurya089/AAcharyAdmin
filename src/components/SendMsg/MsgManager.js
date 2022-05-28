import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { sendNotification } from '../../actions/commonActions';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '60%',
	},
}));

export default function MsgManager({ openMsg, setopenMsg }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { selectedUser } = useSelector((state) => state.commonData);
	const [title, settitle] = useState('');
	const [message, setmessage] = useState('');
	console.log('selectedUser', selectedUser);
	const handleSend = () => {
		if (selectedUser.userId) {
			dispatch(
				sendNotification({
					userId: selectedUser.userId._id,
					title: title,
					message: message,
				})
			);
		}
		setTimeout(() => {
			setopenMsg(false);
		}, 300);
	};
	return (
		<>
			<Dialog
				open={openMsg}
				onClose={() => setopenMsg(false)}
				fullWidth={true}
				maxWidth='md'
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Send a Message to{' '}
					{selectedUser && selectedUser.userId && selectedUser.userId.name}
				</DialogTitle>
				<DialogContent>
					<TextField
						label='Title'
						fullWidth={true}
						value={title}
						onChange={(e) => settitle(e.target.value)}
					/>
					<TextField
						label='Enter the message'
						fullWidth={true}
						value={message}
						multiline
						rowsMax={4}
						onChange={(e) => setmessage(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSend}
						color='secondary'
						variant='contained'
						autoFocus
					>
						Send
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
