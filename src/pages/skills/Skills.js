import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from '@material-ui/core/colors';
import {
	deleteCourse,
	getSkillDemoParticipants,
	getSkillParticipants,
	getSkills,
} from '../../actions/skillsAction';
import CourseForm from './CourseForm';
import SkillsParticipants from './SkillsParticipants';
import { Visibility } from '@material-ui/icons';
import ParticipantsTable from '../../components/ParticipantsTable';

export default function Skills() {
	const dispatch = useDispatch();
	const { allSkills, allParticipantDemoSkills, allParticipantSkills, loading } =
		useSelector((state) => state.skills);

	const [open, setopen] = useState(false);
	const [openParticipants, setopenParticipants] = useState(false);
	const [openDemoParticipants, setopenDemoParticipants] = useState(false);

	const [show, setshow] = useState(false);
	const handleClickFn = () => {
		setopen(true);
	};
	const handleClose = () => {
		dispatch({
			type: 'RESET_SELECTED_SKILL',
		});

		setTimeout(() => {
			dispatch(getSkills());
			setopen(false);
			setshow(false);
		}, 300);
	};
	useEffect(() => {
		dispatch(getSkills());
	}, [dispatch]);
	const editSkill = (skills) => {
		setopen(true);
		// setshow(true);
		dispatch({
			type: 'EDIT_SKILLS',
			payload: skills,
		});
	};
	// const deleteSkill = (id) => {
	// 	// TODO delete Competition
	// 	console.log(id);
	// };
	const handleShowParticipants = (skillId) => {
		console.log(skillId);
		setopenParticipants(true);
		dispatch(getSkillParticipants(skillId));
	};
	const handleDemoShowParticipants = (skillId) => {
		console.log(skillId);

		setopenDemoParticipants(true);
		dispatch(getSkillDemoParticipants(skillId));
	};
	return (
		<>
			<ParticipantsTable
				data={allParticipantSkills}
				loading={loading}
				titleName='SKILLS PARTICIPANTS'
				open={openParticipants}
				handleClose={() => setopenParticipants(false)}
			/>
			<ParticipantsTable
				data={allParticipantDemoSkills}
				loading={loading}
				titleName='SKILLS DEMO PARTICIPANTS'
				open={openDemoParticipants}
				handleClose={() => setopenDemoParticipants(false)}
			/>
			{/* <SkillsParticipants
				data={allParticipantSkills}
				loading={loading}
				titleName='SKILLS PARTICIPANTS'
				open={openParticipants}
				handleClose={() => setopenParticipants(false)}
			/>
			<SkillsParticipants
				data={allParticipantDemoSkills}
				loading={loading}
				titleName='SKILLS DEMO PARTICIPANTS'
				open={openDemoParticipants}
				handleClose={() => setopenDemoParticipants(false)}
			/> */}
			<PageTitle
				title={`COURSES`}
				button={'Add COURSE'}
				handleClick={handleClickFn}
			/>
			{/* <AddInstructor open={open} handleClose={handleClose} />
			<EditInstructor open={show} handleClose={handleClose} /> */}
			<CourseForm open={open} handleClose={handleClose} />
			{/* <CreateCourse open={open} handleClose={handleClose} />
			<EditCourse open={show} handleClose={handleClose} /> */}
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MaterialTable
						columns={[
							{ title: 'Name', field: 'name' },
							{ title: 'Category', field: 'category' },
							{ title: 'Type', field: 'type' },
							{ title: 'Course Duration', field: 'durationInDays' },
							{ title: 'Starts', field: 'startDate', type: 'date' },
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
							{
								title: 'Demo Participants',
								render: (rowData) => (
									<IconButton aria-label='show'>
										<Visibility
											onClick={() => handleDemoShowParticipants(rowData._id)}
											style={{ cursor: 'pointer' }}
										/>
									</IconButton>
								),
							},
						]}
						actions={[
							{
								icon: 'edit',
								tooltip: 'Edit Skill',
								onClick: (event, rowData) => editSkill(rowData),
							},
							// {
							// 	icon: 'delete',
							// 	tooltip: 'Delete Skill',
							// 	onClick: (event, rowData) => {
							// 		dispatch(deleteCourse(rowData._id));
							// 	},
							// },
						]}
						editable={{
							onRowDelete: (oldData) => {
								return new Promise((resolve) => {
									dispatch(deleteCourse(oldData._id));
									resolve();
								});
							},
						}}
						data={allSkills}
						title='COURSES LIST'
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
