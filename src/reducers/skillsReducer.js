import {
	CREATE_SKILLS,
	UPDATE_SKILLS,
	EDIT_SKILLS,
	ADD_INSTRUCTOR,
	UPDATE_INSTRUCTOR,
	FETCH_SKILLS,
	GET_INSTRUCTOR,
	FETCH_INSTRUCTORS,
	DELETE_SKILL,
	DELETE_INSTRUCTOR,
	GET_SKILL_PARTICIPANTS,
	GET_SKILL_DEMO_PARTICIPANTS,
} from '../constants/skillsConstants';

import { toast } from 'react-toastify';

const initialState = {
	skills: {},
	updateskills: {},
	instructor: {},
	updateinstructor: {},
	loading: false,
	allSkills: [],
	allParticipantDemoSkills: [],
	allParticipantSkills: [],
	selectedskill: {},
	allInstructors: [],
};

export const skillsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CREATE_SKILLS:
			console.log(payload);
			return {
				...state,
				skills: payload,
				allSkills: [...state.allSkills, payload],
			};
		case UPDATE_SKILLS:
			console.log(payload);
			let newData = state.allSkills.map((skill) => {
				if (skill._id === payload._id) {
					skill = payload;
				}
				return skill;
			});
			return {
				...state,
				selectedskill: payload,
				allSkills: newData,
			};
		case EDIT_SKILLS:
			console.log(payload);
			return {
				...state,
				selectedskill: payload,
			};
		case 'RESET_SELECTED_SKILL':
			return {
				...state,
				selectedskill: {},
			};
		case DELETE_SKILL:
			let remainingData = state.allSkills.filter(
				(skill) => skill._id !== action.payload
			);
			console.log(action.payload);
			return {
				...state,
				allSkills: remainingData,
			};

		case ADD_INSTRUCTOR:
			console.log(payload);
			return {
				...state,
				instructor: payload,
				allInstructors: [...state.allInstructors, payload],
			};
		case UPDATE_INSTRUCTOR:
			console.log(payload);
			let updatedInstr = state.allInstructors.map((instr) => {
				if (instr._id === action.payload._id) {
					console.log('found the modified instr');
					instr = action.payload;
				}
				return instr;
			});
			return {
				...state,
				allInstructors: updatedInstr,
			};
		case DELETE_INSTRUCTOR:
			let remainingIns = state.allInstructors.filter(
				(instr) => instr._id !== action.payload
			);
			console.log(action.payload);
			return {
				...state,
				allInstructors: remainingIns,
			};
		case GET_INSTRUCTOR:
			console.log(payload);
			return {
				...state,
				instructor: payload,
			};
		case FETCH_INSTRUCTORS:
			console.log(payload);
			return {
				...state,
				allInstructors: payload,
			};
		case FETCH_SKILLS:
			return {
				...state,
				allSkills: payload,
			};
		case GET_SKILL_PARTICIPANTS:
			return {
				...state,
				allParticipantSkills: payload,
			};
		case GET_SKILL_DEMO_PARTICIPANTS:
			return {
				...state,
				allParticipantDemoSkills: payload,
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
