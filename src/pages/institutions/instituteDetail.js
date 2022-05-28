import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import MailIcon from '@material-ui/icons/Mail';
import { green, red } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
	Card,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	MenuItem,
	TextField,
	Container
} from '@material-ui/core';
import { addPermittedLevels, approveProvider } from '../../actions/userActions';
import { getLevels, getSegments } from '../../actions/subjectActions';
import Switch from '@material-ui/core/Switch';
import { Call as CallIcon } from '@material-ui/icons';
import { Language as WebsiteIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},
	instHero: {
		position: 'relative',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
	logo: {
		borderRadius: 5,
		width: 150,
	},
	table: {
		maxWidth: 550,
	},
	marg: {
		marginTop: 20,
		marginBottom: 20
	},
	chips: {
		'& > *': {
			marginRight: theme.spacing(0.5),
			marginBottom: theme.spacing(0.5),
		},
	},
	tableRowSplit: {
		overflow: 'hidden',
		overflowY: 'scroll',
		height: 'auto',
		maxHeight: 300,
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
	backdrop: {
		backgroundColor: "rgba(0,0,0,.3)",
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
	viewImage: {
		borderRadius: 10,
		maxHeight: "90%",
		maxWidth: "50%",
	},
	// tableRowSplit: {
	// 	width: '100%',
	// 	'box-shadow': '10px 10px 5px 0px rgba(237,233,233,0.75)',
	// 	borderRadius: 5,
	// 	'-webkit-column-count': 2,
	// 	'-moz-column-count': 2,
	// 	'column-count': 2,
	// },
	gridLayout: {
		width: 'auto !important',
		margin: '0 !important',
	},
	progressBar: {
		display: 'flex',
		margin: '40px auto',
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function InstituteDetail({ open, handleClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [approved, setapproved] = useState(false);
	const [permittedLevels, setpermittedLevels] = useState([]);
	const [prePermittedLevels, setprePermittedLevels] = useState([]);

	const [selectedSegment, setselectedSegment] = useState('');
	const { selectedInstitute, loading } = useSelector(
		(state) => state.usersData
	);
	const { segments } = useSelector((state) => state.tuitionSegments);

	console.log('selectedInstitute', selectedInstitute);
	const handleSave = () => {
		if (permittedLevels) {
			dispatch(addPermittedLevels(selectedInstitute._id, permittedLevels));
		}
		// if (approved) {
		// 	console.log('Already Approved');
		// } else {
		// 	dispatch(approveProvider(selectedInstitute._id, approved));
		// }

		setTimeout(() => {
			handleClose();
		}, 300);
	};
	useEffect(() => {
		dispatch(getSegments());
	}, []);
	useEffect(() => {
		if (selectedInstitute && selectedInstitute._id) {
			setapproved(selectedInstitute.approved);
			setpermittedLevels(selectedInstitute.permittedLevels);

			let prePermittedLevels =
				selectedInstitute.permittedLevels &&
				selectedInstitute.permittedLevels.map((pl) => {
					return pl._id;
				});
			setprePermittedLevels(prePermittedLevels);
		}
	}, [selectedInstitute]);

	console.log('permittedLevels', permittedLevels);
	console.log('prePermittedLevels', prePermittedLevels);


	useEffect(() => {
		if (selectedSegment) {
			dispatch(getLevels(selectedSegment));
		}
	}, [selectedSegment]);

	const approveData = (approveData) => {
		setapproved(approveData);
	};
	const approvedLevels = (approvedLevels) => {
		setpermittedLevels(approvedLevels);
		setprePermittedLevels(approvedLevels);
	};
	const handleCloseDialogue = () => {
		dispatch({
			type: 'RESET_APPROVELEVELS_INSTITUTE',
		});
		handleClose();
	};

	const getSegNameFronId = (segId) => {
		let seg = segments.filter((e) => e._id === segId)

		console.log(segments.length, segId, seg);
		return seg[0]?.name
	}
	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={() => handleCloseDialogue()}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							{selectedInstitute && selectedInstitute.instituteName}
						</Typography>
						<Button
							autoFocus
							color='secondary'
							variant='contained'
							onClick={handleSave}
						>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<Container maxWidth="md">
					<Hero inst={selectedInstitute} />
					<Grid container spacing={1} className={classes.gridLayout}>
						<Grid item md={12}>
							<PreferenceTable inst={selectedInstitute} />
						</Grid>
					</Grid>
					<hr />
					<Grid container spacing={2} className={classes.gridLayout}>
						<Typography component="h4" variant="h5" gutterBottom>
							Requested Segments : By Institute
						</Typography>
						<div >
							{selectedInstitute?.requestedLevels?.length > 0 && selectedInstitute?.requestedLevels.map((segId) => {
								if (segId) {
									return <Chip label={getSegNameFronId(segId)} style={{ margin: 5 }} key={segId} />
								}
							}
							)}
						</div>
					</Grid>
					<hr />
					<Grid container spacing={2} className={classes.gridLayout}>
						<Typography component="h4" variant="h5" gutterBottom>
							Permitted Levels : By Admin
						</Typography>
						<div >
							{permittedLevels.map((lvl) => (
								<Chip label={lvl.name} style={{ margin: 5 }} key={lvl._id} />
							)

							)}
						</div>
					</Grid>
					<hr />
					<Grid container spacing={2} className={classes.gridLayout}>
						<Grid item md={6}>
							<Typography component="h4" variant="h5" gutterBottom>
								Add/Remove Permitted Levels
							</Typography>
							<Card style={{ padding: 10 }}>
								<LevelsList
									loading={loading}
									selectedSegState={selectedSegment}
									setselectedSegState={setselectedSegment}
									segments={segments}
									inst={selectedInstitute}
									permittedLevels={permittedLevels}
									approvedLevels={approvedLevels}
									prePermittedLevels={prePermittedLevels}
								/>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Dialog>
		</div>
	);
}

export function Hero({ inst }) {
	const classes = useStyles();
	// Converting communicationAddress JSON to parse
	if (inst.communicationAddress) {
		var address = JSON.parse(inst.communicationAddress);
	}
	return (
		<Paper
			className={classes.mainFeaturedPost}
			style={{ backgroundImage: `url(${inst.instituteBackdrop})` }}
		>
			{/* Increase the priority of the hero background image */}
			{
				<img
					style={{ display: 'none' }}
					src={inst.instituteBackdrop}
					alt={inst.instituteName}
				/>
			}
			<div className={classes.overlay} />
			<Grid container direction='row' justifyContent="center" alignItems='center'>
				<Grid item md={8}>
					<div className={classes.instHero}>
						<Typography
							component='h1'
							variant='h3'
							color='inherit'
							gutterBottom
						>
							{inst.instituteName}
						</Typography>
						<Typography variant='subtitle2' color='inherit' paragraph>
							{inst.communicationAddress && (
								<>
									{address.Address}, {address.Locality}, {address.City},
									{address.State}, {address.Country}
								</>
							)}
						</Typography>

						<Typography variant='h5' color='inherit' display='block'>
							Institute Head: {inst.userId && inst.userId.surname}{' '}
							{inst.instituteHeadName}
						</Typography>

						{inst.userId && (
							<div className={classes.chips}>
								<Chip
									label={inst.instituteEmail}
									color='primary'
									variant='default'
									icon={<MailIcon />}
								/>
								<Chip
									label={`${inst.userId.countryCode} ${inst.instituteContactNumber}`}
									color='primary'
									variant='default'
									icon={<CallIcon />}
								/>
								{inst.instituteWebsite !== "" && (
									<Chip
										label={`${inst.instituteWebsite}`}
										color='primary'
										variant='default'
										icon={<WebsiteIcon />}
										component='a'
										href={inst.instituteWebsite}
										target='_blank'
										clickable
									/>
								)}

							</div>
						)}
					</div>
				</Grid>
				{/* <Grid item md={4}></Grid> */}
				<Grid item md={4}>
					<img
						className={classes.logo}
						width={50}
						src={inst.instituteLogo}
						alt={inst.instituteName}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
}



export function PreferenceTable({ inst }) {
	const classes = useStyles();

	return (
		<TableContainer className={classes.table} component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Preferences</TableCell>
						<TableCell align='right'>Settings</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell component='th' scope='row'>
							Firm registration type :
						</TableCell>
						<TableCell align='right'>
							{inst.instituteRegistrationType}
						</TableCell>
					</TableRow>


					<TableRow>
						<TableCell component='th' scope='row'>
							Offered at Coaching Center
						</TableCell>
						<TableCell align='right'>
							{(inst.instituteTeachingPreferences + "").includes(5) ? (
								<DoneIcon style={{ color: green[500] }} />
							) : (
								<CancelIcon style={{ color: red[500] }} />
							)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component='th' scope='row'>
							Offeres Online
						</TableCell>
						<TableCell align='right'>
							{(inst.instituteTeachingPreferences + "").includes(6) ? (
								<DoneIcon style={{ color: green[500] }} />
							) : (
								<CancelIcon style={{ color: red[500] }} />
							)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component='th' scope='row'>
							Availability Timings
						</TableCell>
						<TableCell align='right'>
							{inst.availability &&
								inst.availability.map((e, i) => <Chip label={e} variant='outlined' key={`${i}-availability`} />)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component='th' scope='row'>
							Open On
						</TableCell>
						<TableCell align='right'>
							{inst.instituteOpenOn &&
								inst.instituteOpenOn.map((e, i) => (
									<Chip label={e} variant='outlined' key={`${i}-opens`} />
								))}	</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export function LevelsList({
	loading,
	selectedSegState,
	setselectedSegState,
	segments,
	inst,
	permittedLevels,
	approvedLevels,
	prePermittedLevels,
}) {
	const classes = useStyles();
	const { levels } = useSelector((state) => state.tuitionSegments);

	const handleToggle = (value) => () => {
		const currentIndex = prePermittedLevels.indexOf(value);
		const newprePermittedLevels = [...prePermittedLevels];
		if (currentIndex === -1) {
			newprePermittedLevels.push(value);
		} else {
			newprePermittedLevels.splice(currentIndex, 1);
		}
		approvedLevels(newprePermittedLevels);

		//
		// const currentIndex = permittedLevels.indexOf(value);
		// const newpermittedLevels = [...permittedLevels];
		// if (currentIndex === -1) {
		// 	newpermittedLevels.push(value);
		// } else {
		// 	newpermittedLevels.splice(currentIndex, 1);
		// }
		// approvedLevels(newpermittedLevels);
	};

	return (
		<>
			<TextField
				select
				fullWidth={true}
				label='Select Segment'
				value={selectedSegState}
				onChange={(e) => setselectedSegState(e.target.value)}
				helperText='Please select Segment'
			>
				{segments.map((option, i) => (
					<MenuItem key={option._id} value={option._id}>
						{option.name}
					</MenuItem>
				))}
			</TextField>
			{levels && levels.length > 0 ? (
				<>
					<Typography variant='h6' gutterBottom>
						Approve Levels
					</Typography>
					<Card>
						<List
							// subheader={
							// 	<ListSubheader disableSticky={true}>Approve Levels</ListSubheader>
							// }
							className={classes.tableRowSplit}
						>
							{levels.map((levl) => (
								<ListItem
									key={levl._id}
									role={undefined}
									dense
									button
									onClick={handleToggle(levl._id)}
								>
									<ListItemIcon>
										<Checkbox
											edge='start'
											checked={prePermittedLevels.indexOf(levl._id) > -1}
											// checked={prePermittedLevels.indexOf(levl._id) > -1}
											tabIndex={-1}
											disableRipple
											inputProps={{ 'aria-labelledby': levl }}
										/>
									</ListItemIcon>
									<ListItemText id={levl._id} primary={levl.name} />
									{/* <ListItemSecondaryAction>
							<IconButton edge='end' aria-label='comments'>
								<CommentIcon />
							</IconButton>
						</ListItemSecondaryAction> */}
								</ListItem>
							))}
						</List>
					</Card>
				</>
			) : loading ? (
				<CircularProgress color='secondary' className={classes.progressBar} />
			) : (
				<p>Please select a segment to edit approved levels</p>
			)}
		</>
	);
}
