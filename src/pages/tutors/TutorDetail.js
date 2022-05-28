import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import MailIcon from "@material-ui/icons/Mail";
import { Call as CallIcon } from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Switch from "@material-ui/core/Switch";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
  FormControlLabel,
  TextField,
  MenuItem,
  CircularProgress,
  Container,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";
import { getLevels, getSegments } from "../../actions/subjectActions";
import Backdrop from "@material-ui/core/Backdrop";
import { addPermittedLevels, approveProvider } from "../../actions/userActions";
// import PDFViewer from 'pdf-viewer-reactjs';
import { Document, Page } from "react-pdf";
import { toast } from "react-toastify";
import ReactPdfViewer from "./ReactPdfViewer";

import samplePdf from "./Resume.pdf";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  tutorHero: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  logo: {
    borderRadius: 5,
    width: 150,
  },
  table: {
    maxWidth: 550,
  },
  marg: {
    marginTop: 20,
    marginBottom: 20
  },
  chips: {
    "& > *": {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
  },
  cardroot: {
    minWidth: 275,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,.3)",
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  viewImage: {
    borderRadius: 10,
    maxHeight: "90%",
    maxWidth: "50%",
  },
  // tableRowSplit: {
  //   width: '100%',
  //   'box-shadow': '10px 10px 5px 0px rgba(237,233,233,0.75)',
  //   borderRadius: 5,
  //   '-webkit-column-count': 2,
  //   '-moz-column-count': 2,
  //   'column-count': 2,
  // },
  tableRowSplit: {
    overflow: "hidden",
    overflowY: "scroll",
    height: "auto",
    maxHeight: 300,
  },
  gridLayout: {
    width: "auto !important",
    margin: "0 !important",
  },
  progressBar: {
    display: "flex",
    margin: "40px auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TutorDetail({ open, handleClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedTutor, loading } = useSelector((state) => state.usersData);
  const [approved, setapproved] = useState(false);
  const [permittedLevels, setpermittedLevels] = useState([]);
  const [selectedSegment, setselectedSegment] = useState("");
  const handleSave = () => {
    if (permittedLevels) {
      const permittedLevelsId = permittedLevels.map((lvl) => lvl._id);
      dispatch(addPermittedLevels(selectedTutor._id, permittedLevelsId));
    }
    // if (approved) {
    // 	console.log('Already approved');
    // } else {
    // 	dispatch(approveProvider(selectedTutor._id, approved));
    // }

    setTimeout(() => {
      handleClose();
    }, 300);
  };
  const { segments } = useSelector((state) => state.tuitionSegments);
  useEffect(() => {
    if (selectedTutor && selectedTutor._id) {
      setapproved(selectedTutor.approved);
      setpermittedLevels(selectedTutor.permittedLevels);
    }
  }, [selectedTutor]);

  useEffect(() => {
    dispatch(getSegments());
  }, []);
  // console.log(segments);
  useEffect(() => {
    if (selectedSegment) {
      dispatch(getLevels(selectedSegment));
    }
  }, [selectedSegment]);

  const approveData = (approveData) => {
    setapproved(approveData);
  };
  const approvedLevels = (approvedLevels) => {
    setpermittedLevels(approvedLevels);

  };
  const handleCloseDialogue = () => {
    dispatch({
      type: "RESET_APPROVELEVELS_TUTOR",
    });
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleCloseDialogue()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Tutor Details
            </Typography>
            <Button
              autoFocus
              color="secondary"
              variant="contained"
              onClick={handleSave}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md">
          <Hero tutor={selectedTutor} />
          <Grid item md={12} style={{ marginBottom: 20 }}>
            <Typography component="h1" variant="h3" gutterBottom>
              Academic
            </Typography>
            <DegreeEducation tutor={selectedTutor} />
          </Grid>
          <Typography component="h1" variant="h3" gutterBottom>
            Approved Levels : By Admin
          </Typography>
          <div >
            {permittedLevels.map((lvl) => (
              <Chip label={lvl.name} style={{ margin: 5 }} key={lvl._id} />
            )

            )}
          </div>
          <Grid container spacing={2} className={classes.gridLayout}>
            <Grid item md={4}>
              <Card style={{ marginLeft: 10 }}>
                <LevelsList
                  loading={loading}
                  selectedSegState={selectedSegment}
                  setselectedSegState={setselectedSegment}
                  segments={segments}
                  tutor={selectedTutor}
                  permittedLevels={permittedLevels}
                  approvedLevels={approvedLevels}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </>
  );
}

export function Hero({ tutor }) {
  const classes = useStyles();
  if (tutor.communicationAddress) {
    var address = JSON.parse(tutor.communicationAddress);
  }
  return (
    <Paper className={classes.mainFeaturedPost}>
      <div className={classes.overlay} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={10}>
          <div className={classes.tutorHero}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {/* {tutor.userId && tutor.userId.salutation}.  */}
              {tutor.name}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              {/* {tutor.userId && tutor.userId.place.formatted_address} */}
              {tutor.communicationAddress && (
                <>
                  {address.Address}, {address.Locality}, {address.City},
                  {address.State}, {address.Country}
                </>
              )}
            </Typography>
            <Typography variant="body2" color="inherit">
              {tutor.about}
            </Typography>
            {tutor.userId && (
              <div className={classes.chips}>
                <Chip
                  label={tutor.userId && tutor.userId.email}
                  color="primary"
                  variant="default"
                  icon={<MailIcon />}
                />
                <Chip
                  label={`${tutor.userId && tutor.userId.countryCode} ${tutor.userId && tutor.userId.phoneNumber
                    }`}
                  color="primary"
                  variant="default"
                  icon={<CallIcon />}
                />
              </div>
            )}
          </div>
        </Grid>
        {/* <Grid item md={4}>
					<Typography variant='h4' color='inherit'>
						{tutor.currentDeisgnation} at {tutor.currentWork}
					</Typography>
					<Typography variant='h6' color='inherit' display='block'>
						Toatal Exp: {tutor.totalWorkExperienceInYears}
					</Typography>
					<Typography variant='p' color='inherit' display='block'>
						AvgRate Per Hr: {tutor.avgRatePerHr}
					</Typography>
					<Typography variant='p' color='inherit' display='block'>
						AvgRate Per Month: {tutor.avgRatePerMonth}
					</Typography>
					<Typography variant='p' color='inherit' display='block'>
						Avg Rating: {tutor.avgRating}
					</Typography>
					<Typography variant='p' color='inherit' display='block'>
						Teaching Preferences: {handleTeachingPre()}
					</Typography>
				</Grid> */}
        <Grid item md={2}>
          {tutor.userId && (
            <img
              className={classes.logo}
              src={tutor.userId && tutor.userId.profileImage}
              alt="userImg"
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export function ProfessionalInfo({ tutor }) {
  const classes = useStyles();
  return (
    <Grid xs={4} style={{ marginBottom: 15 }}>
      <Card className={classes.cardroot} variant="outlined">
        <CardContent>
          <Typography variant="h6" color="inherit">
            {tutor.currentDeisgnation} at {tutor.currentWork}
          </Typography>
          <Typography variant="p" color="inherit" display="block">
            Toatal Exp: {tutor.totalWorkExperienceInYears}
          </Typography>
          <Typography variant="p" color="inherit" display="block">
            AvgRate Per Hr: {tutor.avgRatePerHr}
          </Typography>
          <Typography variant="p" color="inherit" display="block">
            AvgRate Per Month: {tutor.avgRatePerMonth}
          </Typography>
          <Typography variant="p" color="inherit" display="block">
            Avg Rating: {tutor.avgRating}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

// export function TutorPreferences({ tutor }) {
//   const classes = useStyles();

//   return (
//     <List
//       subheader={
//         <ListSubheader disableSticky={true}>Preferences</ListSubheader>
//       }
//       className={classes.root}
//       variant="outlined"
//     >
//       <ListItem>
//         <ListItemText primary="Availability" />
//         <ListItemSecondaryAction>

//         </ListItemSecondaryAction>
//       </ListItem>
//       {/* <ListItem>
// 				<FormControlLabel
// 					control={
// 						<Switch
// 							fullWidth={true}
// 							checked={approved}
// 							onChange={(e) => approveData(e.target.checked)}
// 						/>
// 					}
// 					label={approved ? 'Aprroved' : 'Not Approved'}
// 				/>
// 			</ListItem> */}
//     </List>
//   );
// }

export function PreferenceTable({ tutor }) {
  const classes = useStyles();
  console.log(tutor)
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Preferences</TableCell>
            <TableCell align="right">Settings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Hide Profile Image
            </TableCell>
            <TableCell align="right">
              {tutor.incognito ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Tuition Center
            </TableCell>
            <TableCell align="right">
              {tutor.hasTuitionCenter ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Individual Tutor
            </TableCell>
            <TableCell align="right">
              {tutor.isIndividualTutor ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Online
            </TableCell>
            <TableCell align="right">
              {tutor.offersOnline ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Offline
            </TableCell>
            <TableCell align="right">
              {tutor.offersOffline ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>
          {tutor.offersOffline &&
            <TableRow>
              <TableCell component="th" scope="row">
                Offline Location Preference
              </TableCell>
              <TableCell align="right">
                <Chip label={'Student Home'} variant="default" color="primary" icon={tutor.offlineLocationPreference.center ? <DoneIcon /> : <CancelIcon />} />
                <Chip label={'Tutor Home'} variant="default" color="primary" icon={tutor.offlineLocationPreference.tutorHome ? <DoneIcon /> : <CancelIcon />} />
                <Chip label={'Aacharya Center'} variant="default" color="primary" icon={tutor.offlineLocationPreference.studentHome ? <DoneIcon /> : <CancelIcon />} />
              </TableCell>
            </TableRow>
          }
          <TableRow>
            <TableCell component="th" scope="row">
              Availability
            </TableCell>
            <TableCell align="right">
              {tutor.availability && tutor.availability.length > 0 ?
                tutor.availability.map((e, i) => (
                  <Chip label={e} variant="outlined" key={i} />
                )) :
                <Chip label={'Avalability not marked'} variant="contained" color="secondary" />
              }
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Monthly Tuition
            </TableCell>
            <TableCell align="right">
              {tutor.monthly ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Short Term Tuition
            </TableCell>
            <TableCell align="right">
              {tutor.shortTerm ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Group Tuition
            </TableCell>
            <TableCell align="right">
              {tutor.oneToMany ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              One to One Tuition
            </TableCell>
            <TableCell align="right">
              {tutor.oneToOne ? (
                <DoneIcon style={{ color: green[500] }} />
              ) : (
                <CancelIcon style={{ color: red[500] }} />
              )}
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function DegreeEducation({ tutor }) {
  const classes = useStyles();
  const [openDegreeIdentity, setopenDegreeIdentity] = useState(false);
  const [openWorkIdentity, setopenWorkIdentity] = useState(false);
  const [openpdf, setopenpdf] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  // console.log(tutor);
  return (
    <>
      <Grid container spacing={2}>
        {tutor.pg && tutor.pg.hasDegree && (
          <Grid item xs>
            <Card className={classes.cardroot} variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Post Graduation
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Name: {tutor.pg.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Institute Name: {tutor.pg.instituteName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Branch: {tutor.pg.branch}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Year Of Completion: {tutor.pg.yearOfCompletion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {tutor.ug && tutor.ug.hasDegree && (
          <Grid item xs>
            <Card className={classes.cardroot} variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Under Graduation
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Name: {tutor.ug.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Institute Name: {tutor.ug.instituteName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Branch: {tutor.ug.branch}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Year Of Completion: {tutor.ug.yearOfCompletion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {tutor.special_degrees && tutor.special_degrees.hasDegree && (
          <Grid item xs>
            <Card className={classes.cardroot} variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Special Degree
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Name: {tutor.special_degrees.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Institute Name: {tutor.special_degrees.instituteName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Branch: {tutor.special_degrees.branch}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Year Of Completion: {tutor.special_degrees.yearOfCompletion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        style={{ marginTop: 15 }}
      >
        Professional Experience
      </Typography>
      {tutor.currentDeisgnation ? <ProfessionalInfo tutor={tutor} /> : <Typography
        component="h4"
        variant="h6"
        gutterBottom
        className={classes.marg}
      >
        Optionally not entered
      </Typography>}


      <Grid item>
        <PreferenceTable tutor={tutor} />
      </Grid>

      {tutor.subjects && tutor.subjects.length > 0 && (
        <Grid item md={12} className={classes.marg}>
          <Card variant="outlined">
            <CardContent>
              <Typography component="h1" variant="h3" gutterBottom>
                Subjects List : Added By Tutor
              </Typography>
              <div className={classes.chips}>
                {tutor.subjects.map((sub) => (
                  <Chip label={sub.name} key={sub._id} color="primary" />
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      )}


      <Grid container spacing={2}>
        {tutor.identityProof && (
          <Grid item xs md={4}>
            <Card className={classes.cardroot}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="identityProof"
                  height="140"
                  image={tutor.identityProof}
                  title="Identity Proof"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Identity Proof
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => setopenDegreeIdentity(true)}
                >
                  View
                </Button>
              </CardActions>
            </Card>
            <Backdrop
              className={classes.backdrop}
              open={openDegreeIdentity}
              onClick={() => setopenDegreeIdentity(false)}
            >
              <img
                src={tutor.identityProof}
                alt="identityProof"
                className={classes.viewImage}
              />
            </Backdrop>
          </Grid>
        )}
        {tutor.workIdentity && (
          <Grid item xs md={4}>
            <Card className={classes.cardroot}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="workIdentity"
                  height="140"
                  image={tutor.workIdentity}
                  title="Work Identity"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Work Identity
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => setopenWorkIdentity(true)}
                >
                  View
                </Button>
              </CardActions>
            </Card>
            <Backdrop
              className={classes.backdrop}
              open={openWorkIdentity}
              onClick={() => setopenWorkIdentity(false)}
            >
              <img
                src={tutor.workIdentity}
                alt=""
                className={classes.viewImage}
              />
            </Backdrop>
          </Grid>
        )}
        {/* {tutor.degreeProofs && (
					<Grid item xs md={4}>
						<Card className={classes.cardroot}>
							<CardActionArea>
								<CardMedia
									component='img'
									alt='degree proof'
									height='140'
									image={tutor.degreeProofs}
									title='degree proof'
								/>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										Degree Proofs
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button
									size='small'
									color='primary'
									variant='contained'
									onClick={() => setopen(!open)}
								>
									View
								</Button>
							</CardActions>
						</Card>
						<Backdrop
							className={classes.backdrop}
							open={open}
							onClick={() => setopen(false)}
						>
							<img
								src={tutor.degreeProofs}
								alt=''
								className={classes.viewImage}
							/>
						</Backdrop>
					</Grid>
				)} */}

        {tutor.degreeProofs &&
          tutor.degreeProofs.length > 0 &&
          tutor.degreeProofs.map((prof) => (
            <Grid item xs md={4}>
              <Card>
                <CardActionArea>
                  {!prof.includes(".pdf") ?
                    <CardMedia
                      component="img"
                      alt="degree proof"
                      height="140"
                      image={prof}
                      title="degree proof"
                    /> :
                    <CardMedia
                      component="img"
                      alt="degree proof"
                      image="https://spbn.pusfatja.lapan.go.id/static/documents/pdf-placeholder.png"
                      height="140"
                      title="degree proof"
                    />}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Degree Proofs
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => setopenpdf(true)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
              {!prof.includes(".pdf") ? (
                <Backdrop
                  className={classes.backdrop}
                  open={openpdf}
                  onClick={() => setopenpdf(false)}
                >
                  <img src={prof} alt="" className={classes.viewImage} />
                </Backdrop>
              ) : (
                openpdf &&
                <Backdrop
                  className={classes.backdrop}
                  open={openpdf}
                  onClick={() => setopenpdf(false)}
                >
                  <ReactPdfViewer pdf={prof} />
                </Backdrop>
              )}
            </Grid>
          ))}

        {/* {tutor.subjects && tutor.subjects.length > 0 && (
          <Grid item md={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Subjects List
                </Typography>
                <div className={classes.chips}>
                  {tutor.subjects.map((sub, i) => (
                    <Chip label={sub.name} key={i} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        )} */}
      </Grid>
    </>
  );
}

export function LevelsList({
  loading,
  selectedSegState,
  setselectedSegState,
  segments,
  tutor,
  approvedLevels,
  permittedLevels,
}) {
  const classes = useStyles();
  const { levels } = useSelector((state) => state.tuitionSegments);

  const handleToggle = (value) => () => {
    // const currentIndex = permittedLevels.indexOf(value);

    var currentIndex = -1;
    permittedLevels.map((lvl, index) => {

      if (lvl._id == value._id) {
        currentIndex = index;
      }
    })

    const newpermittedLevels = [...permittedLevels];
    if (currentIndex === -1) {
      newpermittedLevels.push(value);
    } else {
      newpermittedLevels.splice(currentIndex, 1);
    }
    newpermittedLevels.map((ele) => {

    })
    approvedLevels(newpermittedLevels);
  };

  return (
    <>
      <TextField
        select
        fullWidth={true}
        label="Select Segment"
        value={selectedSegState}
        onChange={(e) => setselectedSegState(e.target.value)}
        helperText="Please select Segment"
      >
        {segments.map((option, i) => (
          <MenuItem key={option._id} value={option._id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      {levels && levels.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Approve Levels
          </Typography>
          <Card>
            <List
              // subheader={
              // 	<ListSubheader disableSticky={true} color='primary'>
              // 		Approve Levels
              // 	</ListSubheader>
              // }
              className={classes.tableRowSplit}
            >
              {levels.map((levl) => (
                <ListItem
                  key={levl._id}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(levl)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={permittedLevels.some((permittedlvl) => permittedlvl._id == levl._id)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": levl._id }}
                    />
                  </ListItemIcon>
                  <ListItemText id={levl._id} primary={levl.name} />
                </ListItem>
              ))}
            </List>
          </Card>
        </>
      ) : loading ? (
        <CircularProgress color="secondary" className={classes.progressBar} />
      ) : (
        <div style={{ height: 100, textAlign: "center" }}>
          <p>Nothing exists...</p>
        </div>
      )}
    </>
  );
}
