import {
	CREATE_SKILLS,
	UPDATE_SKILLS,
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
import axios from '../axios';

import { toast } from 'react-toastify';

// Create Course
export const creatCourse =
	(
		name,
		url,
		about,
		capacity,
		seatsLeft,
		eligibility,
		level,
		type,
		curriculum,
		instructor,
		onlineEvent,
		banner,
		isActive,
		startDate,
		trailer,
		originalPrice,
		price,
		durationInDays,
		currency,
		currencySymbol,
		language,
		certificate,
		certificateInfo,
		sessionRecord,
		tags,
		faqs
	) =>
	async (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		let course = {
			name,
			url,
			about,
			capacity,
			seatsLeft,
			eligibility,
			level,
			type,
			curriculum,
			instructor,
			onlineEvent,
			banner,
			isActive,
			startDate,
			trailer,
			originalPrice,
			price,
			durationInDays,
			currency,
			currencySymbol,
			language,
			certificate,
			certificateInfo,
			sessionRecord,
			tags,
			faqs,
		};

		let config = {
			method: 'POST',
			url: '/api/admin/createSkill',
			data: { course: course },
		};

		try {
			const { data } = await axios(config);
			dispatch({
				type: CREATE_SKILLS,
				payload: data.data,
			});
			toast.success('Course created');
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
			// toast.error(error.message);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

// Upadte competition
export const updateCourse =
	(
		name,
		url,
		about,
		capacity,
		seatsLeft,
		eligibility,
		level,
		type,
		curriculum,
		instructor,
		onlineEvent,
		banner,
		isActive,
		startDate,
		trailer,
		originalPrice,
		price,
		durationInDays,
		currency,
		currencySymbol,
		language,
		certificate,
		certificateInfo,
		sessionRecord,
		tags,
		faqs,
		courseId
	) =>
	async (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		let update = {
			name,
			url,
			about,
			capacity,
			seatsLeft,
			eligibility,
			level,
			type,
			curriculum,
			instructor,
			onlineEvent,
			banner,
			isActive,
			startDate,
			trailer,
			originalPrice,
			price,
			durationInDays,
			currency,
			currencySymbol,
			language,
			certificate,
			certificateInfo,
			sessionRecord,
			tags,
			faqs,
		};

		let config = {
			method: 'POST',
			url: '/api/admin/updateCourse',
			data: { courseId, update: update },
		};
		try {
			const { data } = await axios(config);

			dispatch({
				type: UPDATE_SKILLS,
				payload: data.data,
			});
			toast.success('Course updated');
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

			// toast.error(err.message);
		}
	};

export const deleteCourse = (id) => async (dispatch) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteCourse`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_SKILL,
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
// Create Instructor
export const createInstructor =
	(
		name,
		qualification,
		designation,
		companyName,
		totalExperience,
		domainExperience,
		skills,
		projects
	) =>
	async (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		let body = {
			name,
			qualification,
			designation,
			companyName,
			totalExperience,
			domainExperience,
			skills,
			projects,
		};

		try {
			const { data } = await axios.post('/api/admin/addInstructor', body);

			dispatch({
				type: ADD_INSTRUCTOR,
				payload: data.data,
			});
			toast.success('Instructor added');
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
			// toast.error(error.message);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

// Update instructor
export const updateInstructor =
	(
		name,
		qualification,
		designation,
		companyName,
		totalExperience,
		domainExperience,
		skills,
		projects,
		_id
	) =>
	async (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		let instructorId = _id;

		let update = {
			name,
			qualification,
			designation,
			companyName,
			totalExperience,
			domainExperience,
			skills,
			projects,
		};
		let config = {
			method: 'POST',
			url: '/api/admin/updateInstructor',
			data: { update: update, instructorId },
		};
		try {
			const { data } = await axios(config);

			dispatch({
				type: UPDATE_INSTRUCTOR,
				payload: data.data,
			});
			toast.success('Instructor updated');
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
			// toast.error(error.message);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

export const deleteInstructor = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteInstructor`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_INSTRUCTOR,
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

export const getSkills = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.get(`/api/admin/getAllSkills`);
		dispatch({
			type: FETCH_SKILLS,
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

export const getInstructor = (instructorId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.get(`/api/admin/getInstructor`, instructorId);
		dispatch({
			type: GET_INSTRUCTOR,
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

export const getAllInstructors = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.get(`/api/admin/getallInstructors`);
		dispatch({
			type: FETCH_INSTRUCTORS,
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
export const getSkillParticipants =
	(courseId) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		try {
			const { data } = await axios.post(`/api/admin/getSkillParticipants`, {
				courseId: courseId,
			});
			console.log(data);
			dispatch({
				type: GET_SKILL_PARTICIPANTS,
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
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

export const getSkillDemoParticipants =
	(courseId) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		try {
			const { data } = await axios.post(`/api/admin/getSkillDemoParticipants`, {
				courseId: courseId,
			});
			console.log(data);
			dispatch({
				type: GET_SKILL_DEMO_PARTICIPANTS,
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
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
