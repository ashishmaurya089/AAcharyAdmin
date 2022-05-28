import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getRequirement } from "../../actions/userActions";
import TablePaginationActions from "../home/Pagination";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  TableFooter,
  TablePagination,
  IconButton,
  makeStyles,
  Collapse,
  Grid,
  Avatar,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown, Place } from "@material-ui/icons/";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default function Requirement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { requirement, globalLeadCount } = useSelector((state) => state.usersData);
  useEffect(() => {
    console.log('invoked dipatch')
    dispatch(getRequirement(page, rowsPerPage));
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <>
      <PageTitle title="Requirement" />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Seeker</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Place</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requirement
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                // if(row.seeker)
                return <Row key={row._id} row={row} />
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25
                ]}
                colSpan={3}
                count={globalLeadCount}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log(row);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">
          <Grid container>
            <Grid item md={12} lg={2}>
              <Avatar src={row?.seeker?.profileImage} />
            </Grid>
            <Grid item md={12} lg={10}>
              {row?.seeker?.name}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>{row?.seeker?.phoneNumber}</TableCell>
        <TableCell>{row?.forSubject?.name}</TableCell>
        <TableCell>{row?.seeker?.place?.locality}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Paper
              style={{
                padding: 15,
                maxWidth: 700,
                margin: "auto",
                paddingBottom: 10,
                marginBottom: 10,
              }}
            >
              <Grid container>
                <Grid
                  item
                  container
                  style={{ borderBottom: "1px solid grey", paddingBottom: 10 }}
                >
                  <Grid item xs={2}>
                    <Avatar
                      src={row?.seeker?.profileImage}
                      style={{ width: 80, height: 80 }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h6">{row.seeker.name}</Typography>
                    <Typography variant="subtitle2">
                      {row.seeker.phoneNumber}
                    </Typography>
                    <Typography variant="subtitle2">
                      <Place style={{ fontSize: 14 }} />{" "}
                      {row?.seeker?.place?.locality}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  style={{ borderBottom: "1px solid grey", paddingBottom: 10 }}
                >
                  <Grid xs={12} item>
                    <Typography variant="h6" gutterBottom>
                      Subject
                    </Typography>
                  </Grid>

                  <Typography variant="body2">
                    Name: {row?.forSubject?.name} <br />
                    Level: {row?.forSubject?.level?.name}
                    <br />
                    Stream: {row?.forSubject?.stream?.name}
                  </Typography>
                </Grid>
                <Grid item container>
                  <Grid item xs={6}>
                    Learning Mode: {row?.learningMode}
                  </Grid>
                  <Grid item xs={6}>
                    Start from: {row?.startFrom}{" "}
                  </Grid>
                  <Grid item xs={6}>
                    Duration: {row?.duration}
                  </Grid>
                  <Grid item xs={6}>
                    Gender Preference: {row?.genderPreference}
                  </Grid>
                  <Grid item xs={6}>
                    Location Preference: {`${row?.place?.place}, ${row?.place?.state}`}
                  </Grid>
                  <Grid item xs={6}>
                    Price Range: {`${row?.priceRange?.min} - ${row?.priceRange?.max}`}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
