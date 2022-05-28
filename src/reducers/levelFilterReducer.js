import {
	ADD_LEVEL_FILTER,
	FETCH_FILTER_LEVELS,
	UPDATE_LEVEL_FILTER,
	DELETE_LEVEL_FILTER,
} from '../constants/levelFilterConstants';

import { toast } from 'react-toastify';

const initialState = {
	filterlevels: [],
};

export const levelFilterReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case FETCH_FILTER_LEVELS:
			console.log(payload);
			return {
				...state,
				filterlevels: payload,
			};
		case ADD_LEVEL_FILTER:
			console.log(payload);
			return {
				...state,
				filterlevels: [...state.filterlevels, payload],
			};
		case UPDATE_LEVEL_FILTER:
			let newData = state.filterlevels.map((filterlevl) => {
				if (filterlevl._id === payload._id) {
					filterlevl = payload;
				}
				return filterlevl;
			});
			return {
				...state,
				filterlevels: newData,
			};
		case DELETE_LEVEL_FILTER:
			let remainingData = state.filterlevels.filter(
				(fillevl) => fillevl._id !== action.payload
			);
			return {
				...state,
				filterlevels: remainingData,
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
