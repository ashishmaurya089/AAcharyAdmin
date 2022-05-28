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
	CardContent,
	CardActions,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	MenuItem,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { createWorkshop, updateWorkshop } from '../../actions/workshopAction';
import FaqManager from '../../components/FaqManager';
import ContentManager from './ContentManager';
import EditManager from '../../components/Editor/EditManager';
import EditFaq from '../../components/FaqManager/EditFaq';
import TextFieldManager from '../../components/TextFieldManager';
import EditContentManger from './EditContentManger';
import { getAllSponsors } from '../../actions/eventAction';
import { getAllInstructors } from '../../actions/skillsAction';
import SponsorManager from '../../components/SponsorManager/SponsorManager';
import { getLevels } from '../../actions/subjectActions';
import { getLevelFilter } from '../../actions/levelFilterActions';
import PreFaqs from '../../components/PreFaqs/PreFaqs';
import UploadHandler from '../../utils/UploadHandler';

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
			margin: theme.spacing(2, 'auto', 0),
		},
		'& .MuiFormControl-root': {
			margin: theme.spacing(2, 'auto', 0),
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
	marginTop: {
		marginTop: theme.spacing(1),
	},
	cardRoot: {
		marginTop: theme.spacing(1),
	},
	margin: {
		marginTop: '16px !important',
	},
	marginButton: {
		marginLeft: '16px !important',
		marginTop: '16px !important',
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function WorkshopForm({ open, handleClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { selectedWorkshop } = useSelector((state) => state.workshop);
	const { allInstructors } = useSelector((state) => state.skills);
	const { levels } = useSelector((state) => state.tuitionSegments);
	const { filterlevels, loading } = useSelector((state) => state.filterlevels);

	const [name, setname] = useState('');
	const [url, seturl] = useState('');
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
	const [editFaq, setEditFaq] = useState({});
	const [openFaqManager, setOpenFaqManager] = useState(false);

	const [editor, openEditor] = useState(false);
	const [editData, setEditData] = useState('');
	const [indexInfo, setindexInfo] = useState(0);
	const [editType, seteditType] = useState('');

	const [addNewFaq, setaddNewFaq] = useState(false);

	const [openContent, setopenContent] = useState(false);
	const [openNewContent, setopenNewContent] = useState(false);
	const [editContent, seteditContent] = useState({});

	const [sponsors, setsponsors] = useState([]);
	const [level, setlevel] = useState('');
	const [registrationEndDate, setregistrationEndDate] = useState(Date.now());

	const [preFaq, setpreFaq] = useState(false);

	useEffect(() => {
		dispatch(getAllSponsors());
		dispatch(getAllInstructors());
		dispatch(getLevelFilter());
	}, []);

	const saveWorkshop = () => {
		if (!selectedWorkshop._id) {
			dispatch(
				createWorkshop(
					name,
					url,
					level,
					objective,
					about,
					description,
					type,
					language,
					eligibility,
					gallery,
					venue,
					originalPrice,
					price,
					contents,
					instructor,
					banner,
					isActive,
					registrationEndDate,
					startDate,
					endDate,
					currency,
					currencySymbol,
					sponsors,
					faqs
				)
			);
			setTimeout(() => {
				handleCloseDialoug();
			}, 300);
		} else {
			if (selectedWorkshop._id) {
				dispatch(
					updateWorkshop(
						name,
						url,
						level,
						objective,
						about,
						description,
						type,
						language,
						eligibility,
						gallery,
						venue,
						originalPrice,
						price,
						contents,
						instructor,
						banner,
						isActive,
						registrationEndDate,
						startDate,
						endDate,
						currency,
						currencySymbol,
						sponsors,
						faqs,
						selectedWorkshop._id
					)
				);
				setTimeout(() => {
					handleCloseDialoug();
				}, 300);
			}
		}
	};

	const handleCloseDialoug = () => {
		resetState();
		handleClose();
	};

	const setinitialfields = (workshop) => {
		setname(workshop.name);
		setobjective(workshop.objective);
		setabout(workshop.about);
		setlanguage(workshop.language);
		setdescription(workshop.description);
		settype(workshop.type);
		seteligibility(workshop.eligibility);
		setgallery(workshop.gallery);
		setvenue(workshop.venue);
		setoriginalPrice(workshop.originalPrice);
		setprice(workshop.price);
		setcontents(workshop.contents);
		setFaqs(workshop.faqs);
		setbanner(workshop.banner);
		setisActive(workshop.isActive);
		if (
			workshop.startDate ||
			workshop.endDate ||
			workshop.registrationEndDate
		) {
			setstartDate(workshop.startDate.replace('Z', ''));
			setendDate(workshop.endDate.replace('Z', ''));
			setregistrationEndDate(workshop.registrationEndDate.replace('Z', ''));
		}
		if (workshop && workshop.instructor) {
			setinstructor(workshop.instructor._id);
		}
		if (workshop && workshop.sponsors) {
			setsponsors(workshop.sponsors);
		}
		if (workshop && workshop.level) {
			setlevel(workshop.level._id);
		}
		seturl(workshop.url);
	};

	useEffect(() => {
		if (selectedWorkshop && selectedWorkshop._id) {
			setinitialfields(selectedWorkshop);
		}
	}, [selectedWorkshop]);

	const resetState = () => {
		setname('');
		setobjective('');
		setabout([]);
		setdescription('');
		settype('');
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
		setlevel('');
		seturl('');
		setregistrationEndDate('');
	};

	const handleSponsors = (spons) => {
		setsponsors(spons);
	};
	const handleGallery = (gallerys) => {
		let newgallerys = [...gallery, gallerys];
		setgallery(newgallerys);
	};
	const addToGallery = (data) => {
		console.log(data.url);
		let newgallerys = [...gallery, data.url];
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
			openEditor(true);
		}, 200);
	};
	const editEgilibilty = (i) => {
		setEditData(eligibility[i]);
		setindexInfo(i);
		seteditType('eligibility');
		setTimeout(() => {
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
			setOpenFaqManager(true);
		}, 200);
	};
	const editcontent = (i) => {
		seteditContent(contents[i]);
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
	const saveEditContent = (editedFaq) => {
		let newcon = contents.map((con, index) => {
			if (index === indexInfo) {
				return editedFaq;
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

	const handlepreFaqs = (PreFaq) => {
		console.log(PreFaq);
		let newfaq = [...faqs, ...PreFaq];
		const uniq = new Set(newfaq.map((e) => JSON.stringify(e)));
		const res = Array.from(uniq).map((e) => JSON.parse(e));
		setFaqs(res);
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
							onClick={handleCloseDialoug}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							{!selectedWorkshop._id ? 'Create Workshop' : 'Edit Workshop'}
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
							label='URL'
							fullWidth={true}
							value={url}
							multiline
							rowsMax={4}
							onChange={(e) => seturl(e.target.value)}
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
									<Grid item xs key={i}>
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
						<Grid container spacing={2}>
							<Grid item xs>
								<TextField
									select
									fullWidth={true}
									label='Select type'
									value={type}
									onChange={(e) => settype(e.target.value)}
									helperText='Please select your type'
								>
									{types.map((option, i) => (
										<MenuItem key={i} value={option === null ? '' : option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs>
								<TextField
									select
									fullWidth={true}
									label='Select Level'
									value={level}
									onChange={(e) => setlevel(e.target.value)}
									helperText='Please select level'
								>
									{filterlevels.map((option, i) => (
										<MenuItem key={i} value={option._id}>
											{option.name}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
						<TextField
							label='Language'
							fullWidth={true}
							value={language}
							onChange={(e) => setlanguage(e.target.value)}
						/>
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
						<Grid container spacing={2}>
							{gallery &&
								gallery.map((gal, i) => (
									<Grid item xs key={i}>
										<Card className={classes.cardRoot}>
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
						<TextFieldManager addLabel={'Gallery'} />
						<UploadHandler getUrl={addToGallery} text={'Upload Gallery'} />

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
									<Grid item xs key={i}>
										<Card className={classes.cardRoot}>
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
							className={classes.margin}
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
							// onChange={(e) => setbanner(e.target.value)}
						/>
						<UploadHandler
							getUrl={(data) => setbanner(data.url)}
							text={'Upload Banner'}
						/>
						<Grid container spacing={2}>
							{faqs &&
								faqs.map((faq, i) => (
									<Grid item xs key={i}>
										<Card className={classes.cardRoot}>
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
							className={classes.margin}
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
						<PreFaqs
							faqs={faqs}
							handlepreFaqs={handlepreFaqs}
							open={preFaq}
							handleClose={() => setpreFaq(false)}
						/>
						<Button
							className={classes.marginButton}
							variant='outlined'
							color='primary'
							onClick={() => setpreFaq(true)}
						>
							Add Pre FAQ'S
						</Button>

						<Grid container spacing={3}>
							<Grid item md={6}>
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
							<Grid item md={6}>
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
							<Grid item md={6}>
								<TextField
									label='Last Date for Registering'
									type='datetime-local'
									value={registrationEndDate}
									fullWidth={true}
									onChange={(e) => setregistrationEndDate(e.target.value)}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>
							<Grid item md={6}>
								<TextField
									select
									fullWidth={true}
									label='Select Instructor'
									value={instructor}
									onChange={(e) => setinstructor(e.target.value)}
									helperText='Please select your sponsor'
								>
									{allInstructors &&
										allInstructors.length > 0 &&
										allInstructors.map((option, i) => (
											<MenuItem key={i} value={option._id}>
												{option.name}
											</MenuItem>
										))}
								</TextField>
							</Grid>
							<Grid item md={6}>
								<SponsorManager
									handleSponsors={handleSponsors}
									sponsors={sponsors}
								/>
							</Grid>
						</Grid>
						<Button
							variant='contained'
							color='primary'
							onClick={() => saveWorkshop()}
						>
							Save
						</Button>
					</div>
				</Container>
			</Dialog>
		</div>
	);
}
