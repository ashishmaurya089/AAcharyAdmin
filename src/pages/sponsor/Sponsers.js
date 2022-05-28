import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Typography, Button } from '../../components/Wrappers/Wrappers';
import useStyles from '../levels/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { green, red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
	deleteSponsor,
	updateSponsor,
	addSponsor,
	getAllSponsors,
} from '../../actions/eventAction';
export default function Sponsers() {
	var classes = useStyles();
	const dispatch = useDispatch();
	const { sponsors, loading, allSponsors } = useSelector(
		(state) => state.eventSegments
	);
	const history = useHistory();
	const [count, setCount] = useState(0);
	const redirectTo = (path) => {
		history.push(path);
	};

	useEffect(() => {
		console.log('getSponsors');
		dispatch(getAllSponsors());
	}, []);

	return (
		<>
			<PageTitle title='SPONSERS' />

			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						data={allSponsors}
						title='SPONSERS LIST'
						isLoading={loading}
						columns={[
							{ title: 'Name', field: 'name' },
							{ title: 'Logo', field: 'logo' },
							{ title: 'Description', field: 'description' },
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
								console.log('newData ->', newData, 'oldData ->', oldData);
								return new Promise((resolve) => {
									dispatch(updateSponsor(newData));
									setCount(count + 1);
									resolve();
								});
							},
							onRowDelete: (oldData) => {
								console.log('oldData ->', oldData);
								return new Promise((resolve) => {
									dispatch(deleteSponsor(oldData._id));
									setCount(count + 1);
									resolve();
								});
							},
							onRowAdd: (newData) => {
								console.log('newData ->', newData);
								return new Promise((resolve) => {
									dispatch(addSponsor(newData));
									setCount(count + 1);
									resolve();
								});
							},
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
}
