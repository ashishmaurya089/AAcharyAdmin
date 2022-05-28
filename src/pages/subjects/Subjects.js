import React, { useEffect, useState, useRef } from "react";
import { Grid, Select, MenuItem } from "@material-ui/core";
import MaterialTable from 'material-table'
import queryString from 'query-string'
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { getSubjects, clearSubjects, editSubject, deleteSubject, selectLevel, getStreams, getCategories } from '../../actions/subjectActions'


export default function Subjects() {
    let { level } = useParams();
    let history = useHistory();
    const dispatch = useDispatch()
    let query = queryString.parse(useLocation().search)
    const [count, setCount] = useState(0)
    const [perPage, setperPage] = useState(11)

    const { subjects, streams, categories, levels, loading, hasNext, page, selectedLevelId, selectedStreamId } = useSelector((state) => state.tuitionSegments)

    useEffect(() => {
        console.log('setting level from ->', selectedLevelId, 'to ->', query.id)
        dispatch(selectLevel(query.id))
        return () => {
            console.log('clearing the table')
            dispatch(clearSubjects())
        }
    }, [query.id])
    useEffect(() => {
        console.log('getting streams')
        dispatch(getStreams(selectedLevelId))
        return () => {
        }
    }, [selectedLevelId])
    useEffect(() => {
        console.log('getting categories')
        dispatch(getCategories(selectedStreamId))
        return () => {
        }
    }, [selectedStreamId])

    useEffect(() => {
        if (selectedLevelId !== "") {
            console.log('getting subjects data for this level', selectedLevelId)
            dispatch(getSubjects(query.id, page, perPage))
        }
        return () => {
            console.log('selectedLevelId changeds')
        }
    }, [selectedLevelId, perPage])

    const handlePageChange = (pg) => {
        if (pg > page) {
            console.log('dispatching')
            dispatch(getSubjects(query.id, pg, perPage))
        }
    }
    // const getData = () => {
    //     if (subjects.length > 0) {
    //         let finalSubjects;
    //         finalSubjects = subjects.filter(sub => sub !== undefined)
    //         finalSubjects = finalSubjects.map(sub => {
    //             if (sub !== undefined) {
    //                 sub.streamName = sub.stream ? sub.stream.name : 'stream not selected';
    //                 sub.streamId = sub.stream ? sub.stream._id : null;
    //                 sub.categoryName = sub.category ? sub.category.name : 'no category';
    //                 sub.categoryId = sub.category ? sub.category._id : null
    //                 return sub
    //             } else return null
    //         })
    //         if (finalSubjects.length > 0) {
    //             return finalSubjects
    //         } else {
    //             return []
    //         }
    //     } else {
    //         return []
    //     }

    // }

    const handleClickFn = () => {
        history.push('/app/addSub')
    }

    const handlePerPageChange = (pageSize) => {
        setperPage(pageSize + 1)
    }
    return (
        <>
            <PageTitle title={`${level} Level Subjects`} button={'Add Subject'} handleClick={handleClickFn} />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MaterialTable
                        columns={[
                            { title: 'Name', field: 'name' },
                            {
                                title: 'Stream',
                                field: 'stream',
                                render: rowData => rowData.stream.name,
                                editable: 'never'

                            },
                            { title: 'Description', field: 'description', type: 'string' },
                            { title: 'Has Category', field: 'hasCategory', type: 'boolean' },
                            {
                                title: 'Category', field: 'categoryName', render: rowData => rowData.category.name,
                                editComponent: ({ value, onChange, rowData }) => (
                                    <Select
                                        value={value}
                                        onChange={(event) => {
                                            console.log('setting value', event.target.value)
                                            onChange(event.target.value)
                                        }}>
                                        {categories.map(c => <MenuItem
                                            key={c._id}
                                            value={c}>{c.name}</MenuItem>)}
                                    </Select>
                                )
                            },
                        ]}
                        data={subjects}
                        title={`${level} List`}
                        isLoading={loading}
                        page={page}
                        options={{
                            pageSize: perPage - 1,
                            pageSizeOptions: [perPage - 1]
                        }}
                        onChangePage={hasNext ? handlePageChange : null}
                        editable={{
                            onRowUpdate: (newData, oldData) => {
                                console.log('newData->', newData, 'oldData->', oldData)

                                return new Promise((resolve) => {
                                    dispatch(editSubject(newData));
                                    setCount(count + 1);
                                    resolve();
                                });
                            },
                            onRowDelete: (oldData) => {
                                return new Promise((resolve) => {
                                    dispatch(deleteSubject(oldData._id));
                                    setCount(count + 1);
                                    resolve();
                                });
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}
