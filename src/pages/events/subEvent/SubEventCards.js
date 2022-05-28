import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubeventById } from '../../../actions/eventAction';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function SubEventCards({ subevent, modalShow, setmodalShow }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { selectedCompetition } = useSelector((state) => state.eventSegments);

	const handleEdit = (e) => {
		setmodalShow(!modalShow);
		dispatch({
			type: 'SELECT_SUBEVENT',
			payload: subevent,
		});
	};
	const deleteHandler = () => {
		dispatch(deleteSubeventById(subevent._id, selectedCompetition._id));
	};

	return (
		<Card className={classes.root} variant='outlined'>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom
				>
					EVENT NAME: {subevent.name}
				</Typography>
				<Typography className={classes.pos} color='textSecondary'>
					TOPIC : {subevent.topic}
				</Typography>
				<Typography variant='body2' component='p'>
					DESCRIPTION : {subevent.description}
				</Typography>
				<Typography variant='body2' component='p'>
					STAGES : {subevent.stages.length}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size='small'
					variant='contained'
					color='primary'
					onClick={() => handleEdit()}
				>
					Edit SubEvent
				</Button>
				<Button
					size='small'
					variant='contained'
					color='secondary'
					onClick={deleteHandler}
				>
					Delete SubEvent
				</Button>
			</CardActions>
		</Card>
	);
}
