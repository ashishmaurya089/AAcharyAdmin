import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import LoginIcon from '@material-ui/icons/Input'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Check as CheckIcon } from '@material-ui/icons';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MessageIcon from '@material-ui/icons/Message';
import DeleteIcon from '@material-ui/icons/DeleteForever';
// components
import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import { useDispatch, useSelector } from 'react-redux';
// data
import SubjectChip from '../../components/SubjectChip/index';
import TutorDetail from './TutorDetail';
import { approveProvider, getAllTutors, deleteUser } from '../../actions/userActions';
import EditManager from '../../components/Editor/EditManager';
import MsgManager from '../../components/SendMsg/MsgManager';
import { useHistory } from "react-router-dom";

export default function Users() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { tutors, loading, totalTutors } = useSelector((state) => state.usersData);
	const [open, setopen] = useState(false);
	const [openMsg, setopenMsg] = useState(false);
	const [counter, setcounter] = useState(0)
	const [page, setpage] = useState(0)
	const [perPage, setperPage] = useState(5)
	const [approved, setapproved] = useState(false);


	useEffect(() => {
		dispatch(getAllTutors(page, perPage));
	}, [page, perPage]);
	const approve = (id) => {
		console.log(id);
	};
	const selectTutor = (tutor) => {
		console.log(tutor);
		setopen(true);
		dispatch({
			type: 'SELECTED_TUTOR',
			payload: tutor,
		});
	};
	const resetSelectedTutor = () => {
		dispatch({
			type: 'RESET_SELECTED_TUTOR',
		});
	};
	const deleteAUser = (rowData) => {
		dispatch(deleteUser(rowData.userId._id));
		setcounter(counter + 1)
	};
	const handleClose = () => {
		setopen(false);
		resetSelectedTutor();
	};
	const sendMessage = (rowData) => {
		// Storing selected rowData for sendNotification
		dispatch({
			type: 'SELECTED_USER_DATA',
			payload: rowData,
		});
		setopenMsg(true);
	};

	const approveTutor = (id, val) => {
		dispatch(approveProvider(id, !val));
	};


	const loginUser = (event ,rowData) => {
		if(rowData && rowData.userId && rowData.userId._id){
			const win = window.open("/tutor?userid="+rowData.userId._id+"&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", "_blank");
			win.focus();		
		}
	
	};
	// const setinitialfields = (data) => {
	// 	setapproved(data.approved);
	// };

	// useEffect(() => {
	// 	if (tutors && tutors._id) {
	// 		setinitialfields(tutors);
	// 	}
	// }, [tutors]);
	return (
		<>
			<MsgManager openMsg={openMsg} setopenMsg={setopenMsg} />
			<PageTitle title='TUTORS' />
			<TutorDetail open={open} handleClose={handleClose} />
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						columns={[
							{
								title: 'Name',
								field: 'name',
								render: (rowData) => rowData.name,
							},
							{
								title: 'Phone',
								field: 'phoneNumber',
								type: 'numeric',
								render: (rowData) =>
									rowData.userId && rowData.userId.phoneNumber,
							},
							{
								title: 'isComplete',
								field: 'degreeProofs',
								render: (rowData) =>
									rowData.degreeProofs?.length > 0 ? (
										<CheckCircleIcon style={{ color: green[500] }} />
									) : (
										<CancelIcon style={{ color: red[500] }} />
									),
							},
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
								title: 'No of Subjects',
								field: 'subjects',
								render: (rowData) => {
									return rowData.subjects.length;
								},
							},	
						]}

						data={tutors}
						page={page}
						totalCount={totalTutors}
						title='TUTORS LIST'
						isLoading={loading}
						onChangePage={(pg) => {
							console.log(pg)
							setpage(pg)
						}}
						onChangeRowsPerPage={(num) => setperPage(num)}
						actions={[
							{
								icon: () => <LoginIcon color="secondary" 		
									style={{ color: green[500], cursor: 'pointer' }} />,
								tooltip: 'Login User',
								onClick: (event, rowData) => loginUser( event,rowData),
							},
							(rowData) => ({
								icon: () =>
									rowData.approved === true ? (
										<CancelIcon style={{ color: red[500] }} />
									) : (
										<CheckCircleIcon style={{ color: green[500] }} />
									),
								tooltip: rowData.approved === true ? 'Disapprove' : 'Approve',
								onClick: (event, rowData) => {
									approveTutor(rowData._id, rowData.approved);
								},
							}),						
							{
								icon: () => <VisibilityIcon />,
								tooltip: 'View User',
								onClick: (event, rowData) => selectTutor(rowData),
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
							},
						]}
						options={{
							pageSizeOptions: [5, 10, 20, 50, 100, 200],
							pageSize: perPage,
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
