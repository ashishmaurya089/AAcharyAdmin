import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Check as CheckIcon } from '@material-ui/icons';
import MessageIcon from '@material-ui/icons/Message';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/DeleteForever';
// components
import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import MsgManager from '../../components/SendMsg/MsgManager';

import { useDispatch, useSelector } from 'react-redux';
// data

import {
	approveProvider,
	getAllCoachingInstitutes,
	deleteUser
} from '../../actions/userActions';
import InstituteDetail from './instituteDetail';

export default function Institutions() {
	const dispatch = useDispatch();
	const { coachingInstitutes, loading } = useSelector(
		(state) => state.usersData
	);
	const [open, setopen] = useState(false);
	const [openMsg, setopenMsg] = useState(false);
	const [counter, setcounter] = useState(0)

	useEffect(() => {
		dispatch(getAllCoachingInstitutes());
	}, [counter]);

	const selectInstitute = (institiute) => {
		console.log(institiute);
		dispatch({
			type: 'SELECTED_INSTITUTE',
			payload: institiute,
		});
		setTimeout(() => {
			setopen(true);
		}, 500);
	};
	const resetSelectedInst = () => {
		dispatch({
			type: 'RESET_SELECTED_INSTITUTE',
		});
	};
	const deleteAUser = (rowData) => {
		dispatch(deleteUser(rowData.userId._id));
		setcounter(counter + 1)
	};
	const handleClose = () => {
		setopen(false);
		resetSelectedInst();
	};
	const sendMessage = (rowData) => {
		// Storing selected rowData for sendNotification
		dispatch({
			type: 'SELECTED_USER_DATA',
			payload: rowData,
		});
		setopenMsg(true);
	};
	const approveInstute = (id, val) => {
		dispatch(approveProvider(id, !val));
	};
	return (
		<>
			<MsgManager openMsg={openMsg} setopenMsg={setopenMsg} />
			<PageTitle title='COACHING INSTITUTES' />
			<InstituteDetail open={open} handleClose={handleClose} />
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						columns={[
							{ title: 'Name', field: 'instituteName' },
							{
								title: 'Approved',
								field: 'approved',
								render: (rowData) =>
									rowData.approved ? (
										<CheckCircleIcon style={{ color: green[500] }} />
									) : (
										<CancelIcon style={{ color: red[500] }} />
									),
							},
							{
								title: 'Phone',
								field: 'instituteContactNumber',
							},
							{ title: 'Head', field: 'instituteHeadName' },
							{ title: 'WebSite', field: 'instituteWebsite' },
						]}
						data={coachingInstitutes}
						title='INSTITUTES LIST'
						isLoading={loading}
						actions={[
							(rowData) => ({
								icon: () =>
									rowData.approved === true ? (
										<CancelIcon style={{ color: red[500] }} />
									) : (
										<CheckCircleIcon style={{ color: green[500] }} />
									),
								tooltip: rowData.approved === true ? 'Disapprove' : 'Approve',
								onClick: (event, rowData) => {
									approveInstute(rowData._id, rowData.approved);
								},
							}),
							{
								icon: () => <VisibilityIcon />,
								tooltip: 'View User',
								onClick: (event, rowData) => selectInstitute(rowData),
								// TODO - redirect to ind tutor page , redux select tutor
							},
							{
								icon: () => <DeleteIcon />,
								tooltip: 'Delete User',
								onClick: (event, rowData) => deleteAUser(rowData),
							},
							{
								icon: () => <MessageIcon />,
								tooltip: 'Send Message',
								onClick: (event, rowData) => sendMessage(rowData),
								// TODO - redirect to ind tutor page , redux select tutor
							},
						]}
						options={{
							pageSizeOptions: [5, 10, 20, 50, 100],
							actionsColumnIndex: -1,
							headerStyle: {
								backgroundColor: '#000',
								color: '#FFF',
							},
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
}

//   if (instituteName) updateInstitute.instituteName = instituteName;
//   if (instituteHeadName)
//     updateInstitute.instituteHeadName = instituteHeadName;
//   if (instituteWebsite) updateInstitute.instituteWebsite = instituteWebsite;
//   if (instituteEmail) updateInstitute.instituteEmail = instituteEmail;
//   if (instituteContactNumber)
//     updateInstitute.instituteContactNumber = instituteContactNumber;
//   if (instituteRegistrationType)
//     updateInstitute.instituteRegistrationType = instituteRegistrationType;
//   if (instituteLogo) updateInstitute.instituteLogo = instituteLogo;
//   if (instituteBackdrop)
//     updateInstitute.instituteBackdrop = instituteBackdrop;
//   if (instituteTeachingPreferences)
//     updateInstitute.instituteTeachingPreferences =
//       instituteTeachingPreferences;
//   if (communicationAddress)
//     updateInstitute.communicationAddress = communicationAddress;
//   if (instituteOpenOn) updateInstitute.instituteOpenOn = instituteOpenOn;
//   if (availability) updateInstitute.availability = availability;
//   if (requestedLevels) updateInstitute.requestedLevels = requestedLevels;

// approved: true
// availability: ["9:00AM - 10:00AM"]
// avgRatePerHr: 0
// avgRatePerMonth: 0
// avgRating: 0
// communicationAddress: "H.No 3-8-137, Chandrapuri colony, L.B.Nagar, Hyderabad"
// degreeProofs: []
// incognito: false
// instituteBackdrop: "https://image.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg"
// instituteContactNumber: "7032160008"
// instituteEmail: "praneeth@techpranee.com"
// instituteHeadName: "Praneeth Mohan"
// instituteLogo: "https://techpranee.com/assets/img/techpranee_logo.png"
// instituteName: "Tech Pranee LLP - 1"
// instituteOpenOn: (7) ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
// instituteTeachingPreferences: 5
// instituteWebsite: "https://techpranee.com"
// location: {type: "Point", coordinates: Array(2)}
// monthly: false
// oneToMany: false
// oneToOne: false
// permittedLevels: ["605b33b11f6ea3186fb2510b"]
// providerType: "institute"
// rating: []
// requestedLevels: ["605b33b11f6ea3186fb2510b"]
// shortTerm: false
// subjects: []
// tableData: {id: 0}
// userId: {location: {…}, isAdmin: false, isTutor: false, isCoachingCenter: true, isCollege: false, …}
// workIdentity: ""
// __v: 0
// _id: "60c9f547d9663f8b79913e3b"
