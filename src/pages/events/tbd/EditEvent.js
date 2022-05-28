import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Backdrop from "@material-ui/core/Backdrop";
import CreateSubEvent from "./CreateSubEvent";
import {
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  CardContent,
  CardActions,
} from "@material-ui/core";
import SubEventCards from "../subEvent/SubEventCards";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent, updateEvent } from "../../../actions/eventAction";
import { Card, Fade, Modal } from "@material-ui/core";
import EditSubEvent from "./EditSubEvent";
import TextFieldManager from "../../../components/TextFieldManager/index";
import { toast } from "react-toastify";
// import AddNewSubEvent from './AddNewSubEvent';
import FaqManager from "../../../components/FaqManager";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import EditManager from "../../../components/Editor/EditManager";
import EditFaq from "../../../components/FaqManager/EditFaq";
import UploadHandler from "../../../utils/UploadHandler";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    "& .MuiTextField-root": {
      margin: theme.spacing(2, "auto"),
    },
    "& .MuiFormControl-root": {
      margin: theme.spacing(2, "auto"),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    margin: "0 auto",
  },
  paper: {
    background: "#FFFFFF",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  chips: {
    marginRight: theme.spacing(0.5),
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    margin: "0 0",
    "& > *": {
      margin: theme.spacing(1, 1, 1, 0),
    },
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditEvent = ({ show, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // Redux Imports
  const { selectedCompetition } = useSelector((state) => state.eventSegments);

  const [name, setname] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [longDescription, setlongDescription] = useState([]);
  const [longDescriptions, setlongDescriptions] = useState("");
  const [isActive, setisActive] = useState(false);
  const [banner, setbanner] = useState("");
  const [guidelines, setguidelines] = useState([]);
  const [guideline, setguideline] = useState("");
  const [tags, settags] = useState([]);
  const [registrationStartDate, setRegistrationStartDate] = useState(
    Date.now()
  );
  const [registrationEndDate, setregistrationEndDate] = useState(Date.now());
  const [subEvents, setsubEvents] = useState([]);
  const [subevent, setsubevent] = useState({});
  const [awards, setawards] = useState([]);
  const [award, setaward] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [sponsors, setsponsors] = useState([]);
  const [sponsor, setsponsor] = useState({});
  const [gallery, setgallery] = useState([]);
  const [gallerys, setgallerys] = useState("");
  const [modalShow, setmodalShow] = useState(false);
  const [addEventModal, setaddEventModal] = useState(false);

  const [editFaq, setEditFaq] = useState({});
  const [openFaqManager, setOpenFaqManager] = useState(false);

  const [editor, openEditor] = useState(false);
  const [editData, setEditData] = useState("");

  const [indexInfo, setindexInfo] = useState(0);
  const [editType, seteditType] = useState("");
  const [addNewFaq, setaddNewFaq] = useState(false);

  const setinitialfields = (event) => {
    setname(event.name);
    setshortDescription(event.shortDescription);
    setlongDescription(event.longDescription);
    setisActive(event.isActive);
    setbanner(event.banner);
    setguidelines(event.guidelines);
    settags(event.tags);
    if (event.registrationStartDate || event.registrationEndDate) {
      setRegistrationStartDate(event.registrationStartDate.replace("Z", ""));
      setregistrationEndDate(event.registrationEndDate.replace("Z", ""));
    }
    setawards(event.awards);
    setFaqs(event.faqs);
    setgallery(event.gallery);
  };

  useEffect(() => {
    setinitialfields(selectedCompetition);
  }, [selectedCompetition]);

  const handlelongDescription = (longDescriptions) => {
    let newlongDescription = [...longDescription, longDescriptions];
    setlongDescription(newlongDescription);
  };
  const handleguideline = (guideline) => {
    let newGuidelines = [...guidelines, guideline];
    setguidelines(newGuidelines);
  };
  const handlegallery = (gallerys) => {
    let newgallerys = [...gallery, gallerys];
    setgallery(newgallerys);
  };
  const handleaward = (award) => {
    let newAwards = [...awards, award];
    setawards(newAwards);
  };
  const handleAddTag = (tag) => {
    let newTags = [...tags, tag];
    settags(newTags);
  };
  const getFaq = (faq) => {
    let newFaqs = [...faqs, faq];
    setFaqs(newFaqs);
  };

  const handleUpdateEvent = (e) => {
    dispatch(
      updateEvent(
        name,
        shortDescription,
        longDescription,
        isActive,
        banner,
        guidelines,
        tags,
        registrationStartDate,
        registrationEndDate,
        awards,
        gallery,
        faqs,
        selectedCompetition._id
      )
    );
    resetState();
    handleClose();
  };

  const resetState = () => {
    setname("");
    setshortDescription("");
    setlongDescription([]);
    setisActive(false);
    setbanner("");
    setguidelines([]);
    settags([]);
    setRegistrationStartDate("");
    setregistrationEndDate("");
    setawards([]);
    setFaqs([]);
    setgallery([]);
  };

  const editLongDescription = (i) => {
    setEditData(longDescription[i]);
    setindexInfo(i);
    seteditType("longDescription");
    setTimeout(() => {
      openEditor(true);
    }, 200);
  };
  const editGuidelines = (i) => {
    setEditData(guidelines[i]);
    setindexInfo(i);
    seteditType("guidelines");
    setTimeout(() => {
      openEditor(true);
    }, 200);
  };
  const editTag = (i) => {
    setEditData(tags[i]);
    setindexInfo(i);
    seteditType("tags");
    setTimeout(() => {
      openEditor(true);
    }, 200);
  };
  const editAwards = (i) => {
    setEditData(awards[i]);
    setindexInfo(i);
    seteditType("awards");
    setTimeout(() => {
      openEditor(true);
    }, 200);
  };
  const editGallery = (i) => {
    setEditData(gallery[i]);
    setindexInfo(i);
    seteditType("gallery");
    setTimeout(() => {
      openEditor(true);
    }, 200);
  };

  const handlePostEdit = () => {
    if (editType === "longDescription") {
      let newdes = longDescription.map((para, index) => {
        if (index === indexInfo) {
          return editData;
        } else {
          return para;
        }
      });
      setlongDescription(newdes);
    } else if (editType === "guidelines") {
      let newguide = guidelines.map((para, index) => {
        if (index === indexInfo) {
          return editData;
        } else {
          return para;
        }
      });
      setguidelines(newguide);
    } else if (editType === "tags") {
      let newtags = tags.map((para, index) => {
        if (index === indexInfo) {
          return editData;
        } else {
          return para;
        }
      });
      settags(newtags);
    } else if (editType === "awards") {
      let newawrd = awards.map((para, index) => {
        if (index === indexInfo) {
          return editData;
        } else {
          return para;
        }
      });
      setawards(newawrd);
    } else if (editType === "gallery") {
      let newgall = gallery.map((para, index) => {
        if (index === indexInfo) {
          return editData;
        } else {
          return para;
        }
      });
      setgallery(newgall);
    }
  };

  const deteleLongDescription = (i) => {
    let newdes = longDescription.filter((para, index) => {
      if (index === i) {
        return false;
      }
      return true;
    });
    setlongDescription(newdes);
  };
  const deteleGuidelines = (i) => {
    let newgui = guidelines.filter((para, index) => {
      if (index === i) {
        return false;
      }
      return true;
    });
    setguidelines(newgui);
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
  const deteleAwards = (i) => {
    let newawards = awards.filter((para, index) => {
      if (index === i) {
        return false;
      }
      return true;
    });
    setawards(newawards);
  };
  const deteleGallery = (i) => {
    let newgallery = gallery.filter((para, index) => {
      if (index === i) {
        return false;
      }
      return true;
    });
    setgallery(newgallery);
  };
  const handleEditFaq = (i) => {
    setEditFaq(faqs[i]);
    setindexInfo(i);
    setTimeout(() => {
      setOpenFaqManager(true);
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
  const handleDeleteFaq = (i) => {
    let newFaqs = faqs.filter((faq, index) => {
      if (index === i) {
        return false;
      }
      return true;
    });
    setFaqs(newFaqs);
  };

  const deleteSubEvent = (id) => {};
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
      <Dialog
        fullScreen
        open={show}
        onClose={handleClose}
        scroll={"paper"}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit A Event
            </Typography>
            {/* <Button autoFocus color='inherit' onClick={(e) => onClick(e)}>
                    save
                </Button> */}
          </Toolbar>
        </AppBar>
        <Container maxWidth={"md"}>
          <div className={classes.root}>
            <div style={{ display: "contents" }}>
              <TextField
                label="Event Name"
                fullWidth={true}
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <TextField
                label="Objective of Event"
                fullWidth={true}
                value={shortDescription}
                multiline
                rowsMax={4}
                onChange={(e) => setshortDescription(e.target.value)}
                helperText="one or two line objective of the event"
              />
              <Grid container spacing={2}>
                {longDescription &&
                  longDescription.map((ds, i) => (
                    <Grid item xs key={`des-${i}`}>
                      <Card>
                        <CardContent>
                          <Typography variant="body2" component="p">
                            {ds}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => editLongDescription(i)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => deteleLongDescription(i)}>
                            <Delete color="secondary" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              <TextFieldManager
                addField={handlelongDescription}
                addLabel={"About the event"}
              />
              <FormControlLabel
                control={
                  <Switch
                    fullWidth={true}
                    checked={isActive}
                    onChange={(e) => setisActive(e.target.checked)}
                  />
                }
                label={isActive ? "Event is Active" : "Event is Inactive"}
              />
              <TextField
                label="Banner"
                fullWidth={true}
                value={banner}
                // onChange={(e) => setbanner(e.target.value)}
              />
              <UploadHandler
                getUrl={(data) => setbanner(data.url)}
                text={"Upload Banner"}
              />
              <Grid container spacing={2}>
                {guidelines &&
                  guidelines.map((gui, i) => (
                    <Grid item xs key={`gui-${i}`}>
                      <Card>
                        <CardContent>
                          <Typography variant="body2" component="p">
                            {gui}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => editGuidelines(i)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => deteleGuidelines(i)}>
                            <Delete color="secondary" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              <TextFieldManager
                addField={handleguideline}
                addLabel={"Guidelines"}
              />

              {tags &&
                tags.map((tg, i) => (
                  <Chip
                    className={classes.chips}
                    key={i}
                    color="primary"
                    label={tg}
                    onDelete={() => deteleTag(i)}
                  />
                ))}

              <TextFieldManager addField={handleAddTag} addLabel={"Add Tag"} />
              <Grid container spacing={2}>
                {awards &&
                  awards.map((awar, i) => (
                    <Grid item xs key={`awar-${i}`}>
                      <Card>
                        <CardContent>
                          <Typography variant="body2" component="p">
                            {awar}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => editAwards(i)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => deteleAwards(i)}>
                            <Delete color="secondary" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              <TextFieldManager addField={handleaward} addLabel={"Awards"} />
              <Grid container spacing={2}>
                {gallery &&
                  gallery.map((gal, i) => (
                    <Grid item xs key={`gal-${i}`}>
                      <Card>
                        <CardContent>
                          <Typography variant="body2" component="p">
                            {gal}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => editGallery(i)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => deteleGallery(i)}>
                            <Delete color="secondary" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              <TextFieldManager addField={handlegallery} addLabel={"Gallery"} />
              <Grid container spacing={2}>
                {faqs &&
                  faqs.map((faq, i) => (
                    <Grid item xs key={i}>
                      <Card>
                        <CardContent>
                          <Typography variant="body2" component="p">
                            Question: {faq.question}
                          </Typography>
                          <Typography variant="body2" component="p">
                            Answer: {faq.awnser}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => handleEditFaq(i)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteFaq(i)}>
                            <Delete color="secondary" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              <div className={classes.margin}>
                <EditFaq
                  openFaqManager={openFaqManager}
                  editFaq={editFaq}
                  saveEdit={saveEditFaq}
                  handleClose={() => setOpenFaqManager(false)}
                />
                <Button
                  className={classes.margin}
                  variant="outlined"
                  color="primary"
                  onClick={() => setaddNewFaq(true)}
                >
                  Add FAQ
                </Button>
                <FaqManager
                  open={addNewFaq}
                  getFaq={getFaq}
                  handleClose={() => setaddNewFaq(false)}
                />
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    fullWidth={true}
                    label="Registration Starts"
                    type="datetime-local"
                    value={registrationStartDate}
                    onChange={(e) => setRegistrationStartDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    fullWidth={true}
                    label="Registration Ends"
                    type="datetime-local"
                    value={registrationEndDate}
                    onChange={(e) => setregistrationEndDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <div>
              <br />
              <Typography color="textSecondary" gutterBottom>
                SubEvents Section
              </Typography>
              <br />
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                {selectedCompetition.subEvents &&
                  selectedCompetition.subEvents.map((subevent) => (
                    <Grid item xs key={subevent._id}>
                      <SubEventCards
                        modalShow={modalShow}
                        setmodalShow={setmodalShow}
                        subevent={subevent}
                        deleteSubEvent={deleteSubEvent}
                      />
                    </Grid>
                  ))}
              </Grid>
              <br />
              <div className={classes.buttons}>
                <Typography variant="subtitle1" gutterBottom>
                  Add a Sub Event
                </Typography>
                <IconButton
                  aria-label="add sub-event"
                  onClick={() => {
                    setaddEventModal(!addEventModal);
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </div>
            </div>

            {addEventModal && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={addEventModal}
                onClose={() => {
                  setaddEventModal(!addEventModal);
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={show}>
                  <Card className={classes.paper}>
                    <CreateSubEvent
                      addEventModal={addEventModal}
                      setaddEventModal={setaddEventModal}
                      // existedEventId={selectedCompetition._id}
                    />
                  </Card>
                </Fade>
              </Modal>
            )}

            {modalShow && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalShow}
                onClose={() => {
                  setmodalShow(!modalShow);
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={modalShow}>
                  <Card className={classes.paper}>
                    <EditSubEvent
                      modalShow={modalShow}
                      setmodalShow={setmodalShow}
                    />
                  </Card>
                </Fade>
              </Modal>
            )}
          </div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleUpdateEvent(e)}
            >
              Save
            </Button>
          </div>
        </Container>
      </Dialog>
    </>
  );
};

export default EditEvent;
