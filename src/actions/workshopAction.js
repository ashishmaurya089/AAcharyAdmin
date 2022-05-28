import {
	CREATE_WORKSHOP,
	UPDATE_WORKSHOP,
	FETCH_WORKSHOPS,
	DELETE_WORKSHOP,
	GET_WORKSHOP_PARTICIPANTS,
} from '../constants/workshopConstants';
import axios from '../axios';
import { toast } from 'react-toastify';

// Create workshop
export const createWorkshop =
	(
		name,
		url,
		level,
		objective,
		about,
		description,
		type,
		language,
		eligibility,
		gallery,
		venue,
		originalPrice,
		price,
		contents,
		instructor,
		banner,
		isActive,
		registrationEndDate,
		startDate,
		endDate,
		currency,
		currencySymbol,
		sponsors,
		faqs
	) =>
	async (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		let workshop = {
			name,
			url,
			level,
			objective,
			about,
			description,
			type,
			language,
			eligibility,
			gallery,
			venue,
			originalPrice,
			price,
			contents,
			instructor,
			banner,
			isActive,
			registrationEndDate,
			startDate,
			endDate,
			currency,
			currencySymbol,
			sponsors,
			faqs,
		};
		let config = {
			method: 'POST',
			url: '/api/admin/createWorkshop',
			data: {
				workshop: workshop,
			},
		};

		try {
			const { data } = await axios(config);
			dispatch({
				type: CREATE_WORKSHOP,
				payload: data.data,
			});
			toast.success('Workshop created');
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

// Upadte workshop
export const updateWorkshop =
	(
		name,
		url,
		level,
		objective,
		about,
		description,
		type,
		language,
		eligibility,
		gallery,
		venue,
		originalPrice,
		price,
		contents,
		instructor,
		banner,
		isActive,
		registrationEndDate,
		startDate,
		endDate,
		currency,
		currencySymbol,
		sponsors,
		faqs,
		workshopId
	) =>
	async (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		let update = {
			name,
			url,
			level,
			objective,
			about,
			description,
			type,
			language,
			eligibility,
			gallery,
			venue,
			originalPrice,
			price,
			contents,
			instructor,
			banner,
			isActive,
			registrationEndDate,
			startDate,
			endDate,
			currency,
			currencySymbol,
			sponsors,
			faqs,
		};

		let config = {
			method: 'POST',
			url: '/api/admin/updateWorkshop',
			data: { update: update, workshopId },
		};
		try {
			const { data } = await axios(config);
			dispatch({
				type: UPDATE_WORKSHOP,
				payload: data.data,
			});
			toast.success('Updated workshop');
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			// toast.error(err.message);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

export const deleteWorkshop = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteWorkshop`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_WORKSHOP,
				payload: id,
			});
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 100);
		}
	} catch (error) {
		if (error.response.data.msg) {
			toast.error(error.response.data.msg);
		}
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const getWorkshops = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.post(`/api/admin/getAllWorkshops`);
		dispatch({
			type: FETCH_WORKSHOPS,
			payload: data.data,
		});
		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 600);
	} catch (error) {
		if (error.response.data.msg) {
			toast.error(error.response.data.msg);
		}
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};

export const getWorkshopParticipants =
	(workshopId) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		try {
			const { data } = await axios.post(`/api/admin/getWorkshopParticipants`, {
				workshopId: workshopId,
			});
			console.log(data);
			dispatch({
				type: GET_WORKSHOP_PARTICIPANTS,
				payload: data.data,
			});
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			// toast.error(`Failed with error : ${error}`);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
