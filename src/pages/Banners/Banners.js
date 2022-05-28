import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanners, addBanner } from "../../actions/commonActions";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import SingleLineImageList from "./SingleImageList";
export default function Banners() {
  const { banners, loading } = useSelector((state) => state.commonData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanners());
  }, []);

  return (
    <>
      <PageTitle title="BANNERS" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SingleLineImageList data={banners} />
        </Grid>
      </Grid>
    </>
  );
}
