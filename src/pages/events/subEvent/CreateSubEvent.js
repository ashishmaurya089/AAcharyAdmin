import React, { useState, useEffect } from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
	FormControl,
	Input,
	InputAdornment,
	InputLabel,
	TextField,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import {
	createSubEvent,
	createStage,
	updateSubEvent,
} from '../../../actions/eventAction';
import { toast } from 'react-toastify';
import CreateStageTable from '../stage/CreateStageTable';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	margin: {
		margin: theme.spacing(1, 'auto'),
	},
	buttons: {
		marginTop: theme.spacing(1),
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

function getSteps() {
	return ['SubEvent', 'Stages'];
}

export default function SubEvent({
	show,
	setShow,
	setaddEventModal,
	addEventModal,
}) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();
	const dispatch = useDispatch();

	const { selectedCompetition, selectedSubEvent } = useSelector(
		(state) => state.eventSegments
	);

	const isStepOptional = (step) => {
		return step === 0 || step === 1;
	};
	useEffect(() => {
		if (selectedSubEvent) {
			setInitialFields(selectedSubEvent);
		}
	}, [selectedSubEvent]);

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	// For Skip button
	const handleSkip = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		if (show) {
			if (activeStep === steps.length - 1) setShow(!show);
		} else {
			if (activeStep === steps.length - 1) setaddEventModal(!addEventModal);
		}
	};
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		if (show) {
			if (activeStep === steps.length - 1) setShow(!show);
		} else {
			if (activeStep === steps.length - 1) setaddEventModal(!addEventModal);
		}
	};

	const [name, setname] = useState('');
	const [description, setdescription] = useState('');
	const [topic, settopic] = useState('');

	const resetState = () => {
		setname('');
		setdescription('');
		settopic('');
	};

	const setInitialFields = (subEvent) => {
		setname(subEvent.name);
		setdescription(subEvent.description);
		settopic(subEvent.topic);
	};
	const handelSave = (e) => {
		handleNext();
		if (activeStep === 0) {
			if (selectedCompetition && selectedCompetition._id) {
				if (selectedSubEvent && selectedSubEvent._id) {
					console.log('updating subevent')
					dispatch(
						updateSubEvent(name, description, topic, selectedSubEvent._id)
					);
				} else {
					console.log('created subevent')
					dispatch(
						createSubEvent(name, description, topic, selectedCompetition._id)
					);
				}
			} else {
				toast.error('Competition ID not Available');
			}
		}

		if (activeStep === 1) {
			resetState();
		}
	};

	const getFileds = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return (
					<>
						<TextField
							label='Sub Event Name'
							placeholder='Sub-Event Name'
							fullWidth={true}
							name='name'
							value={name}
							onChange={(e) => setname(e.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							label='Objective of Sub Event'
							fullWidth={true}
							name='description'
							value={description}
							multiline
							rowsMax={4}
							onChange={(e) => setdescription(e.target.value)}
							helperText='one or two line objective of the sub event'
						/>
						<TextField
							label='Topic'
							fullWidth={true}
							name='topic'
							value={topic}
							multiline
							rowsMax={4}
							onChange={(e) => settopic(e.target.value)}
							className={classes.margin}
							helperText='detailed description of the topic'
						/>
					</>
				);
			case 1:
				return <CreateStageTable />;

			default:
				return;
		}
	};
	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>

			<>{getFileds(activeStep)}</>

			<div className={classes.buttons}>
				<Button disabled={activeStep === 0} onClick={handleBack}>
					Back
				</Button>
				{/* <Button variant='contained' color='primary' onClick={handleSkip}>
					{activeStep === steps.length - 1 ? `Exit` : 'Next'}
				</Button> */}
				{isStepOptional(activeStep) && (
					<>
						<Button
							variant='contained'
							color={'success'}
							className='px-2'
							onClick={(e) => handelSave(e)}
						>
							{activeStep === steps.length - 1 ? `Exit` : 'SAVE AND PROCEED'}
						</Button>
						{/* {activeStep === steps.length - 2 && (
							<Button
								variant='contained'
								color={'success'}
								className='px-2'
								onClick={(e) => handleNext(e)}
							>
								PROCEED TO STAGES
							</Button>
						)} */}
					</>
				)}
			</div>
		</div>
	);
}
