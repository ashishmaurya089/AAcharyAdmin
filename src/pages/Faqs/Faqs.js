import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Typography, Button } from '../../components/Wrappers/Wrappers';
import useStyles from '../levels/styles';
import { green, red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
	createInstructor,
	deleteInstructor,
	getAllInstructors,
	updateInstructor,
} from '../../actions/skillsAction';
import {
	createFaq,
	deleteFaq,
	getFaqs,
	updateFaq,
} from '../../actions/commonActions';

export default function Faqs() {
	var classes = useStyles();
	const dispatch = useDispatch();
	const { faqs, loading } = useSelector((state) => state.commonData);
	const [count, setCount] = useState(0);

	useEffect(() => {
		dispatch(getFaqs());
	}, []);

	return (
		<>
			<PageTitle title="FAQ'S" />
			<Grid container spacing={4}>
				<p>Type of FAQ can be : "tutor", "user" or "event"</p>
				<Grid item xs={12}>
					<MaterialTable
						data={faqs}
						title="FAQ's LIST"
						isLoading={loading}
						columns={[
							{ title: 'Question', field: 'question' },
							{ title: 'Answer', field: 'answer' },
							{ title: 'Type', field: 'type' },
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
									dispatch(updateFaq(newData));
									setCount(count + 1);
									resolve();
								});
							},
							onRowDelete: (oldData) => {
								return new Promise((resolve) => {
									dispatch(deleteFaq(oldData._id));
									setCount(count + 1);
									resolve();
								});
							},
							onRowAdd: (newData) => {
								return new Promise((resolve) => {
									dispatch(createFaq(newData));
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
