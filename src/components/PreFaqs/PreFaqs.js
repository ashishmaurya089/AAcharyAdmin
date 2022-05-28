import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { getEventFaqs } from '../../actions/commonActions';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	formControlTab: {
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

export default function PreFaqs({
	open,
	handleClose,
	// faqs,
	// faq,
	handlepreFaqs,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const [faqstate, setfaqstate] = React.useState([]);
	const [faq, setfaq] = React.useState([]);

	const { eventFaqs } = useSelector((state) => state.commonData);

	useEffect(() => {
		dispatch(getEventFaqs());
	}, []);

	const handleChange = (e) => {
		let ids = e.target.value;
		console.log(ids);
		// let prefaqIds = [...faqstate, ...ids];
		setfaqstate(ids);
		let selectedFaqs = eventFaqs.filter((fa) => ids.includes(fa._id));
		// let selectedFaq = selectedFaqs.filter(
		// 	(fa) => fa._id !== selectedFaqs[0]._id
		// );
		// console.log('id', selectedFaq);
		console.log('id', selectedFaqs);
		selectedFaqs.map((sf) => {
			let eachFaq = {
				question: sf.question,
				awnser: sf.answer,
			};
			handleFaqs(eachFaq);
		});
	};

	const handleFaqs = (eachFaq) => {
		let fas = [...faq, eachFaq];
		const uniq = new Set(fas.map((e) => JSON.stringify(e)));
		const res = Array.from(uniq).map((e) => JSON.parse(e));
		setfaq(res);
	};
	const handleSave = () => {
		handlepreFaqs(faq);
		setfaq([]);
		setfaqstate([]);
		handleClose();
	};
	const handleCancel = () => {
		setfaq([]);
		setfaqstate([]);
		handleClose();
	};

	const getQuestion = (id) => {
		let question = '';
		eventFaqs.map((q) => {
			if (q._id === id) {
				question = q.question;
			}
		});
		return question;
	};
	function getStyles(option, eventFaqs, theme) {
		return {
			fontWeight:
				eventFaqs.indexOf(option) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

	return (
		<div>
			{/* <Button onClick={handleClickOpen}>Open select dialog</Button> */}
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={open}
				fullWidth='md'
				onClose={() => handleClose()}
			>
				<DialogTitle>Select from the list</DialogTitle>
				<DialogContent>
					{/* <DropDownList handlepreFaqs={handlepreFaqs} eventFaqs={eventFaqs} /> */}
					{/* <div>
						Selected Pre FAQ's :
						{faqstate.length > 0 &&
							faqstate.map((f, i) => (
								<Chip
									key={i}
									// label={getNameFromId(f._id)}
									label={getQuestion(f)}
									className={classes.chip}
								/>
							))}
					</div> */}
					<FormControl className={classes.formControlTab} fullWidth={true}>
						<InputLabel id='demo-mutiple-chip-label'>
							Select Pre FAQ's
						</InputLabel>
						<Select
							labelId='demo-mutiple-checkbox-label'
							id='demo-mutiple-checkbox'
							multiple
							value={faqstate}
							onChange={handleChange}
							input={<Input />}
							renderValue={(selected) => (
								<div className={classes.chips}>
									{selected.length > 0 &&
										selected.map((value, i) => (
											<Chip
												key={i}
												// label={getNameFromId(value._id)}
												label={getQuestion(value)}
												className={classes.chip}
											/>
										))}
								</div>
							)}
						>
							{eventFaqs &&
								eventFaqs.map((option, i) => (
									<MenuItem
										key={option._id}
										value={option._id}
										style={getStyles(option, eventFaqs, theme)}
									>
										<Checkbox checked={faqstate.indexOf(option._id) > -1} />
										<ListItemText primary={option.question} />
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} variant='outlined' color='secondary'>
						Cancel
					</Button>
					<Button onClick={handleSave} variant='outlined' color='primary'>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
