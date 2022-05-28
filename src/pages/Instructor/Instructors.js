import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../components/PageTitle/PageTitle';
import useStyles from '../levels/styles';
import MaterialTable from 'material-table';

import {
	createInstructor,
	deleteInstructor,
	getAllInstructors,
	updateInstructor,
} from '../../actions/skillsAction';

export default function Instructors() {
	var classes = useStyles();
	const dispatch = useDispatch();
	const { allInstructors, loading } = useSelector((state) => state.skills);
	const [count, setCount] = useState(0);

	useEffect(() => {
		dispatch(getAllInstructors());
	}, []);

	return (
		<>
			<PageTitle title='INSTRUCTOR' />
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						data={allInstructors}
						title='INSTRUCTORS LIST'
						isLoading={loading}
						columns={[
							{ title: 'Name', field: 'name' },
							{ title: 'Qualification', field: 'qualification' },
							{ title: 'Designation', field: 'designation' },
							{ title: 'Company Name', field: 'companyName' },
							{ title: 'Total Experience', field: 'totalExperience' },
							{ title: 'Domain Experience', field: 'domainExperience' },
							{ title: 'Skills', field: 'skills' },
							{ title: 'Projects', field: 'projects' },
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
								let {
									name,
									qualification,
									designation,
									companyName,
									totalExperience,
									domainExperience,
									skills,
									projects,
									_id,
								} = newData;
								// let skill = skills.toString().split(',').join('\n');
								let skill = skills
									.toString()
									.split(',')
									.map((skill) => ' ' + skill.trim());
								let project = projects
									.toString()
									.split(',')
									.map((pro) => ' ' + pro.trim());
								return new Promise((resolve) => {
									dispatch(
										updateInstructor(
											name,
											qualification,
											designation,
											companyName,
											totalExperience,
											domainExperience,
											skill,
											project,
											_id
										)
									);
									setCount(count + 1);
									resolve();
								});
							},
							onRowDelete: (oldData) => {
								console.log('oldData ->', oldData);
								return new Promise((resolve) => {
									dispatch(deleteInstructor(oldData._id));
									setCount(count + 1);
									resolve();
								});
							},
							onRowAdd: (newData) => {
								console.log('newData ->', newData);
								let {
									name,
									qualification,
									designation,
									companyName,
									totalExperience,
									domainExperience,
									skills,
									projects,
								} = newData;
								let skill = skills
									.split(',')
									.map((skill) => ' ' + skill.trim());
								let project = projects
									.split(',')
									.map((project) => ' ' + project.trim());
								return new Promise((resolve) => {
									dispatch(
										createInstructor(
											name,
											qualification,
											designation,
											companyName,
											totalExperience,
											domainExperience,
											skill,
											project
										)
									);
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
