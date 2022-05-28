import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { promoteAParticipant } from '../../actions/eventAction';
import {
	Backdrop,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 3,
		color: theme.palette.secondary.main,
	},
}));

export default function PromoteParticipant({ data, openPromote, handleClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	// const { loading } = useSelector((state) => state.eventSegments);

	const [winner, setwinner] = useState(false);
	const [finalist, setfinalist] = useState(false);
	const [loading, setloading] = useState(false);

	useEffect(() => {
		if (data) {
			setfinalist(data.finalist);
			setwinner(data.winner);
		}
	}, [data]);
	const handleSave = () => {
		if (data) {
			dispatch(
				promoteAParticipant({
					registrationId: data._id,
					finalist: finalist,
					winner: winner,
				})
			);
		}
	};
	return (
		<>
			{/* <Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop> */}
			<Dialog
				open={openPromote}
				onClose={handleClose}
				fullWidth={true}
				maxWidth={'md'}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					<Typography variant='h6' gutterBottom>
						The Current Stage of <strong>{data && data.participantName}</strong>{' '}
						is{'  '}
						<strong>{data && data.currentStage}</strong>
						{'  '}
						{data &&
							data.subEventId &&
							data.subEventId.stages.length > 0 &&
							data.subEventId.stages.map((obj) => {
								if (obj.stageOrder === data.currentStage) {
									return <strong>- {obj.stageName}</strong>;
								}
							})}
					</Typography>
					<Typography variant='body1' gutterBottom>
						Do you want to promote to next Stage ?
					</Typography>
					{data &&
						data.subEventId &&
						data.subEventId.stages.length > 0 &&
						data.subEventId.stages.map((obj) => {
							if (obj.stageOrder === data.currentStage + 1) {
								return <strong>{obj.stageName}</strong>;
							}
						})}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						<FormControlLabel
							control={
								<Checkbox
									checked={winner}
									onChange={(e) => setwinner(e.target.checked)}
									name='winner'
								/>
							}
							label='Winner'
						/>{' '}
						<FormControlLabel
							control={
								<Checkbox
									checked={finalist}
									onChange={(e) => setfinalist(e.target.checked)}
									name='checkedA'
								/>
							}
							label='Finalist'
						/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary'>
						Exit
					</Button>
					<Button onClick={handleSave} color='primary' autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
