import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import {
	createSubEvent,
	createStage,
	updateStage,
	deleteStage,
} from '../../../actions/eventAction';
import { toast } from 'react-toastify';

export default function CreateStageTable() {
	const dispatch = useDispatch();
	const { selectedSubEvent, selectedCompetition, allStages, loading } =
		useSelector((state) => state.eventSegments);

	useEffect(() => {
		console.log('selectedSubEvent Stages render');
	}, [allStages]);

	const [currency, setcurrency] = useState('INR');
	const [currencySymbol, setcurrencySymbol] = useState('₹');
	const [count, setCount] = useState(0);

	return (
		<MaterialTable
			columns={[
				{
					title: 'Order',
					field: 'stageOrder',
					type: 'numeric',
				},
				{
					title: 'Name',
					field: 'stageName',
				},
				{ title: 'Cost', field: 'stageCost', type: 'numeric' },
			]}
			// TODO: Dout on this selectedSubEvent.stages also have data while creating but not populate
			data={allStages}
			title={'Stage Creation'}
			isLoading={loading}
			editable={{
				onRowUpdate: (newData, oldData) => {
					console.log('newData->', newData, 'oldData->', oldData);
					return new Promise((resolve) => {
						dispatch(
							updateStage(
								'edit',
								newData,
								currency,
								currencySymbol,
								selectedSubEvent._id,
								selectedCompetition._id
							)
						);
						setCount(count + 1);
						resolve();
					});
				},
				onRowDelete: (oldData) => {
					return new Promise((resolve) => {
						dispatch(
							deleteStage(
								oldData._id,
								selectedSubEvent._id,
								selectedCompetition._id
							)
						);
						setCount(count + 1);
						resolve();
					});
				},
				onRowAdd: (newData) => {
					return new Promise((resolve) => {
						console.log('newData->', newData);
						if (selectedSubEvent._id && selectedCompetition._id) {
							dispatch(
								createStage(
									'new',
									newData,
									currency,
									currencySymbol,
									selectedSubEvent._id,
									selectedCompetition._id
								)
							);
						} else {
							toast.info('IDs Missing');
						}

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
