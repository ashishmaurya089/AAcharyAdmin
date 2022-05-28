import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import {
	Card,
	CardContent,
	CardActions,
	Chip,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	MenuItem,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { createInstructor } from '../../actions/skillsAction';
import TextFieldManager from '../../components/TextFieldManager';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import EditManager from '../../components/Editor/EditManager';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		position: 'relative',
		'& .MuiTextField-root': {
			margin: theme.spacing(2, 'auto'),
		},
		'& .MuiFormControl-root': {
			margin: theme.spacing(2, 'auto'),
		},
		'& Button': {
			margin: theme.spacing(1, 0, 3, 0),
		},
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch',
	},
	paper: {
		background: '#FFFFFF',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	chips: {
		marginRight: theme.spacing(0.5),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddInstructor({ instrModal, closeInstr }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [name, setname] = useState('');
	const [qualification, setqualification] = useState('');
	const [designation, setdesignation] = useState('');
	const [companyName, setcompanyName] = useState('');
	const [totalExperience, settotalExperience] = useState('');
	const [domainExperience, setdomainExperience] = useState('');
	const [skills, setskills] = useState([]);
	const [skill, setskill] = useState('');
	const [projects, setprojects] = useState([]);
	const [project, setproject] = useState('');
	const [editor, openEditor] = useState(false);
	const [editData, setEditData] = useState('');
	const [editType, seteditType] = useState('');
	const [indexInfo, setindexInfo] = useState(0);
	const onClick = (e) => {
		dispatch(
			createInstructor(
				name,
				qualification,
				designation,
				companyName,
				totalExperience,
				domainExperience,
				skills,
				projects
			)
		);
		resetState();
		setTimeout(() => {
			closeInstr();
		}, 200);
	};

	const resetState = () => {
		setname('');
		setqualification('');
		setdesignation('');
		setcompanyName('');
		settotalExperience('');
		setdomainExperience('');
		setskills([]);
		setprojects([]);
	};

	const handleSkills = (skill) => {
		let newskill = [...skills, skill];
		setskills(newskill);
	};
	const handleProject = (project) => {
		let newproject = [...projects, project];
		setprojects(newproject);
	};

	const handleEditProject = (i) => {
		setEditData(projects[i]);
		setindexInfo(i);
		seteditType('project');
		setTimeout(() => {
			openEditor(true);
		}, 200);
	};

	const handlePostEdit = () => {
		if (editType === 'project') {
			let newProj = projects.map((para, index) => {
				if (index === indexInfo) {
					return editData;
				} else {
					return para;
				}
			});
			setprojects(newProj);
		}
	};
	const handleDeleteProject = (i) => {
		let newPro = projects.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setprojects(newPro);
	};
	const deteleSkill = (i) => {
		let newSkill = skills.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setskills(newSkill);
	};
	return (
		<div>
			<EditManager
				editor={editor}
				editData={editData}
				type={editType}
				setEditData={setEditData}
				save={handlePostEdit}
				handleClose={() => openEditor(false)}
			/>
			<Dialog
				fullScreen
				open={instrModal}
				onClose={closeInstr}
				scroll={'paper'}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={closeInstr}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Add Instructor
						</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth={'md'}>
					<div className={classes.root}>
						<TextField
							label='Instructor Name'
							fullWidth={true}
							value={name}
							onChange={(e) => setname(e.target.value)}
						/>
						<TextField
							label='Instructor Qualification'
							fullWidth={true}
							value={qualification}
							onChange={(e) => setqualification(e.target.value)}
						/>
						<TextField
							label='Instructor Designation'
							fullWidth={true}
							value={designation}
							onChange={(e) => setdesignation(e.target.value)}
						/>
						<TextField
							label='Company Name'
							fullWidth={true}
							value={companyName}
							onChange={(e) => setcompanyName(e.target.value)}
						/>
						<TextField
							label='Total Experience'
							fullWidth={true}
							value={totalExperience}
							onChange={(e) => settotalExperience(e.target.value)}
						/>
						<TextField
							label='Domain Experience'
							fullWidth={true}
							value={domainExperience}
							onChange={(e) => setdomainExperience(e.target.value)}
						/>

						{skills &&
							skills.map((skil, i) => (
								<Chip
									className={classes.chips}
									key={i}
									color='primary'
									label={skil}
									onDelete={() => deteleSkill(i)}
								/>
							))}

						<TextFieldManager addField={handleSkills} addLabel={'Skills'} />
						<Grid container spacing={2}>
							{projects &&
								projects.map((proj, i) => (
									<Grid item xs key={i}>
										<Card>
											<CardContent>
												<Typography variant='body2' component='p'>
													{proj}
												</Typography>
											</CardContent>
											<CardActions>
												<IconButton onClick={() => handleEditProject(i)}>
													<Edit color='primary' />
												</IconButton>
												<IconButton onClick={() => handleDeleteProject(i)}>
													<Delete color='secondary' />
												</IconButton>
											</CardActions>
										</Card>
									</Grid>
								))}
						</Grid>
						<TextFieldManager addField={handleProject} addLabel={'Projects'} />
						<Button
							variant='contained'
							color='secondary'
							onClick={(e) => onClick(e)}
						>
							Save
						</Button>
					</div>
				</Container>
			</Dialog>
		</div>
	);
}
