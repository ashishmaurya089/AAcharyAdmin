import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Divider,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableFooter,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Avatar,
} from "@material-ui/core";
import axios from "../../axios";
import TablePaginationActions from "./Pagination";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { getCreditDetails } from "../../actions/commonActions";
import PageTitle from "../../components/PageTitle/PageTitle";

const useStyle = makeStyles({
  Registration: {
    margin: "10px 0",
    textAlign: "center",
  },
});

export default function Home() {
  const classes = useStyle();
  const dispatch = useDispatch();
  let initdate = new Date();
  initdate.setDate(initdate.getDate() - 7);
  const [startDate, setstartDate] = useState(initdate);
  const [endDate, setendDate] = useState(Date.now());
  const [count, setcount] = useState(0);
  const { credits, loading } = useSelector((state) => state.commonData);
  // console.log(credits);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [learnersCount, setLearnersCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);
  const [tutorsCount, setTutorsCount] = useState(0);
  const [coachingCentersCount, setCoachingCentersCount] = useState(0);
  const [filter, setFilter] = useState("All");
  const [orderSummary, setOrderSummary] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const filterOption = [
    "All",
    "competition",
    "skill",
    "workshop",
    "coins",
    "subscription",
  ];
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  async function getRegStat() {
    const { data } = await axios.get(
      "/api/admin/adminHomeStats"
    )
    if (data) {
      setLearnersCount(data.data.learnersCount);
      setParentsCount(data.data.parentsCount);
      setTutorsCount(data.data.tutorsCount);
      setCoachingCentersCount(data.data.coachingCentersCount);
    }
  };
  useEffect(() => {
    // dispatch(getCreditDetails(startDate, endDate));
    getRegStat()
    handleGetData();
  }, []);
  const handleGetData = async () => {

    const { data } = await axios.post("/api/admin/ordersSummary", {
      start: startDate,
      end: endDate,
    });


    const orders = data.data.map((order) => {
      var { buyer, amount, consumedFor } = order;
      amount = amount / 100;
      var name = "",
        profileImage = "";
      if (buyer) {
        name = buyer.name;
        if (buyer.profileImage) {
          profileImage = buyer.profileImage;
        }
      }
      return {
        profileImage,
        name,
        amount,
        consumedFor,
      };
    })
    setRows(orders);
    setOrderSummary(orders);
  }
  const handleFilterChange = (event) => {
    const appliedFilter = event.target.value;

    setFilter(appliedFilter);
    if (appliedFilter === "All") {

      setRows(orderSummary);

    }
    else
      setRows(orderSummary.filter(order => appliedFilter === order.consumedFor))
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Date Selection */}
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
              value={startDate}
              onChange={(date) => setstartDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              value={endDate}
              onChange={(date) => setendDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleGetData}
          >
            Get Details
          </Button>
        </Grid>
      </Grid>
      {/* registration stats */}
      <PageTitle title="Registrations" />
      {/* <Typography variant="h4" align="center">
        Registrations
      </Typography> */}
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="space-around"
        alignContent="center"
        className={classes.Registration}
      >
        <Grid item xs={6} md={3}>
          <Card>
            <CardHeader title={"Total Learner"} />
            <Divider />
            <CardContent>{learnersCount}</CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardHeader title={"Total Parent"} />
            <Divider />
            <CardContent>{parentsCount}</CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardHeader title={"Total Tutor"} />
            <Divider />
            <CardContent>{tutorsCount}</CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardHeader title={"Total Coaching Center"} />
            <Divider />
            <CardContent>{coachingCentersCount}</CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* order Summary   */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Order Summary
              </TableCell>
              <TableCell align="right">
                <FormControl>
                  <Select
                    value={filter}
                    style={{ width: "150px", textAlign: "start" }}
                    onChange={handleFilterChange}
                  >
                    {filterOption.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Filter</FormHelperText>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Buyer</TableCell>
              <TableCell align="right">Amount Spent</TableCell>
              <TableCell align="right">Consumed For</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Grid container>
                    <Grid item xs={2}>
                      <Avatar src={row.profileImage} />
                    </Grid>
                    <Grid item xs={10}>
                      {row.name}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">
                  {row.consumedFor ? row.consumedFor : "No Data"}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={1}>Total Buyer:</TableCell>
              <TableCell align="right">{rows.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Amount Spent:</TableCell>
              <TableCell align="right">{rows.reduce((sum, row) => sum + row.amount, 0)}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: rows.length }]}
                colSpan={3}
                count={rows.length}
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
      {/* Date Selection */}
      {/* <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <hr />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MaterialTable
              columns={[
                { title: "Value", field: "creditValue" },
                {
                  title: "Purpose",
                  field: "debitedFor",
                },
                { title: "UserId", field: "user" },
              ]}
              data={credits}
              title="PURCHASE LIST"
              isLoading={loading}
              options={{
                actionsColumnIndex: -1,
                headerStyle: {
                  backgroundColor: "#000",
                  color: "#FFF",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
}
