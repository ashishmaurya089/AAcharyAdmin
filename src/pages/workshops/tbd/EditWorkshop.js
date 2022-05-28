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
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
	Card,
	CardActions,
	CardContent,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	MenuItem,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { updateWorkshop } from '../../actions/workshopAction';
import ContentManager from './ContentManager';
import FaqManager from '../../components/FaqManager';
import EditManager from '../../components/Editor/EditManager';
import TextFieldManager from '../../components/TextFieldManager';
import EditFaq from '../../components/FaqManager/EditFaq';
import EditContentManger from './EditContentManger';
import { getAllSponsors } from '../../actions/eventAction';
import { getAllInstructors } from '../../actions/skillsAction';
import SponsorManager from '../../components/SponsorManager/SponsorManager';

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
	cardRoot: {},
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function EditWorkshop({ open, handleClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { selectedWorkshop } = useSelector((state) => state.workshop);
	const { allInstructors } = useSelector((state) => state.skills);
	const { allSponsors } = useSelector((state) => state.eventSegments);
	const [name, setname] = useState('');
	const [objective, setobjective] = useState('');

	const [about, setabout] = useState([]);
	const [abouts, setabouts] = useState('');

	const [description, setdescription] = useState('');
	const [type, settype] = useState('');
	const [types, settypes] = useState(['online', 'offline', 'mixed']);
	const [language, setlanguage] = useState('English');

	const [eligibility, seteligibility] = useState([]);
	const [eligibilitys, seteligibilitys] = useState('');

	const [gallery, setgallery] = useState([]);
	const [gallerys, setgallerys] = useState('');
	const [venue, setvenue] = useState('');
	const [originalPrice, setoriginalPrice] = useState('');
	const [price, setprice] = useState('');
	const [contents, setcontents] = useState([]);
	const [banner, setbanner] = useState('');
	const [isActive, setisActive] = useState(false);
	const [startDate, setstartDate] = useState(Date.now());
	const [endDate, setendDate] = useState(Date.now());
	const [currency, setcurrency] = useState('INR');
	const [currencySymbol, setcurrencySymbol] = useState('₹');
	const [instructor, setinstructor] = useState('');
	const [faqs, setFaqs] = useState([]);
	const [openFaqManager, setOpenFaqManager] = useState(false);
	const [editFaq, setEditFaq] = useState({});
	const [editor, openEditor] = useState(false);
	const [editData, setEditData] = useState('');

	const [indexInfo, setindexInfo] = useState(0);
	const [editType, seteditType] = useState('');

	const [addNewFaq, setaddNewFaq] = useState(false);

	const [openContent, setopenContent] = useState(false);
	const [openNewContent, setopenNewContent] = useState(false);
	const [editContent, seteditContent] = useState({});

	const [sponsors, setsponsors] = useState([]);

	const setinitialfields = (workshop) => {
		setname(workshop.name);
		setobjective(workshop.objective);
		setabout(workshop.about);
		settype(workshop.type);
		setdescription(workshop.description);
		setlanguage(workshop.language);
		seteligibility(workshop.eligibility);
		setgallery(workshop.gallery);
		setvenue(workshop.venue);
		setoriginalPrice(workshop.originalPrice);
		setprice(workshop.price);
		setcontents(workshop.contents);
		setFaqs(workshop.faqs);
		setbanner(workshop.banner);
		setisActive(workshop.isActive);
		if (workshop.startDate || workshop.endDate) {
			setstartDate(workshop.startDate.replace('Z', ''));
			setendDate(workshop.endDate.replace('Z', ''));
		}
		if (workshop && workshop.instructor) {
			setinstructor(workshop.instructor._id);
		}
		if (workshop && workshop.sponsors) {
			setsponsors(workshop.sponsors);
		}
	};

	useEffect(() => {
		setinitialfields(selectedWorkshop);
	}, [selectedWorkshop]);

	const handleUpdate = (e) => {
		resetState();
		handleClose();
	};

	const resetState = () => {
		setname('');
		setobjective('');
		setabout([]);
		setdescription('');
		settypes([]);
		setlanguage('');
		seteligibility([]);
		setgallery([]);
		setvenue('');
		setoriginalPrice('');
		setprice('');
		setbanner('');
		setisActive(false);
		setstartDate('');
		setendDate('');
		setFaqs([]);
		setcontents([]);
		setsponsors([]);
		setinstructor('');
	};
	const handleSponsors = (spons) => {
		setsponsors(spons);
	};

	const handleGallery = (gallerys) => {
		let newgallerys = [...gallery, gallerys];
		setgallery(newgallerys);
	};
	const handleAbout = (abouts) => {
		let newabouts = [...about, abouts];
		setabout(newabouts);
	};
	const handleEligibility = (eligibilitys) => {
		let neweligibilitys = [...eligibility, eligibilitys];
		seteligibility(neweligibilitys);
	};
	const getFaq = (faq) => {
		let newFaqs = [...faqs, faq];
		setFaqs(newFaqs);
	};

	const getContent = (content) => {
		let cntns = [...contents, content];
		setcontents(cntns);
	};

	const editAbout = (i) => {
		setEditData(about[i]);
		setindexInfo(i);
		seteditType('about');
		setTimeout(() => {
			console.log('before opening dialog :', editData);
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
	const editGallery = (i) => {
		setEditData(gallery[i]);
		setindexInfo(i);
		seteditType('gallery');
		setTimeout(() => {
			openEditor(true);
		}, 200);
	};

	const handlePostEdit = () => {
		if (editType === 'about') {
			let newAbout = about.map((para, index) => {
				console.log(indexInfo);
				if (index === indexInfo) {
					return editData;
				} else {
					return para;
				}
			});
			setabout(newAbout);
		} else if (editType === 'eligibility') {
			let newEgi = eligibility.map((para, index) => {
				if (index === indexInfo) {
					return editData;
				} else {
					return para;
				}
			});
			seteligibility(newEgi);
		} else if (editType === 'gallery') {
			let newgal = gallery.map((para, index) => {
				if (index === indexInfo) {
					return editData;
				} else {
					return para;
				}
			});
			setgallery(newgal);
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
	const deleteEgilibilty = (i) => {
		let newEgi = eligibility.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		seteligibility(newEgi);
	};
	const deleteGallery = (i) => {
		let newGal = gallery.filter((para, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setgallery(newGal);
	};

	const handleEditFaq = (i) => {
		setEditFaq(faqs[i]);
		setindexInfo(i);
		setTimeout(() => {
			// console.log('before opening dialog :', editFaq);
			setOpenFaqManager(true);
		}, 200);
	};
	const editcontent = (i) => {
		seteditContent(contents[i]);
		setindexInfo(i);
		setTimeout(() => {
			// console.log('before opening dialog :', editFaq);
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
		let newcon = contents.map((con, index) => {
			if (index === indexInfo) {
				return edited;
			} else {
				return con;
			}
		});
		setcontents(newcon);
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
		let newcon = contents.filter((con, index) => {
			if (index === i) {
				return false;
			}
			return true;
		});
		setcontents(newcon);
	};
	return (
		<div>
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
							Edit Workshop
						</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth={'md'}>
					<div className={classes.root}>
						<TextField
							label='Workshop Name'
							fullWidth={true}
							value={name}
							multiline
							rowsMax={4}
							onChange={(e) => setname(e.target.value)}
						/>
						<TextField
							label='Objective of workshop'
							fullWidth={true}
							value={objective}
							multiline
							rowsMax={4}
							onChange={(e) => setobjective(e.target.value)}
							helperText='one or two line objective of the workshop'
						/>
						<Grid container spacing={2}>
							{about &&
								about.map((abt, i) => (
									<Grid item sm={3} md={3} lg={3} key={i}>
										<Card className={classes.cardRoot}>
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
							addLabel={'About of workshop'}
						/>
						<TextField
							label='Description of workshop'
							fullWidth={true}
							value={description}
							multiline
							rowsMax={4}
							onChange={(e) => setdescription(e.target.value)}
							helperText='one or two line description of the workshop'
						/>
						<FormControlLabel
							control={
								<Switch
									fullWidth={true}
									checked={isActive}
									onChange={(e) => setisActive(e.target.checked)}
								/>
							}
							label={isActive ? 'Workshop is Active' : 'Workshop is Inactive'}
						/>
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
						<TextField
							label='Language'
							fullWidth={true}
							value={language}
							onChange={(e) => setlanguage(e.target.value)}
						/>
						<Grid container spacing={2}>
							{eligibility &&
								eligibility.map((eli, i) => (
									<Grid item sm={4} md={4} lg={4} key={i}>
										<Card>
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
						<Grid container spacing={2}>
							{gallery &&
								gallery.map((gal, i) => (
									<Grid item sm={4} md={4} lg={4} key={i}>
										<Card>
											<CardContent>
												<Typography variant='body2' component='p'>
													{gal}
												</Typography>
											</CardContent>
											<CardActions>
												<IconButton onClick={() => editGallery(i)}>
													<Edit color='primary' />
												</IconButton>
												<IconButton onClick={() => deleteGallery(i)}>
													<Delete color='secondary' />
												</IconButton>
											</CardActions>
										</Card>
									</Grid>
								))}
						</Grid>
						<TextFieldManager addField={handleGallery} addLabel={'Gallery'} />

						<TextField
							label='Venue'
							fullWidth={true}
							value={venue}
							onChange={(e) => setvenue(e.target.value)}
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
						</Grid>
						<Grid container spacing={2}>
							{contents &&
								contents.map((cont, i) => (
									<Grid item sm={4} md={4} lg={4} key={i}>
										<Card>
											<CardContent>
												<Typography variant='body2' component='p'>
													Header: {cont.header}
												</Typography>
												<Typography variant='body2' component='p'>
													Duration: {cont.durationInHours}
												</Typography>
												<Typography variant='body2' component='p'>
													Highlights:
													{cont.highlights.map((hig, i) => (
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
							Add Content for Workshop
						</Button>
						<EditContentManger
							open={openContent}
							// getFaq={getFaq}
							editContent={editContent}
							saveEditContent={saveEditContent}
							handleClose={() => setopenContent(false)}
						/>
						<ContentManager
							open={openNewContent}
							getContent={getContent}
							contents={contents}
							handleClose={() => setopenNewContent(false)}
						/>
						<TextField
							label='Banner'
							fullWidth={true}
							value={banner}
							onChange={(e) => setbanner(e.target.value)}
						/>
						<Grid container spacing={2}>
							{faqs &&
								faqs.map((faq, i) => (
									<Grid item sm={4} md={4} lg={4} key={i}>
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
						<Grid container spacing={3}>
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
									label='Registration Ends'
									type='datetime-local'
									value={endDate}
									fullWidth={true}
									onChange={(e) => setendDate(e.target.value)}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<SponsorManager
									handleSponsors={handleSponsors}
									sponsorData={sponsors}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<TextField
									select
									fullWidth={true}
									label='Select Instructor'
									value={instructor}
									onChange={(e) => setinstructor(e.target.value)}
									helperText='Please select your sponsor'
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
							variant='contained'
							color='primary'
							onClick={(e) => handleUpdate(e)}
						>
							Save
						</Button>
					</div>
				</Container>
			</Dialog>
		</div>
	);
}
