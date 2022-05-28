import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import ImageGrid from "./ImageGrid";
export default function Banners() {

    return (
        <>
            <PageTitle title="NEWS GALLERY" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <ImageGrid />
                </Grid>
            </Grid>
        </>
    );
}
