import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { toast } from 'react-toastify';
import {
	FormControl,
	Input,
	InputAdornment,
	InputLabel,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		boxShadow: theme.shadows[3],
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
}));

export default function TextFieldManager({ addField, addLabel }) {
	const classes = useStyles();
	const [state, setstate] = useState('');
	const handlestate = () => {
		if (!state) {
			//   TODO toast that empty state cannot be added
			toast.error('Empty fields canot be added');
		} else {
			addField(state);
			resetState();
		}
	};
	const resetState = () => {
		setstate('');
	};
	return (
		<>
			<FormControl fullWidth={true}>
				<InputLabel htmlFor='standard-adornment-state'>{addLabel}</InputLabel>
				<Input
					id='standard-adornment-state'
					value={state}
					multiline
					rowsMax={4}
					onChange={(e) => setstate(e.target.value)}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton onClick={(e) => handlestate()}>
								<AddCircleIcon color='primary' />
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
		</>
	);
}
