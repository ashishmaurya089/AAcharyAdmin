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
	addStream,
	getCategories,
	getSubjects,
	selectCategory,
	selectStream,
	addSubject,
	selectLevel,
	clearSubjects,
	editStream,
	deleteStream,
	selectSegment,
	getSegments,
} from '../../actions/subjectActions';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MaterialTable from 'material-table';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
export default function AddStream() {
	const dispatch = useDispatch();
	const classes = useStyles();

	const {
		levels,
		selectedLevelId,
		loading,
		streams,
		selectedSegmentId,
		segments,
	} = useSelector((state) => state.tuitionSegments);
	const [newStreamName, setnewStreamName] = useState('');
	const [newStreamDesc, setnewStreamDesc] = useState('');
	const [hasCategories, sethasCategories] = useState(true);
	const [count, setCount] = useState(0);

	const [selectedLevelDetails, setselectedLevelDetails] = useState({});
	const sendAddStream = () => {
		// TODO: From redux segment id and nesting
		dispatch(
			addStream({
				name: newStreamName,
				description: newStreamDesc,
				hasCategory: hasCategories,
				level: selectedLevelId,
				// segment: 'Segments',
				// hasNesting: 'boolean',
				// nestingKey: 'Categories',
			})
		);
		resetForm();
		// dispatch(clearSubjects());
	};
	const buttonClassname = clsx({
		[classes.buttonSuccess]: loading,
	});
	const resetForm = () => {
		setnewStreamName('');
		setnewStreamDesc('');
		sethasCategories(true);
	};
	useEffect(() => {
		console.log('getSegments');
		dispatch(getSegments());
		return () => {};
	}, []);
	useEffect(() => {
		dispatch(getLevels(selectedSegmentId));
		return () => {};
	}, [selectedSegmentId]);
	useEffect(() => {
		let selectedLevelDetails = levels.filter(
			(levl) => levl._id === selectedLevelId
		);
		if (selectedLevelDetails.length > 0) {
			setselectedLevelDetails(selectedLevelDetails[0]);
		}
		return () => {};
	}, [selectedLevelId]);

	useEffect(() => {
		console.log('getting streams based in level ID', selectedLevelId);
		dispatch(getStreams(selectedLevelId));
		return () => {};
	}, [selectedLevelId]);
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
			<FormControl fullWidth={true}>
				<Select
					value={selectedLevelId}
					margin='normal'
					onChange={(e) => {
						dispatch(selectLevel(e.target.value));
					}}
					input={<BootstrapInput />}
				>
					<MenuItem value=''>
						<em>Select Level</em>
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

	return (
		<>
			<Container maxWidth='sm'>
				<Grid container direction='row' justify='center' alignItems='center'>
					{getSegmentOptions()}
					{getLevelOptions()}
					{/* <TextField
						id='standard-helperText'
						label='Stream Name'
						helperText='Create a New Stream'
						value={newStreamName}
						fullWidth={true}
						margin='normal'
						onChange={(e) => setnewStreamName(e.target.value)}
						variant='outlined'
					/>
					<TextField
						id='standard-helperText'
						label='Stream Description'
						helperText='Description for the New Stream'
						value={newStreamDesc}
						fullWidth={true}
						margin='normal'
						onChange={(e) => setnewStreamDesc(e.target.value)}
						variant='outlined'
					/>
					<FormControlLabel
						control={
							<Switch
								fullWidth={true}
								checked={hasCategories}
								onChange={(event) => sethasCategories(event.target.checked)}
							/>
						}
						label={hasCategories ? 'Has Categories' : 'Has no Categories'}
					/>
					<Button
						variant='contained'
						color='primary'
						className={buttonClassname}
						disabled={loading}
						onClick={sendAddStream}
					>
						Add Stream
					</Button> */}
					{/* {loading && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)} */}
				</Grid>
			</Container>

			{selectedLevelDetails.name !== undefined && (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<MaterialTable
							data={streams}
							title={
								selectedLevelDetails.name !== undefined
									? `Existing Streams in ${selectedLevelDetails.name}`
									: 'Streams List'
							}
							isLoading={loading}
							columns={[
								{ title: 'Name', field: 'name' },
								{ title: 'Description', field: 'description' },
								{ title: 'Prefix', field: 'prefix' },
								{
									title: 'Has Categories',
									field: 'hasCategory',
									type: 'boolean',
									render: (rowData) =>
										rowData.hasCategory ? (
											<CheckCircleIcon style={{ color: green[500] }} />
										) : (
											<CancelIcon style={{ color: red[500] }} />
										),
								},
								// {
								// 	title: 'Has Nesting',
								// 	field: 'hasNesting',
								// 	type: 'boolean',
								// 	render: (rowData) =>
								// 		rowData.hasNesting ? (
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
										dispatch(editStream(newData));
										setCount(count + 1);
										resolve();
									});
								},
								onRowDelete: (oldData) => {
									return new Promise((resolve) => {
										dispatch(deleteStream(oldData._id));
										setCount(count + 1);
										resolve();
									});
								},
								onRowAdd: (newData) => {
									console.log('newData->', newData);
									if (newData.hasNesting !== true) {
										newData.hasNesting = false;
									}
									newData.level = selectedLevelId;
									newData.segment = selectedSegmentId;
									return new Promise((resolve) => {
										if (selectedLevelDetails.hasNesting) {
											dispatch(addStream(newData));
										}
										setCount(count + 1);
										resolve();
									});
								},
							}}
						/>
					</Grid>
				</Grid>
			)}
		</>
	);
}
