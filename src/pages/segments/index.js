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
	addSegement,
	deleteSegment,
	editSegment,
	getSegments,
} from '../../actions/subjectActions';
export default function Levels() {
	var classes = useStyles();
	const dispatch = useDispatch();
	const { levels, loading, segments } = useSelector(
		(state) => state.tuitionSegments
	);
	const history = useHistory();
	const [count, setCount] = useState(0);
	const redirectTo = (path) => {
		history.push(path);
	};

	useEffect(() => {
		dispatch(getSegments());
	}, []);

	return (
		<>
			<PageTitle title='Segments' />
			<Grid container spacing={4}>
				{/* <Grid item xs>
					<Button
						color={'secondary'}
						size='small'
						className='px-2'
						variant='contained'
						onClick={() => redirectTo('/app/addSegement')}
					>
						Add new Segment
					</Button>
				</Grid> */}
				<Grid item xs>
					<Button
						color={'secondary'}
						size='small'
						// className='px-2'
						variant='contained'
						onClick={() => redirectTo('/app/addLevel')}
					>
						Level
					</Button>
				</Grid>
				<Grid item xs>
					<Button
						color={'warning'}
						size='small'
						// className='px-2'
						variant='contained'
						onClick={() => redirectTo('/app/addStream')}
					>
						Stream
					</Button>
				</Grid>
				<Grid item xs>
					<Button
						color={'success'}
						size='small'
						// className='px-2'
						variant='contained'
						onClick={() => redirectTo('/app/addCat')}
					>
						Category
					</Button>
				</Grid>
				<Grid item xs>
					<Button
						color={'primary'}
						size='small'
						// className='px-2'
						variant='contained'
						onClick={() => redirectTo('/app/addSub')}
					>
						Subject
					</Button>
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						data={segments}
						title='SEGMENTS LIST'
						isLoading={loading}
						columns={[
							{ title: 'Name', field: 'name' },
							{ title: 'Description', field: 'description' },
							{ title: 'Icon', field: 'icon' },

							{
								title: 'Delivered By Institute',
								field: 'deliveredByInstitute',
								type: 'boolean',
								render: (rowData) =>
									rowData.deliveredByInstitute ? (
										<CheckCircleIcon style={{ color: green[500] }} />
									) : (
										<CancelIcon style={{ color: red[500] }} />
									),
							},
							{
								title: 'Has Levels',
								field: 'hasNesting',
								type: 'boolean',
								render: (rowData) =>
									rowData.hasNesting ? (
										<CheckCircleIcon style={{ color: green[500] }} />
									) : (
										<CancelIcon style={{ color: red[500] }} />
									),
							},
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
								return new Promise((resolve) => {
									dispatch(editSegment(newData));
									setCount(count + 1);
									resolve();
								});
							},
							onRowDelete: (oldData) => {
								return new Promise((resolve) => {
									dispatch(deleteSegment(oldData._id));
									setCount(count + 1);
									resolve();
								});
							},
							onRowAdd: (newData) => {
								if (newData.deliveredByInstitute !== true) {
									newData.deliveredByInstitute = false;
								}
								if (newData.hasNesting !== true) {
									newData.hasNesting = false;
								}
								return new Promise((resolve) => {
									dispatch(addSegement(newData));
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
