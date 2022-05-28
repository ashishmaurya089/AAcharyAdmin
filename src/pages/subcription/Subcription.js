import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import DeleteIcon from '@material-ui/icons/DeleteForever';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
// import Table from "../dashboard/components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
// data

import { getAllUsers, deleteUser } from "../../actions/userActions";

export default function Subcription() {
  const dispatch = useDispatch();
  const { appusers, loading } = useSelector((state) => state.usersData);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <>
      <PageTitle title="Subscription" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: "Name",
                render: (rowData) => {
                  return rowData.name || rowData.firstName;
                },
              },
              {
                title: "From",
                render: (rowData) => {
                  return rowData.name || rowData.firstName;
                },
              },
              {
                title: "To",
                render: (rowData) => {
                  return rowData.name || rowData.firstName;
                },
              },

            //   { title: "Phone", field: "phoneNumber", type: "numeric" },
            //   { title: "Email", field: "email", type: "string" },
              {
                title: "Type",
                render: (rowData) => {
                  if (rowData.isAdmin) {
                    return <p>Admin</p>;
                  }
                  if (rowData.isTutor) {
                    return <p>Tutor</p>;
                  }
                  if (rowData.isCollege) {
                    return <p>College</p>;
                  }
                  if (rowData.isLearner) {
                    return <p>Student</p>;
                  }
                  if (rowData.isParent) {
                    return <p>Parent</p>;
                  }
                },
              },
            ]}
            data={appusers}
            title="SUBSCRIPTION LIST"
            isLoading={loading}
            // actions={[
            //   {
            //     icon: () => <DeleteIcon />,
            //     tooltip: 'Delete User',
            //     onClick: (event, rowData) => dispatch(deleteUser(rowData._id)),
            //   }
            // ]}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: '#000',
                color: '#FFF',
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
