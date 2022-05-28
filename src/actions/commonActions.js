import axios from '../axios';
import { toast } from 'react-toastify';
import {
	ADD_FAQ,
	DELETE_FAQ,
	GET_EVENT_FAQS,
	GET_FAQS,
	UPDATE_FAQ,
	FETCH_BANNERS,
	DELETE_BANNER,
	FETCH_CREDITS,
	SEND_NOTIFICATION,
	RESET_SELECTED_USER_DATA,
	DELETE_GALLERY_IMAGE,
	FETCH_GALLERY
} from '../constants/commonConstants';

export const getFaqs = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/getFaqs`);
		console.log('getFaqs', data.data);
		dispatch({
			type: GET_FAQS,
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
export const getEventFaqs = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/getEventFaqs`);

		dispatch({
			type: GET_EVENT_FAQS,
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

export const createFaq = (newData) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.post(`/api/admin/createFaq`, {
			data: newData,
		});

		dispatch({
			type: ADD_FAQ,
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

export const updateFaq =
	({ question, answer, type, _id }) =>
	async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			let body = {
				question,
				answer,
				type,
			};

			const { data } = await axios.post(`/api/admin/updateFaq`, {
				id: _id,
				update: body,
			});

			dispatch({
				type: UPDATE_FAQ,
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

export const deleteFaq = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteFaq`, {
			id: id,
		});

		if (data === 'OK') {
			dispatch({
				type: DELETE_FAQ,
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

export const getBanners = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		console.log('making axios call');
		const { data } = await axios.get(`/api/getBanners`);
		dispatch({
			type: FETCH_BANNERS,
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
export const getNewsgallery = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		console.log('making axios call');
		const { data } = await axios.get(`/api/getnewsGallery`);
		dispatch({
			type: FETCH_GALLERY,
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
export const addNewsImage =
	(url, caption, isActive) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			console.log('making axios call', url, caption, isActive);
			const { data } = await axios.post(`/api/admin/addNewsImage`, {
				url,
				caption,
				isActive,
			});
			dispatch({
				type: FETCH_GALLERY,
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

	export const deleteNewsImage = (id) => async (dispatch, getState) => {
		console.log(id);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			console.log('making axios call');
			const { data } = await axios.post(`/api/admin/deleteNewsImage`, {
				id: id,
			});
			dispatch({
				type: DELETE_GALLERY_IMAGE,
				payload: id,
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
export const addBanner =
	(type, url, isActive) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			console.log('making axios call', type, url, isActive);
			const { data } = await axios.post(`/api/admin/addBanner`, {
				type,
				url,
				isActive,
			});
			dispatch({
				type: FETCH_BANNERS,
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
export const deleteBanner = (id) => async (dispatch, getState) => {
	console.log(id);
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		console.log('making axios call');
		const { data } = await axios.post(`/api/admin/deleteBanner`, {
			id: id,
		});
		dispatch({
			type: DELETE_BANNER,
			payload: id,
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


export const getCreditDetails = (start, end) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/getCreditDetails`, {
			start,
			end,
		});
		dispatch({
			type: FETCH_CREDITS,
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
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};

export const sendNotification = (body) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/sendNotif`, body);
		console.log('SEND_NOTIFICATION', data);
		if (data === 'OK') {
			toast.success('Sent Msg');
			dispatch({
				type: SEND_NOTIFICATION,
				payload: data.data,
			});
		}
		dispatch({
			type: RESET_SELECTED_USER_DATA,
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
		// toast.error(error);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
