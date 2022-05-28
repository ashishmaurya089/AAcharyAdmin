import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import {
	getLevels,
	getStreams,
	getCategories,
	getSubjects,
	selectCategory,
	selectStream,
	addSubject,
	selectLevel,
} from '../../actions/subjectActions';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(1),
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
		width: '90%',
	},
}));
export default function SubjectAddForm({ open, handleFormClose }) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const handleClose = () => {
		handleFormClose();
	};
	const {
		levels,
		selectedLevelId,
		streams,
		selectedStreamId,
		categories,
		selectedCategoryId,
	} = useSelector((state) => state.tuitionSegments);
	const [newsubName, setnewsubName] = useState('');
	const [streamId, setstreamId] = useState(selectedStreamId);
	const addSub = () => {
		dispatch(
			addSubject({
				name: newsubName,
				level: selectedLevelId,
				stream: selectedStreamId,
				category: selectedCategoryId === '' ? null : selectedCategoryId,
				hasCategory: selectedCategoryId === '' ? false : true,
			})
		);
	};

	useEffect(() => {
		dispatch(getLevels());
		return () => {};
	}, []);
	useEffect(() => {
		console.log('getting streams');
		dispatch(getStreams(selectedLevelId));
		return () => {};
	}, [selectedLevelId]);
	useEffect(() => {
		console.log('getting categories');
		dispatch(getCategories(selectedStreamId));
		return () => {};
	}, [selectedStreamId]);

	useEffect(() => {
		console.log('getting subjects based on categories');
		dispatch(getSubjects(selectedCategoryId, 'category'));
		return () => {};
	}, [selectedCategoryId]);

	useEffect(() => {
		console.log('getting subjects based on stream instead of categories');
		dispatch(getSubjects(selectedStreamId, 'stream'));
		return () => {};
	}, [selectedCategoryId]);

	const getLevelOptions = () => {
		return (
			<FormControl className={classes.margin}>
				<InputLabel id='demo-customized-select-label'>stream</InputLabel>
				<Select
					value={selectedLevelId}
					fullWidth
					onChange={(e) => {
						dispatch(selectLevel(e.target.value));
					}}
					input={<InputBase />}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{levels.map((level) => (
						<MenuItem value={level._id} key={level._id}>
							{level.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};
	const getStreamOptions = () => {
		return (
			<FormControl className={classes.margin}>
				<InputLabel id='demo-customized-select-label'>stream</InputLabel>
				<Select
					value={selectedStreamId}
					fullWidth
					onChange={(e) => {
						dispatch(selectStream(e.target.value));
					}}
					input={<InputBase />}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{streams.map((stream) => (
						<MenuItem value={stream._id} key={stream._id}>
							{stream.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};
	const getCatOptions = () => {
		return (
			<FormControl className={classes.margin}>
				<InputLabel id='demo-customized-select-label'>category</InputLabel>
				<Select
					value={selectedCategoryId}
					fullWidth={true}
					onChange={(e) => dispatch(selectCategory(e.target.value))}
					input={<BootstrapInput />}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{categories.map((cat) => (
						<MenuItem value={cat._id} key={cat._id}>
							{cat.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>Add Subject</DialogTitle>
				<DialogContent>
					{getLevelOptions()}
					{getStreamOptions()}
					{getCatOptions()}
					<TextField
						id='standard-helperText'
						label='Subject Name'
						helperText='Create a New subject'
						value={newsubName}
						onChange={(e) => setnewsubName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Close
					</Button>
					<Button onClick={addSub} color='primary'>
						Add Subject
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
