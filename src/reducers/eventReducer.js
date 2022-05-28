import {
	CREATE_EVENT,
	CREATE_STAGE,
	ADD_SUBEVENT,
	SELECT_SUBEVENT,
	CREATE_SUBEVENT,
	UPDATE_STAGE,
	FETCH_COMPETITIONS,
	SELECT_COMPETITIONS,
	DELETE_COMPETITIONS,
	UPDATE_SUBEVENT,
	UPDATE_COMPETITIONS,
	REFRESH_COMPETITION,
	REFRESH_SUBEVENT,
	DELETE_EVENT,
	DELETE_SUBEVENT,
	DELETE_STAGE,
	RESET_SELECTED_COMPETITION,
	ADD_SPONSOR,
	UPDATE_SPONSOR,
	DELETE_SPONSOR,
	FETCH_SPONSORS,
	GET_COMPETITION_PARTICIPANTS,
	CREATE_NEW_SUBEVENT,
} from '../constants/eventConstants';

import { toast } from 'react-toastify';
import { SignalCellularNullOutlined } from '@material-ui/icons';

const initialState = {
	allCompetitions: [],
	allCompetitionsParticipants: [],
	selectedCompetition: null,
	allSubEvents: [],
	selectedSubEvent: null,
	allStages: [],
	allSponsors: [],
	sponsors: [],
	loading: false,
};

export const eventReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_COMPETITIONS:
			return {
				...state,
				allCompetitions: payload,
			};
		case SELECT_COMPETITIONS:
			console.log('selected competition :', payload);
			return {
				...state,
				selectedCompetition: payload,
				allSubEvents: payload.subEvents,
			};
		case CREATE_EVENT:
			return {
				...state,
				allCompetitions: [...state.allCompetitions, payload],
				selectedCompetition: payload,
			};
		case UPDATE_COMPETITIONS:
			console.log(payload);
			let newCompetitions = state.allCompetitions.map((c) => {
				if (c._id === payload._id) {
					return payload;
				}
				return c;
			});
			return {
				...state,
				selectedCompetition: payload,
				allCompetitions: newCompetitions,
			};
		case RESET_SELECTED_COMPETITION:
			return {
				...state,
				selectedCompetition: null,
				selectedSubEvent: null,
				allSubEvents: [],
				allStages: [],
			};
		case CREATE_NEW_SUBEVENT:
			console.log('CREATE_NEW_SUBEVENT', payload);
			return {
				...state,
				allSubEvents: [...state.allSubEvents, payload],
				selectedSubEvent: payload,
			};
		case SELECT_SUBEVENT:
			console.log(payload);
			return {
				...state,
				selectedSubEvent: payload,
				allStages: payload.stages,
			};
		case UPDATE_SUBEVENT:
			console.log(payload);
			let newSubEvents = state.allSubEvents.map((sub) => {
				if (sub._id === payload._id) {
					return payload;
				}
				return sub;
			});
			return {
				...state,
				allSubEvents: newSubEvents,
				selectedSubEvent: payload,
			};
		case DELETE_SUBEVENT:
			console.log('DELETE_SUBEVENT', payload);
			return {
				...state,
				allSubEvents: state.allSubEvents.filter((se) => se._id !== payload),
			};
		case 'RESET_SUBEVENT':
			return {
				...state,
				selectedSubEvent: {},
				allStages: [],
			};
		case CREATE_STAGE:
			let stages;
			if (payload.type === 'new') {
				// new stage
				stages = [...state.allStages, payload.stage];
				console.log('new stages :', stages.length);
			} else {
				// edit stage
				stages = state.allStages.map((stage) => {
					if (stage._id === payload.stage._id) {
						return payload.stage;
					} else {
						return stage;
					}
				});
			}
			console.log('inside create stage reducer', payload.stage);
			return {
				...state,
				allStages: stages,
			};
		case DELETE_STAGE:
			let newstages = state.allStages.filter((stg) => stg._id !== payload);
			return {
				...state,
				allStages: newstages,
			};
		case 'SET_LOADING':
			return {
				...state,
				loading: payload,
			};
		case DELETE_EVENT:
			let remainingData = state.allCompetitions.filter(
				(comp) => comp._id !== action.payload
			);
			console.log(action.payload);
			return {
				...state,
				allCompetitions: remainingData,
			};
		case REFRESH_COMPETITION:
			console.log(payload);
			return {
				...state,
				selectedCompetition: payload,
			};
		case FETCH_SPONSORS:
			return {
				...state,
				allSponsors: payload,
			};
		case ADD_SPONSOR:
			return {
				...state,
				sponsors: payload,
				allSponsors: [...state.allSponsors, payload],
			};
		case UPDATE_SPONSOR:
			let updatedSponsors = state.allSponsors.map((spon) => {
				if (spon._id === action.payload._id) {
					console.log('found the modified spon');
					spon = action.payload;
				}
				return spon;
			});
			return {
				...state,
				allSponsors: updatedSponsors,
			};
		case DELETE_SPONSOR:
			let remainingSpon = state.allSponsors.filter(
				(spon) => spon._id !== action.payload
			);
			return {
				...state,
				allSponsors: remainingSpon,
			};
		case GET_COMPETITION_PARTICIPANTS:
			return {
				...state,
				allCompetitionsParticipants: payload,
			};
		default:
			return state;
	}
};
