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
	addCategory,
	getCategories,
	getSubjects,
	selectCategory,
	selectStream,
	addSubject,
	selectLevel,
	clearSubjects,
	addLevel,
	editLevel,
	deleteLevel,
	getSegments,
	selectSegment,
} from '../../actions/subjectActions';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import TableComponent from '../../components/Tables/TableComponent';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import Stack from '@material-ui/core/Stack';

import axios from '../../axios';

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

export default function AddLevel() {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { segments, selectedSegmentId, levels, selectedLevelId, loading } =
		useSelector((state) => state.tuitionSegments);

	const [newLevlName, setnewLevlName] = useState('');
	const [newLevlDesc, setnewLevlDesc] = useState('');
	const [LevlIcon, setLevlIcon] = useState('');
	const [LevlHasNesting, setLevlHasNesting] = useState(false);
	const [count, setCount] = useState(0);

	const [selectedSegmentDetails, setselectedSegmentDetails] = useState({});

	const addLevl = () => {
		if (selectedSegmentDetails.hasNesting) {
			dispatch(
				addLevel({
					name: newLevlName,
					level: selectedLevelId,
					segment: selectedSegmentId,
					icon: LevlIcon,
					description: newLevlDesc,
					hasNesting: LevlHasNesting,
					nestingKey: 'Stream',
				})
			);
		} else {
			toast.error('This Level cannot accept Streams');
		}

		resetForm();
		// dispatch(clearSubjects());
	};
	const buttonClassname = clsx({
		[classes.buttonSuccess]: loading,
	});
	const resetForm = () => {
		setnewLevlName('');
		setnewLevlDesc('');
	};

	useEffect(() => {
		console.log('getSegments');
		dispatch(getSegments());
		return () => { };
	}, []);
	// useEffect(() => {
	// 	dispatch(getLevels(selectedSegmentId));
	// 	return () => {};
	// }, [selectedSegmentId]);
	// useEffect(() => {
	// 	console.log('getting streams');
	// 	dispatch(getStreams(selectedLevelId));
	// 	return () => {};
	// }, [selectedLevelId]);
	useEffect(() => {
		dispatch(getLevels(selectedSegmentId));
		let selectedSegmentDetails = segments.filter(
			(seg) => seg._id === selectedSegmentId
		);
		if (selectedSegmentDetails.length > 0) {
			setselectedSegmentDetails(selectedSegmentDetails[0]);
		}

		return () => { };
	}, [selectedSegmentId]);

	// useEffect(() => {
	// 	console.log('getting subjects based on categories');
	// 	dispatch(getSubjects(selectedCategoryId, 'category'));
	// 	return () => {};
	// }, [selectedCategoryId]);

	// useEffect(() => {
	// 	console.log('getting subjects based on stream instead of categories');
	// 	dispatch(getSubjects(selectedStreamId, 'stream'));
	// 	return () => {};
	// }, [selectedStreamId]);

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
	// const getLevelOptions = () => {
	// 	return (
	// 		<FormControl className={classes.margin} fullWidth={true}>
	// 			<Select
	// 				margin='normal'
	// 				value={selectedLevelId}
	// 				onChange={(e) => {
	// 					dispatch(selectLevel(e.target.value));
	// 				}}
	// 				input={<BootstrapInput />}
	// 			>
	// 				<MenuItem value=''>
	// 					<em>None</em>
	// 				</MenuItem>
	// 				{levels.map((level) => (
	// 					<MenuItem value={level._id} key={level._id}>
	// 						{level.name}
	// 					</MenuItem>
	// 				))}
	// 			</Select>
	// 			<FormHelperText id='component-helper-text'>
	// 				Select the Level for the Subject
	// 			</FormHelperText>
	// 		</FormControl>
	// 	);
	// };

	const uploadFile = async (event, rowData) => {
		const uploadedFile = event.target.files[0];
		console.log(uploadedFile);
		const formData = new FormData();
		formData.append('file', uploadedFile);
		console.log(formData);

		const { data } = await axios.post(`api/upload/banners`, formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
		rowData.icon = data.url;
		console.log('rowData', rowData);

		dispatch(editLevel(rowData));
	};

	return (
		<>
			<Container maxWidth='sm'>
				<Grid container direction='row' justify='center' alignItems='center'>
					{getSegmentOptions()}
					{/* {getLevelOptions()} */}

					{/* <TextField
						id='standard-helperText'
						label='Category Name'
						helperText='Create a New Category'
						value={newLevlName}
						margin='normal'
						disabled={selectedSegmentDetails.name === undefined}
						fullWidth={true}
						onChange={(e) => setnewLevlName(e.target.value)}
						variant='outlined'
					/>
					<TextField
						id='standard-helperText'
						label='Category Description'
						helperText='Description for the New Category'
						value={newLevlDesc}
						margin='normal'
						disabled={selectedSegmentDetails.name === undefined}
						fullWidth={true}
						onChange={(e) => setnewLevlDesc(e.target.value)}
						variant='outlined'
					/>
					<Button
						variant='contained'
						color='primary'
						className={buttonClassname}
						disabled={loading}
						onClick={addLevl}
					>
						Add Level
					</Button> */}
					{/* {loading && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)} */}
				</Grid>
			</Container>

			{selectedSegmentDetails.name !== undefined && (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<MaterialTable
							data={levels}
							title={`Existing Levels in ${selectedSegmentDetails.name}`}
							isLoading={loading}
							columns={[
								{ title: 'Name', field: 'name' },
								{ title: 'Description', field: 'description' },
								{
									title: 'Icon',
									field: 'icon',
								},
								{
									title: 'Has Streams',
									field: 'hasNesting',
									type: 'boolean',
									render: (rowData) =>
										rowData.hasNesting ? (
											<CheckCircleIcon style={{ color: green[500] }} />
										) : (
											<CancelIcon style={{ color: red[500] }} />
										),
								},
							]}
							actions={[
								(rowData) => ({
									icon: () => (
										<>
											<input
												name='file'
												accept='image/*'
												style={{ display: 'none' }}
												onChange={(event) => uploadFile(event, rowData)}
												id={rowData._id}
												type='file'
											/>
											<label htmlFor={rowData._id}>
												<IconButton
													color='primary'
													aria-label='upload picture'
													component='span'
												>
													<PhotoCamera />
												</IconButton>
											</label>
										</>
									),
									tooltip: 'Change Icon',
								}),
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
										dispatch(editLevel(newData));
										setCount(count + 1);
										resolve();
									});
								},
								onRowDelete: (oldData) => {
									return new Promise((resolve) => {
										dispatch(deleteLevel(oldData._id));
										setCount(count + 1);
										resolve();
									});
								},
								onRowAdd: (newData) => {
									if (newData.hasNesting !== true) {
										newData.hasNesting = false;
									}
									newData.segment = selectedSegmentId;
									return new Promise((resolve) => {
										if (selectedSegmentDetails.hasNesting) {
											console.log('newData->', newData);
											dispatch(addLevel(newData));
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
