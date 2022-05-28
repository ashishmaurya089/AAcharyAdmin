import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';
import BigStat from '../levels/components/BigStat/BigStat';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from '@material-ui/core/colors';
import Widget from '../../components/Widget/Widget';
import { Typography, Button } from '../../components/Wrappers/Wrappers';
import { useHistory } from 'react-router-dom';
import CreateEvent from './competition/CreateEvent';
import {
	deleteEvent,
	getCompetitions,
	getCompetitionsParticipants,
} from '../../actions/eventAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditEvent from './competition/CreateEvent';
import { Visibility } from '@material-ui/icons';
import CompetitionParticipants from './CompetitionParticipants';
export default function Levels() {
	const dispatch = useDispatch();
	const { allCompetitions, allCompetitionsParticipants, loading } = useSelector(
		(state) => state.eventSegments
	);

	const [open, setopen] = useState(false);
	const [openParticipants, setopenParticipants] = useState(false);

	const history = useHistory();

	const redirectTo = (path) => {
		history.push(path);
	};
	const createNewCompetition = () => {
		//   Open modal for creation of new Event
		setopen(true);
	};

	useEffect(() => {
		dispatch(getCompetitions());
	}, []);

	const selectCompetition = (competition) => {
		setopen(true);
		dispatch({
			type: 'SELECT_COMPETITIONS',
			payload: competition,
		});
	};
	const deleteCompetition = (id) => {
		// TODO delete Competition
		dispatch({
			type: 'DELETE_COMPETITIONS',
			payload: id,
		});
	};
	const resetSelectedCompetition = () => {
		dispatch({
			type: 'RESET_SELECTED_COMPETITION',
		});
	};
	const handleShowParticipants = (eventId) => {
		console.log(eventId);
		setopenParticipants(true);
		dispatch(getCompetitionsParticipants(eventId));
	};
	return (
		<>
			<CompetitionParticipants
				data={allCompetitionsParticipants}
				loading={loading}
				titleName='COMPETITION PARTICIPANTS'
				open={openParticipants}
				handleClose={() => setopenParticipants(false)}
			/>
			<PageTitle
				title={`Competitions`}
				button={'Add COMPETITION'}
				handleClick={createNewCompetition}
			/>
			<CreateEvent
				open={open}
				handleClose={() => {
					setopen(false);
					resetSelectedCompetition();
				}}
			/>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						columns={[
							{ title: 'Name', field: 'name' },
							{
								title: 'Registration Starts',
								field: 'registrationStartDate',
								type: 'date',
							},
							{
								title: 'Registration Closes',
								field: 'registrationEndDate',
								type: 'date',
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
								tooltip: 'Edit Competition',
								onClick: (event, rowData) => selectCompetition(rowData),
							},
							// {
							// 	icon: 'delete',
							// 	tooltip: 'Delete Competition',
							// 	onClick: (event, rowData) => {
							// 		dispatch(deleteEvent(rowData._id));
							// 	},
							// },
						]}
						editable={{
							onRowDelete: (oldData) => {
								return new Promise((resolve) => {
									dispatch(deleteEvent(oldData._id));
									resolve();
								});
							},
						}}
						data={allCompetitions}
						title='COMPETITIONS LIST'
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
