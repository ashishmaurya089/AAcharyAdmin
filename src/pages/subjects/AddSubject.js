import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
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
	clearSubjects,
	selectSegment,
	deleteSubject,
	editSubject,
	getSegments,
} from '../../actions/subjectActions';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
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
	// margin: {
	// 	margin: theme.spacing(1),
	// 	width: '100%',
	// },
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
}));
export default function AddSubject() {
	const dispatch = useDispatch();
	const classes = useStyles();

	const {
		selectedSegmentId,
		segments,
		levels,
		selectedLevelId,
		streams,
		selectedStreamId,
		categories,
		selectedCategoryId,
		loading,
		subjects,
	} = useSelector((state) => state.tuitionSegments);
	const [newsubName, setnewsubName] = useState('');
	const [newsubDesc, setnewsubDesc] = useState('');
	const [streamId, setstreamId] = useState(selectedStreamId);
	const [count, setCount] = useState(0);
	const [selectedCategoryDetails, setselectedCategoryDetails] = useState({});
	const addSub = () => {
		dispatch(
			addSubject({
				name: newsubName,
				level: selectedLevelId,
				description: newsubDesc,
				stream: selectedStreamId,
				category: selectedCategoryId === '' ? null : selectedCategoryId,
				hasCategory: selectedCategoryId === '' ? false : true,
			})
		);
		resetForm();
		// dispatch(clearSubjects());
	};
	const buttonClassname = clsx({
		[classes.buttonSuccess]: loading,
	});
	const resetForm = () => {
		setnewsubName('');
		setnewsubDesc('');
	};
	useEffect(() => {
		console.log('getting getSegments');
		dispatch(getSegments());
		return () => {};
	}, []);
	useEffect(() => {
		dispatch(getLevels(selectedSegmentId));
		dispatch(getSubjects(selectedSegmentId));
		return () => {};
	}, [selectedSegmentId]);
	useEffect(() => {
		console.log('getting streams');
		dispatch(getStreams(selectedLevelId));
		dispatch(getSubjects(selectedSegmentId, selectedLevelId));
		return () => {};
	}, [selectedLevelId]);
	useEffect(() => {
		console.log('getting categories');
		if (selectedStreamId !== '') {
			dispatch(getCategories(selectedStreamId));
			dispatch(
				getSubjects(selectedSegmentId, selectedLevelId, selectedStreamId)
			);
		}
		return () => {};
	}, [selectedStreamId]);

	useEffect(() => {
		let selectedCategoryDetails = categories.filter(
			(cat) => cat._id === selectedCategoryId
		);
		if (selectedCategoryDetails.length > 0) {
			setselectedCategoryDetails(selectedCategoryDetails[0]);
		}

		return () => {};
	}, [selectedCategoryId]);

	const getSegmentOptions = () => {
		return (
			<FormControl className={classes.margin} fullWidth={true}>
				<Select
					margin='normal'
					value={selectedSegmentId}
					onChange={(e) => {
						dispatch(selectSegment(e.target.value));
					}}
					input={<BootstrapInput />}
				>
					<MenuItem value=''>
						<em>Select Segment</em>
					</MenuItem>
					{segments.map((segment) => (
						<MenuItem value={segment._id} key={segment._id}>
							{segment.name}
						</MenuItem>
					))}
				</Select>
				<FormHelperText id='component-helper-text'>
					Select the Segment for the Subject
				</FormHelperText>
			</FormControl>
		);
	};
	const getLevelOptions = () => {
		return (
			<FormControl className={classes.margin} fullWidth={true}>
				<Select
					value={selectedLevelId}
					fullWidth
					onChange={(e) => {
						dispatch(selectLevel(e.target.value));
					}}
					input={<BootstrapInput />}
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
				<FormHelperText id='component-helper-text'>
					Select the Level for the Subject
				</FormHelperText>
			</FormControl>
		);
	};
	const getStreamOptions = () => {
		return (
			<FormControl className={classes.margin} fullWidth={true}>
				<Select
					value={selectedStreamId}
					fullWidth
					onChange={(e) => {
						dispatch(selectStream(e.target.value));
					}}
					input={<BootstrapInput />}
				>
					<MenuItem value=''>
						<em>Select Stream</em>
					</MenuItem>
					{streams.map((stream) => (
						<MenuItem value={stream._id} key={stream._id}>
							{stream.name}
						</MenuItem>
					))}
				</Select>
				<FormHelperText id='component-helper-text'>
					Select the Stream for the Subject
				</FormHelperText>
			</FormControl>
		);
	};
	const getCatOptions = () => {
		return (
			<FormControl className={classes.margin} fullWidth={true}>
				<Select
					value={selectedCategoryId}
					fullWidth={true}
					onChange={(e) => dispatch(selectCategory(e.target.value))}
					input={<BootstrapInput />}
				>
					<MenuItem value=''>
						<em>Select Category</em>
					</MenuItem>
					{categories.map((cat) => (
						<MenuItem value={cat._id} key={cat._id}>
							{cat.name}
						</MenuItem>
					))}
				</Select>
				<FormHelperText id='component-helper-text'>
					Select the Category for the Subject
				</FormHelperText>
			</FormControl>
		);
	};
	return (
		<>
			<Container maxWidth='sm'>
				<Grid container direction='row' justify='center' alignItems='center'>
					{getSegmentOptions()}
					{getLevelOptions()}
					{getStreamOptions()}
					{getCatOptions()}
					{/* <TextField
						id='standard-helperText'
						label='Subject Name'
						margin='normal'
						value={newsubName}
						fullWidth
						onChange={(e) => setnewsubName(e.target.value)}
						variant='outlined'
					/>
					<TextField
						id='standard-helperText'
						label='Subject Description'
						value={newsubDesc}
						margin='normal'
						fullWidth
						onChange={(e) => setnewsubDesc(e.target.value)}
						variant='outlined'
					/>
					<Button
						variant='contained'
						color='primary'
						className={buttonClassname}
						disabled={loading}
						onClick={addSub}
					>
						Add Subject
					</Button> */}
					{/* {loading && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)} */}
				</Grid>
			</Container>
			{/* {selectedCategoryDetails.name !== undefined && ( */}
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<MaterialTable
						data={subjects}
						title={
							selectedCategoryDetails.name !== undefined
								? `Existing Subjects in ${selectedCategoryDetails.name}`
								: 'Existing Subjects'
						}
						isLoading={loading}
						columns={[
							{ title: 'Name', field: 'name' },
							{ title: 'Description', field: 'description' },
							// { title: 'Icon', field: 'icon' },
							// { title: 'Tags', field: ['tags'] },
							// { title: 'Banner', field: 'banner' },
							// {
							// 	title: 'Page Count',
							// 	field: 'providersCount',
							// 	type: 'numeric',
							// },
							// {
							// 	title: 'Category',
							// 	field: 'hasCategory',
							// 	type: 'boolean',
							// 	render: (rowData) =>
							// 		rowData.hasCategory ? (
							// 			<CheckCircleIcon style={{ color: green[500] }} />
							// 		) : (
							// 			<CancelIcon style={{ color: red[500] }} />
							// 		),
							// },
						]}
						options={{
							actionsColumnIndex: -1,
							headerStyle: {
								backgroundColor: '#000',
								color: '#FFF',
							},
						}}
						editable={{
							onRowUpdate: (newData, oldData) => {
								console.log('newData->', newData, 'oldData->', oldData);
								return new Promise((resolve) => {
									dispatch(editSubject(newData));
									setCount(count + 1);
									resolve();
								});
							},
							onRowDelete: (oldData) => {
								return new Promise((resolve) => {
									dispatch(deleteSubject(oldData._id));
									setCount(count + 1);
									resolve();
								});
							},
							onRowAdd: (newData) => {
								console.log('newData->', newData);
								if (selectedSegmentId) {
									newData.segment = selectedSegmentId;
								}
								if (selectedLevelId) {
									newData.level = selectedLevelId;
								}
								if (selectedStreamId) {
									newData.stream = selectedStreamId;
								}
								if (selectedCategoryId) {
									newData.category = selectedCategoryId;
								}
								return new Promise((resolve) => {
									console.log('newData->', newData);
									if (!selectedSegmentId) {
										toast.error('Please select the segment');
									} else if (!selectedLevelId) {
										toast.error('Please select the Level');
									} else if (!selectedStreamId) {
										toast.error('Please select the Stream');
									} else {
										dispatch(addSubject(newData));
									}
									setCount(count + 1);
									resolve();
								});
							},
						}}
					/>
				</Grid>
			</Grid>
			{/* )} */}
		</>
	);
}
