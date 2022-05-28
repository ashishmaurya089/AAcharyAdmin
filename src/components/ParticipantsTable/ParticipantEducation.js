import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	// root: {
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	'& > img': {
	// 		width: 50,
	// 		height: 50,
	// 		borderRadius: '50%',
	// 	},
	// },
	details: {
		marginLeft: theme.spacing(2),
	},
}));
function ParticipantEducation({ data }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.details}>
				<p>{data.educationalLevel}</p>
				<p>{data.participantStandard}</p>
			</div>
		</div>
	);
}

export default ParticipantEducation;
