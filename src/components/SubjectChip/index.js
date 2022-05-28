import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { responsiveFontSizes } from '@material-ui/core';

export default function SubjectChip({ subId }) {
	const [sub, setsub] = useState({});
	const [loading, setloading] = useState('true');
	useEffect(() => {
		async function getSubjectDetails(id) {
			let res = await axios.get(`/api/admin/getSubjectById/?subId=${subId}`);
			if (res.status === 200) {
				setsub(res.data.data);
				setloading(false);
			}
		}
		getSubjectDetails(subId);
	}, [subId]);
	if (loading) {
		return <CircularProgress />;
	} else {
		return <Chip label={sub.name} variant='outlined' />;
	}
}
