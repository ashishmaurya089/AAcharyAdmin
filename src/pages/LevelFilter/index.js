import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import useStyles from '../levels/styles';
import { green, red } from '@material-ui/core/colors';
import { Typography, Button } from '../../components/Wrappers/Wrappers';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
	addLevelFilter,
	deleteLevelFilter,
	getLevelFilter,
	updateLevelFilter,
} from '../../actions/levelFilterActions';

export default function LevelFilter() {
	var classes = useStyles();
	const dispatch = useDispatch();

	const { filterlevels, loading } = useSelector((state) => state.filterlevels);
	const [count, setCount] = useState(0);

	useEffect(() => {
		dispatch(getLevelFilter());
	});
	return (
		<>
			<PageTitle title='LEVEL FILTER FOR SKILLS & WORKSHOP' />
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						data={filterlevels}
						title='LEVEL FILTER'
						isLoading={loading}
						columns={[{ title: 'Name', field: 'name' }]}
						options={{
							actionsColumnIndex: -1,
							headerStyle: {
								backgroundColor: '#000',
								color: '#FFF',
							},
						}}
						editable={{
							onRowUpdate: (newData, oldData) => {
								return new Promise((resolve) => {
									dispatch(updateLevelFilter(newData));
									setCount(count + 1);
									resolve();
								});
							},
							onRowDelete: (oldData) => {
								return new Promise((resolve) => {
									dispatch(deleteLevelFilter(oldData._id));
									setCount(count + 1);
									resolve();
								});
							},
							onRowAdd: (newData) => {
								return new Promise((resolve) => {
									dispatch(addLevelFilter(newData));
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
