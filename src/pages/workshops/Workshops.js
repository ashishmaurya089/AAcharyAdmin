import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';

import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from '@material-ui/core/colors';
import {
	deleteWorkshop,
	getWorkshopParticipants,
	getWorkshops,
} from '../../actions/workshopAction';
// import CreateWorkshop from './CreateWorkshop';
// import EditWorkshop from './EditWorkshop';
import WorkshopForm from './WorkshopForm';
import { Visibility } from '@material-ui/icons';
import WorkshopsParticipants from './WorkshopsParticipants';
import ParticipantsTable from '../../components/ParticipantsTable';

export default function Workshops() {
	const dispatch = useDispatch();
	const { allWorkshops, allWorkshopParticipants, loading } = useSelector(
		(state) => state.workshop
	);
	const [open, setopen] = useState(false);
	const [openParticipants, setopenParticipants] = useState(false);
	const [show, setshow] = useState(false);
	const handleClickFn = () => {
		console.log('open a modal for Skills Creation');
		setopen(true);
	};
	const handleClose = () => {
		dispatch({
			type: 'RESET_SELECTED_WORKSHOP',
		});

		setTimeout(() => {
			dispatch(getWorkshops());
			setopen(false);
			setshow(false);
		}, 300);
	};
	useEffect(() => {
		dispatch(getWorkshops());
	}, [dispatch]);

	const editWorkshop = (workshop) => {
		console.log(workshop._id);
		setopen(true);
		// setshow(true);
		dispatch({
			type: 'EDIT_WORKSHOPS',
			payload: workshop,
		});
	};
	// const deleteWorkshop = (id) => {
	// 	// TODO delete Competition
	// 	console.log(id);
	// };

	// useEffect(() => {}, [allWorkshops]);

	const handleShowParticipants = (workshopId) => {
		console.log(workshopId);
		setopenParticipants(true);
		dispatch(getWorkshopParticipants(workshopId));
	};
	return (
		<>
			<ParticipantsTable
				data={allWorkshopParticipants}
				loading={loading}
				titleName='WORKSHOP PARTICIPANTS'
				open={openParticipants}
				handleClose={() => setopenParticipants(false)}
			/>
			{/* <WorkshopsParticipants
				data={allWorkshopParticipants}
				loading={loading}
				titleName='WORKSHOP PARTICIPANTS'
				open={openParticipants}
				handleClose={() => setopenParticipants(false)}
			/> */}
			<PageTitle
				title={`WORKSHOPS`}
				button={'Add WORKSHOP'}
				handleClick={handleClickFn}
			/>
			<WorkshopForm open={open} handleClose={handleClose} />
			{/* <CreateWorkshop open={open} handleClose={handleClose} /> */}
			{/* <EditWorkshop open={show} handleClose={handleClose} /> */}
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						columns={[
							{ title: 'Name', field: 'name' },
							{ title: 'Type', field: 'type' },
							{ title: 'Venue', field: 'venue' },
							{ title: 'Starts', field: 'startDate', type: 'date' },
							{ title: 'Ends', field: 'endDate', type: 'date' },
							{
								title: 'Price',
								field: 'price',
								render: (rowData) => (
									<p>
										{rowData.price} {rowData.currency}
									</p>
								),
							},
							{
								title: 'Live',
								field: 'isActive',
								render: (rowData) =>
									rowData.isActive ? (
										<CheckCircleIcon style={{ color: green[500] }} />
									) : (
										<CancelIcon style={{ color: red[500] }} />
									),
							},
							{
								title: 'Participants',
								render: (rowData) => (
									<IconButton aria-label='show'>
										<Visibility
											onClick={() => handleShowParticipants(rowData._id)}
											style={{ cursor: 'pointer' }}
										/>
									</IconButton>
								),
							},
						]}
						actions={[
							{
								icon: 'edit',
								tooltip: 'Edit Workshop',
								onClick: (event, rowData) => editWorkshop(rowData),
							},
							// {
							// 	icon: 'delete',
							// 	tooltip: 'Delete Workshop',
							// 	onClick: (event, rowData) => {
							// 		dispatch(deleteWorkshop(rowData._id));
							// 	},
							// },
						]}
						editable={{
							onRowDelete: (oldData) => {
								return new Promise((resolve) => {
									dispatch(deleteWorkshop(oldData._id));
									resolve();
								});
							},
						}}
						data={allWorkshops}
						title='WORKSHOPS LIST'
						isLoading={loading}
						options={{
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
