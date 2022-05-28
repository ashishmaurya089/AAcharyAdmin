import {
	FETCH_LEVELS,
	FETCH_STREAMS,
	FETCH_CATEGORIES,
	FETCH_SUBJECTS,
	CLEAR_SUBJECTS,
	SELECT_LEVEL,
	SELECT_STREAM,
	SELECT_CATEGORY,
	UPDATE_SUBJECTS,
	ADD_SUBJECT,
	DELETE_SUBJECT,
	ADD_LEVEL,
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
	FETCH_SEGMENTS,
	SELECT_SEGMENT,
	ADD_SEGMENT,
	ADD_STREAM,
	ADD_CATEGORY,
	UPDATE_SEGMENT,
	DELETE_SEGEMENT,
	DELETE_LEVEL,
	UPDATE_LEVEL,
	UPDATE_STREAM,
	DELETE_STREAM,
	ADD_NEW_LEVEL,
} from '../constants/subjectConstants';
import { toast } from 'react-toastify';

export const subjectReducer = (
	state = {
		segments: [],
		selectedSegmentId: '',
		levels: [],
		newlevel: [],
		selectedLevelId: '',
		streams: [],
		selectedStreamId: '',
		categories: [],
		selectedCategoryId: '',
		subjects: [],
		loading: false,
		hasNext: false,
		page: 0,
	},
	action
) => {
	switch (action.type) {
		case ADD_SEGMENT:
			return {
				...state,
				segments: [...state.segments, action.payload],
			};
		case UPDATE_SEGMENT:
			let updatedsegments = state.segments.map((seg) => {
				if (seg._id === action.payload._id) {
					seg = action.payload;
				}
				return seg;
			});
			return {
				...state,
				segments: updatedsegments,
			};
		case DELETE_SEGEMENT:
			let remainingSeg = state.segments.filter(
				(seg) => seg._id !== action.payload
			);
			return {
				...state,
				segments: remainingSeg,
			};
		// case ADD_LEVEL:
		// 	return {
		// 		...state,
		// 		 levels: [...action.payload],
		// 		// levels: [...state.levels, ...action.payload],
		// 	};
		case UPDATE_LEVEL:
			let updatedLevels = state.levels.map((levl) => {
				if (levl._id === action.payload._id) {
					console.log('found the modified levl');
					levl = action.payload;
				}
				return levl;
			});
			return {
				...state,
				levels: updatedLevels,
			};
		case DELETE_LEVEL:
			let remainingLevl = state.levels.filter(
				(levl) => levl._id !== action.payload
			);
			return {
				...state,
				levels: remainingLevl,
			};

		case UPDATE_STREAM:
			let updatedStrems = state.streams.map((Strem) => {
				if (Strem._id === action.payload._id) {
					console.log('found the modified Strem');
					Strem = action.payload;
				}
				return Strem;
			});
			return {
				...state,
				streams: updatedStrems,
			};
		case DELETE_STREAM:
			let remainingStrem = state.streams.filter(
				(Strem) => Strem._id !== action.payload
			);
			return {
				...state,
				streams: remainingStrem,
			};
		case UPDATE_CATEGORY:
			let updatedCat = state.categories.map((Cat) => {
				if (Cat._id === action.payload._id) {
					console.log('found the modified Cat');
					Cat = action.payload;
				}
				return Cat;
			});
			return {
				...state,
				categories: updatedCat,
			};
		case DELETE_CATEGORY:
			let remainingCat = state.categories.filter(
				(Cat) => Cat._id !== action.payload
			);
			return {
				...state,
				categories: remainingCat,
			};

		case SELECT_SEGMENT:
			return {
				...state,
				selectedSegmentId: action.payload,
			};
		case SELECT_LEVEL:
			return {
				...state,
				selectedLevelId: action.payload,
			};
		case SELECT_STREAM:
			return {
				...state,
				selectedStreamId: action.payload,
			};
		case SELECT_CATEGORY:
			return {
				...state,
				selectedCategoryId: action.payload,
			};
		case FETCH_SEGMENTS:
			console.log(action.payload);
			return {
				...state,
				// segments: [...action.payload],
				segments: action.payload,
			};
		case FETCH_LEVELS:
			return {
				...state,
				// levels: [...action.payload],
				levels: action.payload,
			};
		case FETCH_STREAMS:
			return {
				...state,
				// streams: [...action.payload],
				streams: action.payload,
			};
		case FETCH_CATEGORIES:
			return {
				...state,
				// categories: [...action.payload],
				categories: action.payload,
			};
		case FETCH_SUBJECTS:
			return {
				...state,
				// subjects: [...action.payload],
				subjects: action.payload,
				hasNext: action.hasNext,
				page: action.page,
			};
		case ADD_SUBJECT:
			return {
				...state,
				subjects: [action.payload],
			};
		case UPDATE_SUBJECTS:
			console.log('edited sub ->', action.payload);
			let updatedSubjects = state.subjects.map((sub) => {
				if (sub._id === action.payload._id) {
					console.log('found the modified sub');
					sub = action.payload;
				}
				return sub;
			});
			return {
				...state,
				subjects: updatedSubjects,
			};
		case DELETE_SUBJECT:
			console.log(action.payload);
			let remainingSub = state.subjects.filter(
				(sub) => sub._id !== action.payload
			);
			return {
				...state,
				subjects: remainingSub,
			};
		case CLEAR_SUBJECTS:
			return {
				...state,
				subjects: [],
				hasNext: false,
				page: 0,
				selectedLevelId: '',
				streams: [],
				selectedStreamId: '',
				categories: [],
			};
		case 'RESET_APPROVELEVELS__TUTOR':
		case 'RESET_APPROVELEVELS_INSTITUTE':
			return {
				...state,
				levels: [],
			};

		case ADD_NEW_LEVEL:
			console.log(action.payload);
			return {
				...state,
				newlevel: [...state.levels, action.payload],
				// levels: [...state.levels, action.payload],
			};

		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
};
