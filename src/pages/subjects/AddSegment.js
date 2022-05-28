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
export default function AddSegment() {
	const dispatch = useDispatch();
	const classes = useStyles();

	const {
		levels,
		selectedLevelId,
		streams,
		selectedStreamId,
		categories,
		selectedCategoryId,
		loading,
	} = useSelector((state) => state.tuitionSegments);
	const [newCatName, setnewCatName] = useState('');
	const [newCatDesc, setnewCatDesc] = useState('');
	const [selectedStreamDetails, setselectedStreamDetails] = useState({});
	const [count, setCount] = useState(0);
	const addcat = () => {
		if (selectedStreamDetails.hasCategory) {
			dispatch(
				addCategory({
					name: newCatName,
					level: selectedLevelId,
					stream: selectedStreamId,
					description: newCatDesc,
				})
			);
		} else {
			toast.error('This Stream cannot accept Categories');
		}

		resetForm();
		// dispatch(clearSubjects());
	};
	const buttonClassname = clsx({
		[classes.buttonSuccess]: loading,
	});
	const resetForm = () => {
		setnewCatName('');
		setnewCatDesc('');
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
		dispatch(getCategories(selectedStreamId));
		let selectedStreamDetails = streams.filter(
			(str) => str._id === selectedStreamId
		);
		if (selectedStreamDetails.length > 0) {
			setselectedStreamDetails(selectedStreamDetails[0]);
		}

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
	}, [selectedStreamId]);
	const getLevelOptions = () => {
		return (
			<FormControl className={classes.margin} fullWidth={true}>
				<Select
					margin='normal'
					value={selectedLevelId}
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
					margin='normal'
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

	return (
		<>
			<Container maxWidth='sm'>
				<Grid container direction='row' justify='center' alignItems='center'>
					{getLevelOptions()}
					{getStreamOptions()}
					<TextField
						id='standard-helperText'
						label='Category Name'
						helperText='Create a New Category'
						value={newCatName}
						margin='normal'
						disabled={selectedStreamDetails.name === undefined}
						fullWidth={true}
						onChange={(e) => setnewCatName(e.target.value)}
						variant='outlined'
					/>
					<TextField
						id='standard-helperText'
						label='Category Description'
						helperText='Description for the New Category'
						value={newCatDesc}
						margin='normal'
						disabled={selectedStreamDetails.name === undefined}
						fullWidth={true}
						onChange={(e) => setnewCatDesc(e.target.value)}
						variant='outlined'
					/>
					<Button
						variant='contained'
						color='primary'
						className={buttonClassname}
						disabled={loading}
						onClick={addcat}
					>
						Add Subject
					</Button>
					{loading && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)}
				</Grid>
			</Container>

			{selectedStreamDetails.name !== undefined && (
				<Grid container spacing={2}>
					{/* <TableComponent
							title={`Existing Categories in ${selectedStreamDetails.name}`}
							data={categories}
							columns={[
								{ title: 'Name', field: 'name' },
								{ title: 'Description', field: 'description', type: 'text' },
							]}
							loading={loading}
						/> */}
					<Grid item xs={12}>
						<MaterialTable
							data={categories}
							title={`Existing Segments in ${selectedStreamDetails.name}`}
							isLoading={loading}
							columns={[
								{ title: 'Name', field: 'name' },
								{ title: 'Description', field: 'description' },
								// { title: 'Type', field: 'type' },
								// { title: 'Starts', field: 'startDate' },
								// { title: 'Ends', field: 'endDate' },
								// 	{
								// 		title: 'Price',
								// 		field: 'price',
								// 		render: (rowData) => (
								// 			<p>
								// 				{rowData.price} {rowData.currency}
								// 			</p>
								// 		),
								// 	},
								{
									title: 'Nesting',
									field: 'hasNesting',
									render: (rowData) =>
										rowData.hasNesting ? (
											<CheckCircleIcon style={{ color: green[500] }} />
										) : (
											<CancelIcon style={{ color: red[500] }} />
										),
								},
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
										// dispatch(updateStage(newData));
										setCount(count + 1);
										resolve();
									});
								},
								onRowDelete: (oldData) => {
									return new Promise((resolve) => {
										// dispatch(deleteSubject(oldData._id));
										// setCount(count + 1);
										resolve();
									});
								},
								onRowAdd: (newData) => {
									console.log('newData->', newData);
									return new Promise((resolve) => {
										// dispatch(
										// 	createStage(
										// 		newData,
										// 		currency,
										// 		currencySymbol,
										// 		subEvent._id
										// 	)
										// );

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
