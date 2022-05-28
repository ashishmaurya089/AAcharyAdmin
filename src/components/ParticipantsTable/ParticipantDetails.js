import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		'& > img': {
			width: 50,
			height: 50,
			borderRadius: '50%',
		},
	},
	details: {
		marginLeft: theme.spacing(2),
	},
}));
function ParticipantDetails({ data }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<img
				src={data.userId && data.userId.profileImage}
				alt={data.userId && data.userId.name}
			/>
			<div className={classes.details}>
				<p>{data.userId && data.userId.name}</p>
				<p>
					{data.userId && data.userId.countryCode}{' '}
					{data.userId && data.userId.phoneNumber}
				</p>
				<p>{data.userId && data.userId.email}</p>
			</div>
		</div>
	);
}

export default ParticipantDetails;
