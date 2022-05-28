import {
	ADD_FAQ,
	UPDATE_FAQ,
	DELETE_FAQ,
	GET_FAQS,
	GET_EVENT_FAQS,
	GET_TUTOR_FAQS,
	GET_USER_FAQS,
	FETCH_BANNERS,
	DELETE_BANNER,
	FETCH_CREDITS,
	SEND_NOTIFICATION,
	SELECTED_USER_DATA,
	RESET_SELECTED_USER_DATA,
	FETCH_GALLERY
} from '../constants/commonConstants';

import { toast } from 'react-toastify';

const initialState = {
	faqs: [],
	eventFaqs: [],
	avator: '',
	banners: [],
	newsgallery: [],
	credits: [],
	notifications: [],
	selectedUser: null,
	loading: false
};

export const commonReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_FAQS:
			console.log(payload);
			return {
				...state,
				faqs: payload,
			};
		case GET_EVENT_FAQS:
			console.log(payload);
			return {
				...state,
				eventFaqs: payload,
			};
		case ADD_FAQ:
			console.log(payload);
			return {
				...state,
				faqs: [...state.faqs, payload],
			};
		case FETCH_CREDITS:
			console.log(payload);
			return {
				...state,
				credits: payload,
			};
		case UPDATE_FAQ:
			let newData = state.faqs.map((faq) => {
				if (faq._id === payload._id) {
					faq = payload;
				}
				return faq;
			});
			return {
				...state,
				faqs: newData,
			};
		case DELETE_FAQ:
			let remainingData = state.faqs.filter(
				(faq) => faq._id !== action.payload
			);
			return {
				...state,
				faqs: remainingData,
			};
		case FETCH_BANNERS:
			return {
				...state,
				banners: payload,
			};
		case FETCH_GALLERY:
			return {
				...state,
				newsgallery: payload,
			};
		case DELETE_BANNER:
			let newBanners = state.banners.filter((bn) => bn._id !== action.payload);
			return {
				...state,
				banners: newBanners,
			};
		case SEND_NOTIFICATION:
			return {
				...state,
				notifications: payload,
			};
		case SELECTED_USER_DATA:
			return {
				...state,
				selectedUser: payload,
			};
		case RESET_SELECTED_USER_DATA:
			return {
				...state,
				selectedUser: null,
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
