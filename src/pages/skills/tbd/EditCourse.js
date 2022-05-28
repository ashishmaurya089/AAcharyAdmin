import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
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
import { updateCourse } from '../../actions/skillsAction';
import FaqManager from '../../components/FaqManager';
import AddInstructor from './AddInstructor';
import TextFieldManager from '../../components/TextFieldManager/index.js';
import EditInstructor from './EditInstructor';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import EditManager from '../../components/Editor/EditManager';
import EditFaq from '../../components/FaqManager/EditFaq';
import CirculamManager from './CirculamManager';
import EditCirculamManager from './EditCirculamManager';

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
	buttonMargin: {
		marginRight: '16px !important',
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function EditCourse({ open, handleClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { selectedskill } = useSelector((state) => state.skills);
	const { allInstructors } = useSelector((state) => state.skills);

	const [name, setname] = useState('');
	const [capacity, setcapacity] = useState('');
	const [seatsLeft, setseatsLeft] = useState('');
	const [category, setcategory] = useState('');
	const [categorys, setcategorys] = useState([
		'civil',
		'electrical/electronics',
		'CS/IT',
		'mechanical',
	]);
	const [type, settype] = useState('');
	const [types, settypes] = useState(['regular', 'expert', 'combo']);
	const [curriculum, setcurriculum] = useState([]);
	const [onlineEvent, setonlineEvent] = useState(true);
	const [isActive, setisActive] = useState(false);
	const [certificate, setcertificate] = useState(true);
	const [sessionRecord, setsessionRecord] = useState(true);
	const [banner, setbanner] = useState('');
	const [trailer, settrailer] = useState('');
	const [startDate, setstartDate] = useState(Date.now());
	const [originalPrice, setoriginalPrice] = useState('');
	const [price, setprice] = useState('');
	const [durationInDays, setdurationInDays] = useState('');
	const [currency, setcurrency] = useState('INR');
	const [currencySymbol, setcurrencySymbol] = useState('₹');
	const [language, setlanguage] = useState('English');
	const [faqs, setFaqs] = useState([]);
	const [about, setabout] = useState([]);
	const [abouts, setabouts] = useState('');
	const [tags, settags] = useState([]);
	const [instructor, setinstructor] = useState('');
	const [editFaq, setEditFaq] = useState({});
	const [openFaqManager, setOpenFaqManager] = useState(false);
	const [eligibility, seteligibility] = useState([]);
	const [editor, openEditor] = useState(false);
	const [editData, setEditData] = useState('');

	const [indexInfo, setindexInfo] = useState(0);
	const [editType, seteditType] = useState('');

	const [addNewFaq, setaddNewFaq] = useState(false);

	const [openContent, setopenContent] = useState(false);
	const [openNewContent, setopenNewContent] = useState(false);
	const [editCirculam, seteditCirculam] = useState({});

	const [show, setshow] = useState(false);
	const [showModal, setshowModal] = useState(false);

	const setinitialfields = (skills) => {
		setname(skills.name);
		setcapacity(skills.capacity);
		setseatsLeft(skills.seatsLeft);
		setcategory(skills.category);
		settype(skills.type);
		setonlineEvent(skills.onlineEvent);
		setisActive(skills.isActive);
		setcertificate(skills.certificate);
		setsessionRecord(skills.sessionRecord);
		setbanner(skills.banner);
		settrailer(skills.trailer);
		setoriginalPrice(skills.originalPrice);
		setprice(skills.price);
		setdurationInDays(skills.durationInDays);
		setlanguage(skills.language);
		if (skills.startDate) {
			setstartDate(skills.startDate.replace('Z', ''));
		}
		setcurriculum(skills.curriculum);
		setFaqs(skills.faqs);
		setabout(skills.about);
		seteligibility(skills.eligibility);
		settags(skills.tags);
		if (skills && skills.instructor) {
			setinstructor(skills.instructor._id);
		}
	};

	useEffect(() => {
		setinitialfields(selectedskill);
	}, [selectedskill]);

	const handleUpdate = (e) => {
		dispatch(
			updateCourse(
				name,
				about,
				capacity,
				seatsLeft,
				category,
				type,
				onlineEvent,
				isActive,
				certificate,
				sessionRecord,
				banner,
				trailer,
				originalPrice,
				price,
				durationInDays,
				currency,
				currencySymbol,
				language,
				startDate,
				faqs,
				curriculum,
				tags,
				instructor,
				eligibility,
				selectedskill._id
			)
		);
		resetState();
		handleClose();
	};

	const resetState = () => {
		setname('');
		setcapacity('');
		setseatsLeft('');
		setcategorys([]);
		settypes([]);
		setonlineEvent(false);
		setisActive(false);
		setcertificate(false);
		setsessionRecord(false);
		setbanner('');
		settrailer('');
		setstartDate('');
		setoriginalPrice('');
		setprice('');
		setdurationInDays('');
		setlanguage('');
		setcurriculum([]);
		setFaqs([]);
		setabout([]);
		settags([]);
		setinstructor('');
		seteligibility([]);
	};
	const handleAbout = (abouts) => {
		let newabouts = [...about, abouts];
		setabout(newabouts);
	};
	const handleAddTag = (tag) => {
		let newTags = [...tags, tag];
		settags(newTags);
	};
	const getFaq = (faq) => {
		let newFaqs = [...faqs, faq];
		setFaqs(newFaqs);
	};
	const getCirculam = (curriculums) => {
		let circul = [...curriculum, curriculums];
		setcurriculum(circul);
	};
	const handleEligibility = (eligibilitys) => {
		let neweligibilitys = [...eligibility, eligibilitys];
		seteligibility(neweligibilitys);
	};
	const updateInstructor = () => {
		setshow(true);
	};
	const showInstructor = () => {
		setshowModal(true);
	};
	const closePopup = () => {
		setshow(false);
	};

	const editAbout = (i) => {
		setEditData(about[i]);
		setindexInfo(i);
		seteditType('about');
		setTimeout(() => {
			openEditor(true);
		}, 200);
	};
	const editTag = (i) => {
		setEditData(tags[i]);
		setindexInfo(i);
		seteditType('tag');
		setTimeout(() => {
			openEditor(true);
		}, 200);
	};
	const editEgilibilty = (i) => {
		setEditData(eligibility[i]);
		setindexInfo(i);
		seteditType('eligibility');
		setTimeout(() => {
			console.log('before opening dialog :', editData);
			openEditor(true);
		}, 200);
	};
	const handlePostEdit = () => {
		if (editType === 'about') {
			let newAbout = about.map((para, index) => {
				if (index === indexInfo) {
					return editData;
				} else {
					return para;
				}
			});
			setabout(newAbout);
		} else if (editType === 'tag') {
			let newtag = tags.map((para, index) => {
				if (index === indexInfo) {
					return editData;
				} else {
					return para;
				}
			});
			settags(newtag);
		} else if (editType === 'eligibility') {
			let newEgi = eligibility.map((para, index) => {
				if (index === indexInfo) {
					return editData;
				} else {
					return para;
				}
			});
			seteligibility(newEgi);
		}
	};

	const deteleAbout = (i) => {
		let newAbout = about.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setabout(newAbout);
	};
	const deteleTag = (i) => {
		let newtags = tags.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		settags(newtags);
	};
	const deleteEgilibilty = (i) => {
		let newEgi = eligibility.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		seteligibility(newEgi);
	};

	const handleEditFaq = (i) => {
		setEditFaq(faqs[i]);
		setindexInfo(i);
		setTimeout(() => {
			setOpenFaqManager(true);
		}, 200);
	};
	const editcontent = (i) => {
		seteditCirculam(curriculum[i]);
		setindexInfo(i);
		setTimeout(() => {
			setopenContent(true);
		}, 200);
	};

	const saveEditFaq = (editedFaq) => {
		let newfaqs = faqs.map((faq, index) => {
			if (index === indexInfo) {
				return editedFaq;
			} else {
				return faq;
			}
		});
		setFaqs(newfaqs);
	};
	const saveEditContent = (edited) => {
		let newcon = curriculum.map((con, index) => {
			if (index === indexInfo) {
				return edited;
			} else {
				return con;
			}
		});
		setcurriculum(newcon);
	};
	const handleDeleteFaq = (i) => {
		let newFaqs = faqs.filter((faq, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setFaqs(newFaqs);
	};
	const deletecontent = (i) => {
		let newcon = curriculum.filter((con, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setcurriculum(newcon);
	};
	return (
		<div>
			<EditInstructor show={show} close={closePopup} />
			<AddInstructor
				instrModal={showModal}
				closeInstr={() => {
					setshowModal(false);
				}}
			/>
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
				open={open}
				onClose={handleClose}
				scroll={'paper'}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Edit Course
						</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth={'md'}>
					<div className={classes.root}>
						<TextField
							label='Course Name'
							fullWidth={true}
							value={name}
							multiline
							rowsMax={4}
							onChange={(e) => setname(e.target.value)}
						/>
						<Grid container spacing={2}>
							{about &&
								about.map((abt, i) => (
									<Grid item xs key={i}>
										<Card>
											<CardContent>
												<Typography variant='body2' component='p'>
													{abt}
												</Typography>
											</CardContent>
											<CardActions>
												<IconButton onClick={() => editAbout(i)}>
													<Edit color='primary' />
												</IconButton>
												<IconButton onClick={() => deteleAbout(i)}>
													<Delete color='secondary' />
												</IconButton>
											</CardActions>
										</Card>
									</Grid>
								))}
						</Grid>
						<TextFieldManager
							addField={handleAbout}
							addLabel={'About Course'}
						/>
						<TextField
							label='Capacity of course'
							fullWidth={true}
							value={capacity}
							type='number'
							onChange={(e) => setcapacity(e.target.value)}
						/>
						<TextField
							label='Seats left for the course'
							fullWidth={true}
							value={seatsLeft}
							type='number'
							onChange={(e) => setseatsLeft(e.target.value)}
						/>
						<TextField
							select
							fullWidth={true}
							label='Select category'
							value={category}
							onChange={(e) => setcategory(e.target.value)}
							helperText='Please select your category'
						>
							{categorys.map((option, i) => (
								<MenuItem key={i} value={option == null ? '' : option}>
									{option}
								</MenuItem>
							))}
						</TextField>
						<TextField
							select
							fullWidth={true}
							label='Select type'
							value={type}
							onChange={(e) => settype(e.target.value)}
							helperText='Please select your type'
						>
							{types.map((option, i) => (
								<MenuItem key={i} value={option == null ? '' : option}>
									{option}
								</MenuItem>
							))}
						</TextField>
						<Grid container spacing={2}>
							{eligibility &&
								eligibility.map((eli, i) => (
									<Grid item xs key={i}>
										<Card className={classes.cardRoot}>
											<CardContent>
												<Typography variant='body2' component='p'>
													{eli}
												</Typography>
											</CardContent>
											<CardActions>
												<IconButton onClick={() => editEgilibilty(i)}>
													<Edit color='primary' />
												</IconButton>
												<IconButton onClick={() => deleteEgilibilty(i)}>
													<Delete color='secondary' />
												</IconButton>
											</CardActions>
										</Card>
									</Grid>
								))}
						</Grid>
						<TextFieldManager
							addField={handleEligibility}
							addLabel={'Eligibility for workshop'}
						/>
						{tags &&
							tags.map((tg, i) => (
								<Chip
									className={classes.chips}
									key={i}
									color='primary'
									label={tg}
									onDelete={() => deteleTag(i)}
								/>
							))}
						<TextFieldManager addField={handleAddTag} addLabel={'Add Tag'} />
						<Grid container spacing={2}>
							<Grid item sm={12} md={6} lg={6}>
								<FormControlLabel
									control={
										<Switch
											fullWidth={true}
											checked={isActive}
											onChange={(e) => setisActive(e.target.checked)}
										/>
									}
									label={
										isActive ? 'Workshop is Active' : 'Workshop is Inactive'
									}
								/>
							</Grid>
							<Grid item sm={12} md={6} lg={6}>
								{' '}
								<FormControlLabel
									control={
										<Switch
											fullWidth={true}
											checked={onlineEvent}
											onChange={(e) => setonlineEvent(e.target.checked)}
										/>
									}
									label={
										onlineEvent
											? 'Online Event is Active'
											: 'Online Event is Inactive'
									}
								/>
							</Grid>
							<Grid item sm={12} md={6} lg={6}>
								<FormControlLabel
									control={
										<Switch
											fullWidth={true}
											checked={certificate}
											onChange={(e) => setcertificate(e.target.checked)}
										/>
									}
									label={
										certificate
											? 'Certification provided'
											: 'Certification not provided'
									}
								/>
							</Grid>
							<Grid item sm={12} md={6} lg={6}>
								<FormControlLabel
									control={
										<Switch
											fullWidth={true}
											checked={sessionRecord}
											onChange={(e) => setsessionRecord(e.target.checked)}
										/>
									}
									label={
										sessionRecord
											? 'Session Record is avaliabale'
											: 'Session Record is not avaliabale'
									}
								/>
							</Grid>
						</Grid>

						<TextField
							label='Banner'
							fullWidth={true}
							value={banner}
							onChange={(e) => setbanner(e.target.value)}
						/>
						<TextField
							label='Trailer'
							fullWidth={true}
							value={trailer}
							onChange={(e) => settrailer(e.target.value)}
						/>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<FormControl fullWidth={true}>
									<InputLabel htmlFor='standard-adornment-originalPrice'>
										Original Price
									</InputLabel>
									<Input
										id='standard-adornment-originalPrice'
										value={originalPrice}
										type='number'
										onChange={(e) => setoriginalPrice(e.target.value)}
										startAdornment={
											<InputAdornment position='start'>₹</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<FormControl fullWidth={true}>
									<InputLabel htmlFor='standard-adornment-price'>
										Price
									</InputLabel>
									<Input
										id='standard-adornment-price'
										value={price}
										type='number'
										onChange={(e) => setprice(e.target.value)}
										startAdornment={
											<InputAdornment position='start'>₹</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<TextField
									label='Duration In Days'
									fullWidth={true}
									value={durationInDays}
									type='number'
									onChange={(e) => setdurationInDays(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<TextField
									label='Language'
									fullWidth={true}
									value={language}
									onChange={(e) => setlanguage(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							{faqs &&
								faqs.map((faq, i) => (
									<Grid item xs key={i}>
										<Card>
											<CardContent>
												<Typography variant='body2' component='p'>
													Question: {faq.question}
												</Typography>
												<Typography variant='body2' component='p'>
													Answer: {faq.awnser}
												</Typography>
											</CardContent>
											<CardActions>
												<IconButton onClick={() => handleEditFaq(i)}>
													<Edit color='primary' />
												</IconButton>
												<IconButton onClick={() => handleDeleteFaq(i)}>
													<Delete color='secondary' />
												</IconButton>
											</CardActions>
										</Card>
									</Grid>
								))}
						</Grid>

						<EditFaq
							openFaqManager={openFaqManager}
							// getFaq={getFaq}
							editFaq={editFaq}
							saveEdit={saveEditFaq}
							handleClose={() => setOpenFaqManager(false)}
						/>
						<Button
							variant='outlined'
							color='primary'
							onClick={() => setaddNewFaq(true)}
						>
							Add FAQ
						</Button>
						<FaqManager
							open={addNewFaq}
							getFaq={getFaq}
							handleClose={() => setaddNewFaq(false)}
						/>
						<Grid container spacing={2}>
							{curriculum &&
								curriculum.map((cir, i) => (
									<Grid item xs key={i}>
										<Card>
											<CardContent>
												<Typography variant='body2' component='p'>
													Header: {cir.header}
												</Typography>
												<Typography variant='body2' component='p'>
													Highlights:
													{cir.highlights.map((hig, i) => (
														<>{hig}</>
													))}
												</Typography>
											</CardContent>
											<CardActions>
												<IconButton onClick={() => editcontent(i)}>
													<Edit color='primary' />
												</IconButton>
												<IconButton onClick={() => deletecontent(i)}>
													<Delete color='secondary' />
												</IconButton>
											</CardActions>
										</Card>
									</Grid>
								))}
						</Grid>
						<Button
							variant='outlined'
							color='primary'
							onClick={() => setopenNewContent(true)}
						>
							Add Content for course
						</Button>
						<EditCirculamManager
							open={openContent}
							// getFaq={getFaq}
							editContent={editCirculam}
							saveEditContent={saveEditContent}
							handleClose={() => setopenContent(false)}
						/>
						<CirculamManager
							open={openNewContent}
							getContent={getCirculam}
							contents={curriculum}
							handleClose={() => setopenNewContent(false)}
						/>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<TextField
									label='Registration Starts'
									type='datetime-local'
									value={startDate}
									fullWidth={true}
									onChange={(e) => setstartDate(e.target.value)}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<TextField
									select
									fullWidth={true}
									label='Select Instructor'
									value={instructor}
									onChange={(e) => setinstructor(e.target.value)}
									helperText='Please select your instructor'
								>
									{allInstructors.length > 0 &&
										allInstructors.map((option, i) => (
											<MenuItem key={i} value={option._id}>
												{option.name}
											</MenuItem>
										))}
								</TextField>
							</Grid>
						</Grid>

						<Button
							className={classes.buttonMargin}
							variant='contained'
							color='primary'
							onClick={(e) => handleUpdate(e)}
						>
							Update
						</Button>
						{/* <Button
							className={classes.buttonMargin}
							variant='contained'
							color='primary'
							onClick={(e) => updateInstructor(e)}
						>
							Update Instructor
						</Button>
						<Button
							variant='contained'
							color='primary'
							onClick={(e) => showInstructor(e)}
						>
							Add Instructor
						</Button> */}
					</div>
				</Container>
			</Dialog>
		</div>
	);
}
