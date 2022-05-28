import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSponsors } from '../../actions/eventAction';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(option, sponsors, theme) {
	return {
		fontWeight:
			sponsors.indexOf(option) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function SponsorManager({ handleSponsors, sponsors }) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const { allSponsors } = useSelector((state) => state.eventSegments);

	useEffect(() => {
		dispatch(getAllSponsors());
	}, []);

	const handleChange = (e) => {
		console.log('Sponsor manager', e.target.value);
		handleSponsors(e.target.value);
	};

	const getNameFromId = (id) => {
		let name = '';
		allSponsors.map((s) => {
			if (s._id === id) {
				name = s.name;
			}
		});
		return name;
	};

	return (
		<div>
			<div>
				Selected Sponsors :
				{sponsors.length > 0 &&
					sponsors.map((s) => (
						<Chip key={s} label={getNameFromId(s)} className={classes.chip} />
					))}
			</div>
			<FormControl className={classes.formControl} fullWidth={true}>
				<InputLabel id='demo-mutiple-chip-label'>Select Sponsor</InputLabel>
				<Select
					labelId='demo-mutiple-checkbox-label'
					id='demo-mutiple-checkbox'
					multiple
					value={sponsors}
					onChange={handleChange}
					input={<Input />}
					renderValue={(selected) => (
						<div className={classes.chips}>
							{selected.length > 0 &&
								selected.map((value, i) => (
									<Chip
										key={i}
										label={getNameFromId(value)}
										className={classes.chip}
									/>
								))}
						</div>
					)}
				>
					{allSponsors &&
						allSponsors.map((option) => (
							<MenuItem
								key={option._id}
								value={option._id}
								// style={getStyles(option, sponsors, theme)}
							>
								<Checkbox checked={sponsors.indexOf(option._id) > -1} />
								<ListItemText primary={option.name} />
							</MenuItem>
						))}
				</Select>
				{/* <Select
			  labelId="demo-mutiple-chip-label"
			  id="demo-mutiple-chip"
			  multiple
			  value={sponsors}
			  onChange={(e) => handleChange(e)}
			  input={<Input id="select-multiple-chip" />}
			  renderValue={(selected) => (
				<div className={classes.chips}>
				  {selected.length > 0 &&
					selected.map((value, i) => (
					  <Chip
						key={i}
						label={getNameFromId(value)}
						className={classes.chip}
					  />
					))}
				</div>
			  )}
			  MenuProps={MenuProps}
			>
			  {allSponsors.length > 0 &&
				allSponsors.map((option) => (
				  <MenuItem
					key={option._id}
					value={option._id}
					style={getStyles(option, sponsors, theme)}
				  >
					{option.name}
				  </MenuItem>
				))}
			</Select> */}
			</FormControl>
		</div>
	);
}
