import React from 'react'
import { Grid } from "@material-ui/core";
import MaterialTable from 'material-table'
import PageTitle from "../PageTitle/PageTitle";

export default function TableComponent({ title, data, columns, loading }) {
    return (
        <>
            <PageTitle title={title} />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MaterialTable
                        columns={columns}
                        data={data}
                        title={title}
                        isLoading={loading}
                    />
                </Grid>
            </Grid>
        </>
    )
}
