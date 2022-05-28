import {
	FETCH_USERS,
	FETCH_COACHING,
	FETCH_TUTORS,
	RESET_SELECTED_TUTOR,
	RESET_SELECTED_INSTITUTE,
	SELECTED_TUTOR,
	UPDATE_TUR_INS,
	UPDATE_APPROVE_TUR_INS,
	SELECTED_INSTITUTE,
	DELETE_USER,
	FETCH_REQUIREMENTS
} from '../constants/userConstanst';
import { toast } from 'react-toastify';

export const userReducer = (
	state = {
		appusers: [],
		tutors: [],
		totalTutors: 0,
		globalLeadCount: 0,
		coachingInstitutes: [],
		requirement: [],
		selectedTutor: null,
		selectedInstitute: null,
		loading: false,
	},
	action
) => {
	switch (action.type) {
		case FETCH_USERS:
			return {
				...state,
				// appusers: [...action.payload],
				appusers: action.payload,
			};
		case DELETE_USER:
			let remainingUsers = state.appusers.filter(e => e._id !== action.payload)
			return {
				...state,
				appusers: remainingUsers,
			};
		case FETCH_COACHING:
			return {
				...state,
				// coachingInstitutes: [...action.payload],
				coachingInstitutes: action.payload,
			};
		case UPDATE_APPROVE_TUR_INS:
			let instApproval = state.coachingInstitutes.map((e) => {
				if (e._id === action.payload._id) {
					e = action.payload;
				}
				return e;
			});
			let tutorApproval = state.tutors.map((e) => {
				if (e._id === action.payload._id) {
					e = action.payload;
				}
				return e;
			});
			return {
				...state,
				coachingInstitutes: instApproval,
				tutors: tutorApproval,
			};
		// case UPDATE_COACHING:
		// 	let newCoa = state.coachingInstitutes.map((e) => {
		// 		if (e._id === action.payload._id) {
		// 			e = action.payload;
		// 		}
		// 		return e;
		// 	});
		// 	return {
		// 		...state,
		// 		coachingInstitutes: newCoa,
		// 	};
		case FETCH_TUTORS:
			return {
				...state,
				// tutors: [...action.payload],
				tutors: action.payload.data,
				totalTutors: action.payload.count
			};
		case UPDATE_TUR_INS:
			let newCoa = state.coachingInstitutes.map((e) => {
				if (e._id === action.payload._id) {
					e = action.payload;
				}
				return e;
			});
			let newTur = state.tutors.map((e) => {
				if (e._id === action.payload._id) {
					e = action.payload;
				}
				return e;
			});
			return {
				...state,
				tutors: newTur,
				coachingInstitutes: newCoa,
			};
		case SELECTED_TUTOR:
			return {
				...state,
				selectedTutor: action.payload,
			};
		case RESET_SELECTED_TUTOR:
			return {
				...state,
				selectedTutor: {},
			};
		case RESET_SELECTED_INSTITUTE:
			return {
				...state,
				selectedInstitute: {},
			};
		case SELECTED_INSTITUTE:
			return {
				...state,
				// selectedInstitute: state.coachingInstitutes.filter(
				// 	(inst) => inst._id === action.payload
				// )[0],
				selectedInstitute: action.payload,
			};
		case FETCH_REQUIREMENTS: {
			let addedList = [...state.requirement, ...action.payload]
			
			return {
				...state,
				requirement: addedList,
				globalLeadCount: action.globalLeadCount
			};
		}
		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
};
