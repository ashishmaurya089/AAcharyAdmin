import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MaterialTable from 'material-table';
import { green, red } from '@material-ui/core/colors';

import PageTitle from '../../components/PageTitle/PageTitle';
import {
	ArrowDownward,
	ArrowUpward,
	Cancel,
	CheckCircle,
	Message,
	Visibility,
} from '@material-ui/icons';
import { promoteAParticipant } from '../../actions/eventAction';
import { useDispatch } from 'react-redux';
import MsgManager from '../../components/SendMsg/MsgManager';
import ParticipantDetails from '../../components/ParticipantsTable/ParticipantDetails';
import ParticipantEducation from '../../components/ParticipantsTable/ParticipantEducation';
import PromoteParticipant from '../../components/ParticipantsTable/PromoteParticipant';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	table: {
		padding: theme.spacing(5),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function CompetitionParticipants({
	data,
	loading,
	titleName,
	open,
	handleClose,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [openMsg, setopenMsg] = useState(false);
	const [openPromote, setopenPromote] = useState(false);
	const [selectedRowData, setselectedRowData] = useState(null);

	console.log('ParticipantsData', data);

	const handlePromote = (rowData) => {
		// promoteAParticipant(id, !finalist, winner);
		console.log('comming');
		setselectedRowData(rowData);
		setopenPromote(true);
	};

	const sendMessage = (rowData) => {
		// Storing selected rowData for sendNotification
		dispatch({
			type: 'SELECTED_USER_DATA',
			payload: rowData,
		});
		setopenMsg(true);
	};
	return (
		<>
			<PromoteParticipant
				data={selectedRowData}
				openPromote={openPromote}
				handleClose={() => setopenPromote(false)}
			/>
			<MsgManager openMsg={openMsg} setopenMsg={setopenMsg} />
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
							onClick={handleClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						{/* <Typography variant='h6' className={classes.title}>
							Sound
						</Typography> */}
					</Toolbar>
				</AppBar>

				<div className={classes.table}>
					<PageTitle title={titleName} />
					<MaterialTable
						columns={[
							{
								title: 'Participant',
								render: (rowData) => <ParticipantDetails data={rowData} />,
							},
							{
								title: 'Education',
								render: (rowData) => <ParticipantEducation data={rowData} />,
							},
							// {
							// 	field: 'url',
							// 	title: 'Avatar',
							// 	render: (rowData) => (
							// 		<img
							// 			src={rowData.userId && rowData.userId.profileImage}
							// 			alt={rowData.userId && rowData.userId.name}
							// 			style={{ width: 50, height: 50, borderRadius: '50%' }}
							// 		/>
							// 	),
							// },
							// {
							// 	title: 'Name',
							// 	field: 'participantName',
							// 	render: (rowData) => rowData.participantName,
							// },
							// {
							// 	title: 'Phone Number',
							// 	field: 'participantPhone',
							// 	type: 'numeric',
							// 	render: (rowData) => rowData.participantPhone,
							// },
							// {
							// 	title: 'Email',
							// 	field: 'participantEmail',
							// 	render: (rowData) => rowData.participantEmail,
							// },
							// {
							// 	title: 'Educational Level',
							// 	field: 'educationalLevel',
							// 	render: (rowData) => rowData.educationalLevel,
							// },
							// {
							// 	title: 'Studying',
							// 	field: 'participantStandard',
							// 	render: (rowData) => (
							// 		<p style={{ textTransform: 'capitalize' }}>
							// 			{rowData.participantStandard}
							// 		</p>
							// 	),
							// },
							{
								title: 'Level of Competition',
								field: 'subEventId',
								render: (rowData) => (
									<>{rowData.subEventId && rowData.subEventId.name}</>
								),
							},
							// {
							// 	title: 'Level of Stage',
							// 	field: 'subEventId',
							// 	render: (rowData) => (
							// 		<>{rowData.subEventId && rowData.subEventId.name}</>
							// 	),
							// },
							{
								title: 'Payment Status',
								field: 'participantStandard',
								render: (rowData) =>
									rowData.paymentStatus ? (
										<CheckCircle style={{ color: green[500] }} />
									) : (
										<Cancel style={{ color: red[500] }} />
									),
							},
						]}
						actions={[
							// (rowData) => ({
							// 	icon: () =>
							// 		rowData.finalist === true ? (
							// 			<ArrowDownward style={{ color: red[500] }} />
							// 		) : (
							// 			<ArrowUpward style={{ color: green[500] }} />
							// 		),
							// 	tooltip: rowData.finalist === true ? 'UnPromote' : 'Promote',
							// 	onClick: (event, rowData) => handlePromote(rowData),
							// }),

							{
								icon: () => <ArrowUpward style={{ color: green[500] }} />,
								tooltip: 'Promote',
								onClick: (event, rowData) => handlePromote(rowData),
							},
							{
								icon: () => <Message />,
								tooltip: 'Send Message',
								onClick: (event, rowData) => sendMessage(rowData),
							},
						]}
						data={data}
						title={titleName}
						isLoading={loading}
						options={{
							actionsColumnIndex: -1,
							headerStyle: {
								backgroundColor: '#000',
								color: '#FFF',
							},
							search: true,
						}}
					/>
				</div>
			</Dialog>
		</>
	);
}
