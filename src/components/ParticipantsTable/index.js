import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MaterialTable from 'material-table';
import PageTitle from '../PageTitle/PageTitle';
import { Message } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import MsgManager from '../SendMsg/MsgManager';
import ParticipantDetails from './ParticipantDetails';

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

export default function ParticipantsTable({
	data,
	loading,
	titleName,
	open,
	handleClose,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [openMsg, setopenMsg] = useState(false);

	console.log('ParticipantsData', data);

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
							// 	field: 'name',
							// 	render: (rowData) => rowData.userId && rowData.userId.name,
							// },
							// {
							// 	title: 'Phone Number',
							// 	field: 'phoneNumber',
							// 	type: 'numeric',
							// 	render: (rowData) => (
							// 		<>
							// 			{rowData.userId && rowData.userId.countryCode}{' '}
							// 			{rowData.userId && rowData.userId.phoneNumber}
							// 		</>
							// 	),
							// },
							// {
							// 	title: 'Email',
							// 	field: 'email',
							// 	render: (rowData) => rowData.userId && rowData.userId.email,
							// },
							{
								title: 'Premium Level',
								field: 'premiumType',
								render: (rowData) => (
									<p style={{ textTransform: 'capitalize' }}>
										{rowData.userId && rowData.userId.premiumType}
									</p>
								),
							},
						]}
						actions={[
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
