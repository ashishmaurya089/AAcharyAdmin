import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import ImageCard from "./ImageCards";
import UploadHandler from "../../utils/UploadHandler";
import { addBanner, deleteBanner } from "../../actions/commonActions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
export default function SingleLineImageList({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comp, setcomp] = useState([]);
  const [skill, setskill] = useState([]);
  const [work, setwork] = useState([]);
  const uploadFile = (data, type) => {
    let url = data.url;
    console.log(url);
    dispatch(addBanner(type, url, true));
  };
  const handleDelete = (id) => {
    dispatch(deleteBanner(id));
  };
  useEffect(() => {
    let newComp = data.filter((item) => item.type === "competition");
    setcomp(newComp);
    let newSkill = data.filter((item) => item.type === "skill");
    setskill(newSkill);
    let newWork = data.filter((item) => item.type === "workshop");
    setwork(newWork);
  }, [data]);
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <h4>Competition Banners</h4>
        <Button>
          <UploadHandler
            getUrl={(data) => uploadFile(data, "competition")}
            text={"Upload Competition Banner"}
          />
        </Button>
        <Grid container justifyContent="center" spacing={5}>
          {comp.map((item) => (
            <Grid key={item._id} item>
              <ImageCard item={item} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <h4>Skill Banners</h4>
        <Button>
          <UploadHandler
            getUrl={(data) => uploadFile(data, "skill")}
            text={"Upload Skill Banner"}
          />
        </Button>
        <Grid container justifyContent="center" spacing={5}>
          {skill.map((item) => (
            <Grid key={item._id} item>
              <ImageCard item={item} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <h4>Workshop Banners</h4>
        <Button>
          <UploadHandler
            getUrl={(data) => uploadFile(data, "workshop")}
            text={"Upload Workshop Banner"}
          />
        </Button>
        <Grid container justifyContent="center" spacing={5}>
          {work.map((item) => (
            <Grid key={item._id} item>
              <ImageCard item={item} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" spacing={5}></Grid>
      </Grid>
    </Grid>
  );
}
