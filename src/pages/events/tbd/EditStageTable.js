import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { createStage, updateStage } from '../../../actions/eventAction';

export default function EditStageTable() {
	const dispatch = useDispatch();
	const [count, setCount] = useState(0);
	const [currency, setcurrency] = useState('INR');
	const [currencySymbol, setcurrencySymbol] = useState('₹');
	const [page, setpage] = useState(0);

	const { selectedCompetition, loading, selectedSubEvent, subEventStages } =
		useSelector((state) => state.eventSegments);

	useEffect(() => {
		setpage(0);
	}, [subEventStages]);

	return (
		<MaterialTable
			page={page}
			isLoading={loading}
			columns={[
				{ title: 'Order', field: 'stageOrder', type: 'numeric' },
				{
					title: 'Name',
					field: 'stageName',
				},
				{ title: 'Cost', field: 'stageCost', type: 'numeric' },
			]}
			data={subEventStages}
			title={'Edit Stage Creation'}
			editable={{
				onRowUpdate: (newData, oldData) => {
					console.log('newData->', newData, 'oldData->', oldData);
					return new Promise((resolve) => {
						dispatch(updateStage(newData, currency, currencySymbol));
						setCount(count + 1);
						resolve();
					});
				},
				onRowDelete: (oldData) => {
					return new Promise((resolve) => {
						// dispatch(deleteSubject(oldData._id));
						// setCount(count + 1);
						resolve();
					});
				},
				onRowAdd: (newData) => {
					console.log('newData->', newData);
					return new Promise((resolve) => {
						console.log('com Id', selectedCompetition._id);
						dispatch(
							createStage(
								newData,
								currency,
								currencySymbol,
								selectedSubEvent._id,
								selectedCompetition._id
							)
						);
						// if (subEvent._id) {
						// 	dispatch(
						// 	);
						// } else if (event._id) {

						// 	dispatch(
						// 		createStage(newData, currency, currencySymbol, newsubEvent._id)
						// 	);
						// }
						setCount(count + 1);
						resolve();
					});
				},
			}}
			options={{
				actionsColumnIndex: -1,
			}}
		/>
	);
}
