import {
	CREATE_WORKSHOP,
	UPDATE_WORKSHOP,
	FETCH_WORKSHOPS,
	EDIT_WORKSHOPS,
	DELETE_WORKSHOP,
	RESET_SELECTED_WORKSHOP,
	GET_WORKSHOP_PARTICIPANTS,
} from '../constants/workshopConstants';

import { toast } from 'react-toastify';

const initialState = {
	workshop: [],
	update: {},
	loading: false,
	allWorkshops: [],
	allWorkshopParticipants: [],
	selectedWorkshop: {},
};

export const workshopReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CREATE_WORKSHOP:
			console.log(payload);
			// let newWork = state.allWorkshops.map((wor) => {
			// 	if (wor._id === payload._id) {
			// 		wor = payload;
			// 	}
			// 	return wor;
			// });
			return {
				...state,
				workshop: payload,
				allWorkshops: [...state.allWorkshops, payload],
			};
		case UPDATE_WORKSHOP:
			console.log(payload);
			let newData = state.allWorkshops.map((wor) => {
				if (wor._id === payload._id) {
					wor = payload;
				}
				return wor;
			});
			return {
				...state,
				allWorkshops: newData,
			};
		case DELETE_WORKSHOP:
			let remainingData = state.allWorkshops.filter(
				(wor) => wor._id !== action.payload
			);
			console.log(action.payload);
			return {
				...state,
				allWorkshops: remainingData,
			};
		case FETCH_WORKSHOPS:
			console.log(payload);
			return {
				...state,
				// TODO: logic create & allworkshops
				allWorkshops: action.payload,
			};
		case EDIT_WORKSHOPS:
			console.log('selected workshop :', payload);
			return {
				...state,
				selectedWorkshop: payload,
			};
		case GET_WORKSHOP_PARTICIPANTS:
			return {
				...state,
				allWorkshopParticipants: payload,
			};
		case RESET_SELECTED_WORKSHOP:
			return {
				...state,
				selectedWorkshop: {},
			};

		case 'SET_LOADING':
			return {
				...state,
				loading: payload,
			};

		default:
			return state;
	}
};
