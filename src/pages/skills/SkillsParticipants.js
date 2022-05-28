// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';
// import MaterialTable from 'material-table';
// import PageTitle from '../../components/PageTitle/PageTitle';

// const useStyles = makeStyles((theme) => ({
// 	appBar: {
// 		position: 'relative',
// 	},
// 	title: {
// 		marginLeft: theme.spacing(2),
// 		flex: 1,
// 	},
// 	table: {
// 		padding: theme.spacing(5),
// 	},
// }));

// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction='up' ref={ref} {...props} />;
// });

// export default function SkillsParticipants({
// 	titleName,
// 	data,
// 	loading,
// 	open,
// 	handleClose,
// }) {
// 	const classes = useStyles();
// 	console.log(data);
// 	return (
// 		<div>
// 			<Dialog
// 				fullScreen
// 				open={open}
// 				onClose={handleClose}
// 				TransitionComponent={Transition}
// 			>
// 				<AppBar className={classes.appBar}>
// 					<Toolbar>
// 						<IconButton
// 							edge='start'
// 							color='inherit'
// 							onClick={handleClose}
// 							aria-label='close'
// 						>
// 							<CloseIcon />
// 						</IconButton>
// 						{/* <Typography variant='h6' className={classes.title}>
// 							Sound
// 						</Typography> */}
// 					</Toolbar>
// 				</AppBar>

// 				<div className={classes.table}>
// 					<PageTitle title={titleName} />
// 					<MaterialTable
// 						columns={[
// 							{
// 								field: 'url',
// 								title: 'Avatar',
// 								render: (rowData) => (
// 									<img
// 										src={rowData.userId.profileImage}
// 										alt={rowData.userId.name}
// 										style={{ width: 50, borderRadius: '50%' }}
// 									/>
// 								),
// 							},
// 							{
// 								title: 'Name',
// 								field: 'name',
// 								render: (rowData) => rowData.userId.name,
// 							},
// 							{
// 								title: 'Phone Number',
// 								field: 'phoneNumber',
// 								type: 'numeric',
// 								render: (rowData) => (
// 									<>
// 										{rowData.userId.countryCode} {rowData.userId.phoneNumber}
// 									</>
// 								),
// 							},
// 							{
// 								title: 'Email',
// 								field: 'email',
// 								render: (rowData) => rowData.userId.email,
// 							},
// 							{
// 								title: 'Premium Level',
// 								field: 'premiumType',
// 								render: (rowData) => (
// 									<p style={{ textTransform: 'capitalize' }}>
// 										{rowData.userId.premiumType}
// 									</p>
// 								),
// 							},
// 						]}
// 						data={data}
// 						title={titleName}
// 						isLoading={loading}
// 						options={{
// 							headerStyle: {
// 								backgroundColor: '#000',
// 								color: '#FFF',
// 							},
// 						}}
// 					/>
// 				</div>
// 			</Dialog>
// 		</div>
// 	);
// }
