import React from "react";
import {
  Grid
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import BigStat from "./components/BigStat/BigStat";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import useStyles from "./styles";
import Widget from "../../components/Widget/Widget";
import { Typography, Button } from "../../components/Wrappers/Wrappers";
import { useHistory } from "react-router-dom";

export default function Levels() {
  var classes = useStyles();

  const { levels, loading } = useSelector((state) => state.tuitionSegments)
  const history = useHistory();

  const redirectTo = (path) => {
    history.push(path);
  }
  const stats = levels.map(lev => {
    return {
      product: lev.name,
      id: lev._id,
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "primary",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    }
  })
  return (
    <>
      <PageTitle title="Levels" />
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            color={"secondary"}
            size="small"
            className="px-2"
            variant="contained">Add new Level</Button>
          <Button
            color={"warning"}
            size="small"
            className="px-2"
            variant="contained"
            onClick={() => redirectTo('/app/addStream')}>Add new Stream</Button>

          <Button
            color={"success"}
            size="small"
            className="px-2"
            variant="contained"
            onClick={() => redirectTo('/app/addCat')}>Add new Category</Button>

          <Button
            color={"primary"}
            size="small"
            className="px-2"
            variant="contained"
            onClick={() => redirectTo('/app/addSub')}>Add new Subject</Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {stats.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <Link to={`/app/edulevels/${stat.product}?id=${stat.id}`}>
              <BigStat {...stat} />
            </Link>
          </Grid>
        ))}
      </Grid>

    </>
  );
}

