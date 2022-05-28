// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";

// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";
// import PhotoCamera from "@material-ui/icons/PhotoCamera";

// import ImageCard from "./ImageCards";


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     height: 140,
//     width: 100,
//   },
//   control: {
//     padding: theme.spacing(2),
//   },
// }));
// export default function SingleLineImageList({ data }) {
//   const classes = useStyles();

//   const handleDelete = (id) => {
//     dispatch(deleteNewsImage(id));
//   };

//   return (
//     <Grid container className={classes.root} spacing={2}>
//       <Grid item xs={12}>
//         <h4>News Gallery</h4>

//         <Grid container justifyContent="center" spacing={5}>
//           {data.map((item) => (
//             <Grid key={item._id} item>
//               <ImageCard item={item} handleDelete={handleDelete} />
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import { addNewsImage, deleteNewsImage, getNewsgallery } from "../../actions/commonActions";
import { Button, TextField } from "@material-ui/core";
import UploadHandler from "../../utils/UploadHandler";
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
export default function ImageGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { newsgallery, loading } = useSelector((state) => state.commonData);
  const [caption, setcaption] = useState("");
  const [counter, setcounter] = useState(0)
  useEffect(() => {
    dispatch(getNewsgallery());
  }, [counter]);
  const uploadFile = (data) => {
    if (caption == "") {
      toast.warn("Please add the caption before uploading image")
    } else {
      let url = data.url;
      console.log(url);
      dispatch(addNewsImage(url, caption, true));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteNewsImage(id));
    setcounter(counter + 1)
  }

  return (
    <>

      <TextField
        className={classes.margin}
        fullWidth={true}
        value={caption}
        onChange={(e) => setcaption(e.target.value)}
        id="input-with-icon-textfield"
        label="Caption"
      />
      <Button>
        <UploadHandler
          getUrl={(data) => uploadFile(data)}
          text={"Upload Gallery Image"}
        />
      </Button>
      <div className={classes.root}>
        <ImageList rowHeight={180} className={classes.imageList}>
          <ImageListItem key="Subheader" cols={3} style={{ height: 'auto' }}>
          </ImageListItem>
          {newsgallery.map((item) => (
            <ImageListItem key={item._id}>
              <img src={item.url} alt={item.caption} />
              <ImageListItemBar
                title={item.caption}
                actionIcon={
                  <IconButton aria-label={`info about ${item.title}`} className={classes.icon} onClick={() => handleDelete(item._id)}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </>
  );


}
