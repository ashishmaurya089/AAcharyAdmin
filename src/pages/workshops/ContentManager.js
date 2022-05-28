import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { toast } from 'react-toastify';
import {
	Card,
	CardContent,
	CardActions,
	Grid,
	Typography,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import TextFieldManager from '../../components/TextFieldManager';
import EditManager from '../../components/Editor/EditManager';
const useStyles = makeStyles((theme) => ({
	root: {},
	textField: {
		'& > *': {
			margin: theme.spacing(1, 0),
		},
	},
}));

export default function ContentManager({
	getContent,
	contents,
	open,
	handleClose,
}) {
	const classes = useStyles();
	// const [open, setOpen] = React.useState(false);
	const [maxWidth, setMaxWidth] = React.useState('md');
	const [header, setheader] = useState('');
	const [durationInHours, setdurationInHours] = useState('');
	const [highlights, sethighlights] = useState([]);
	const [highlight, sethighlight] = useState('');

	const [editor, openEditor] = useState(false);
	const [editData, setEditData] = useState('');
	const [indexInfo, setindexInfo] = useState(0);
	const [editType, seteditType] = useState('');
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };
	// const handleClose = () => {
	// 	setOpen(false);
	// };

	const handleSave = () => {
		let eachContent = {
			header,
			durationInHours,
			highlights,
		};

		if (!header || !durationInHours) {
			toast.error("Empty fileds can't be added");
		} else {
			getContent(eachContent);
			resetState();
			toast.success('Success');
		}
	};
	const resetState = () => {
		setheader('');
		sethighlights([]);
		setdurationInHours('');
	};

	const handlehighlight = (highlight) => {
		let newhighlights = [...highlights, highlight];
		sethighlights(newhighlights);
	};
	const editHighlight = (i) => {
		setEditData(highlights[i]);
		setindexInfo(i);
		seteditType('highlights');
		setTimeout(() => {
			console.log('before opening dialog :', editData);
			openEditor(true);
		}, 200);
	};
	const handlePostEdit = () => {
		if (editType === 'highlights') {
			let newhigh = highlights.map((para, index) => {
				console.log(indexInfo);
				if (index === indexInfo) {
					return editData;
				} else {
					return para;
				}
			});
			sethighlights(newhigh);
		}
	};
	const deleteHighlight = (i) => {
		let newhigh = highlights.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		sethighlights(newhigh);
	};
	return (
		<>
			<EditManager
				editor={editor}
				editData={editData}
				type={editType}
				setEditData={setEditData}
				save={handlePostEdit}
				handleClose={() => openEditor(false)}
			/>
			<div className={classes.root}>
				{/* <Button variant='outlined' color='primary' onClick={handleClickOpen}>
					Add New Content for Workshop
				</Button> */}
				<Dialog
					fullWidth={true}
					maxWidth={maxWidth}
					open={open}
					onClose={handleClose}
					aria-labelledby='max-width-dialog-title'
				>
					<DialogTitle id='max-width-dialog-title'>
						Add Each Topic with highlights
					</DialogTitle>
					<DialogContent className={classes.textField}>
						<TextField
							label='Header'
							fullWidth={true}
							value={header}
							onChange={(e) => setheader(e.target.value)}
						/>
						<TextField
							label='Duration In Hours'
							type='number'
							fullWidth={false}
							value={durationInHours}
							onChange={(e) => setdurationInHours(e.target.value)}
						/>
						{/* <FormControl fullWidth={true}>
							<InputLabel htmlFor='standard-adornment-longDescription'>
								Highlight
							</InputLabel>
							<Input
								id='standard-adornment-longDescription'
								value={highlight}
								onChange={(e) => sethighlight(e.target.value)}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton onClick={handlehighlight}>
											<AddCircleIcon color='primary' />
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						{highlights.length > 0 && (
							<>
								<ol>
									{highlights.map((high, i) => (
										<li key={i}>{high}</li>
									))}
								</ol>
							</>
						)} */}
						<Grid container spacing={2}>
							{highlights.length > 0 &&
								highlights.map((hig, i) => (
									<Grid item sm={4} md={4} lg={4} key={i}>
										<Card>
											<CardContent>
												<Typography variant='body2' component='p'>
													{hig}
												</Typography>
											</CardContent>
											<CardActions>
												<IconButton onClick={() => editHighlight(i)}>
													<Edit color='primary' />
												</IconButton>
												<IconButton onClick={() => deleteHighlight(i)}>
													<Delete color='secondary' />
												</IconButton>
											</CardActions>
										</Card>
									</Grid>
								))}
						</Grid>
						<TextFieldManager
							addField={handlehighlight}
							addLabel={'Highlights'}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant='contained' color='secondary'>
							Exit
						</Button>
						<Button onClick={handleSave} variant='contained' color='primary'>
							Add to Syllabus
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
}
