import axios from '../axios';
import { toast } from 'react-toastify';
import {
	FETCH_SEGMENTS,
	FETCH_LEVELS,
	FETCH_STREAMS,
	FETCH_CATEGORIES,
	FETCH_SUBJECTS,
	CLEAR_SUBJECTS,
	SELECT_SEGMENT,
	SELECT_LEVEL,
	SELECT_STREAM,
	SELECT_CATEGORY,
	ADD_SEGMENT,
	ADD_LEVEL,
	ADD_STREAM,
	ADD_CATEGORY,
	ADD_SUBJECT,
	UPDATE_SEGMENT,
	UPDATE_LEVEL,
	UPDATE_STREAM,
	UPDATE_CATEGORY,
	UPDATE_SUBJECTS,
	DELETE_SEGEMENT,
	DELETE_LEVEL,
	DELETE_STREAM,
	DELETE_CATEGORY,
	DELETE_SUBJECT,
} from '../constants/subjectConstants';

export const getSegments = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.post(`/api/admin/getSegments`);
		dispatch({
			type: FETCH_SEGMENTS,
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
export const getLevels = (segementId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/getLevels`, {
			segment: segementId,
		});
		dispatch({
			type: FETCH_LEVELS,
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

export const getStreams = (levelId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/getStreams`, {
			level: levelId,
		});
		dispatch({
			type: FETCH_STREAMS,
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
export const getCategories = (streamId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/getCategories`, {
			stream: streamId,
		});
		dispatch({
			type: FETCH_CATEGORIES,
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

export const getSubjects =
	(segment, level, stream, category, page, perPage) =>
	async (dispatch, getState) => {
		let body = {
			perPage: perPage,
			page: page,
		};

		if (segment) {
			body.segment = segment;
		}
		if (level) {
			body.level = level;
		}
		if (stream) {
			body.stream = stream;
		}
		if (category) {
			body.category = category;
		}
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		try {
		} catch (error) {}
		const { data } = await axios.post(`/api/admin/getSubjects`, body);

		dispatch({
			type: FETCH_SUBJECTS,
			payload: data.data,
			hasNext: data.hasNext,
			page: page,
		});
		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 100);
		try {
			let reduxPage = getState().tuitionSegments.page;
			if (page >= reduxPage) {
			} else {
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

export const addSegement = (newSeg) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		let { data } = await axios.post(`/api/admin/addSegment`, newSeg);

		dispatch({
			type: ADD_SEGMENT,
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

export const editSegment = (update) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		let {
			description,
			deliveredByInstitute,
			hasNesting,
			icon,
			name,
			nestingKey,
			_id,
		} = update;

		let body = {
			description,
			deliveredByInstitute,
			hasNesting,
			icon,
			name,
			nestingKey,
		};
		const { data } = await axios.post(`/api/admin/editSegment`, {
			id: _id,
			update: body,
		});
		dispatch({
			type: UPDATE_SEGMENT,
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

export const deleteSegment = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteSegment`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_SEGEMENT,
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

export const addLevel = (newLevl) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		let {
			data: {
				data: { segment: segmentOfNewLevl },
			},
		} = await axios.post(`/api/admin/addLevel`, newLevl);

		const { data } = await axios.get(`/api/admin/getLevels`, {
			segment: segmentOfNewLevl._id,
		});
		dispatch({
			type: FETCH_LEVELS,
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

export const editLevel = (update) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		let { _id, name, description, hasNesting, nestingKey, icon } = update;
		let body = {
			name,
			description,
			hasNesting,
			nestingKey,
			icon,
		};

		const { data } = await axios.post(`/api/admin/editLevel`, {
			id: _id,
			update: body,
		});
		dispatch({
			type: UPDATE_LEVEL,
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

export const deleteLevel = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteLevel`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_LEVEL,
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
export const addStream = (newSream) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		let {
			data: {
				data: { level: levelOfNewStream },
			},
		} = await axios.post(`/api/admin/addStream`, newSream);
		const { data } = await axios.post(`/api/admin/getStreams`, {
			level: levelOfNewStream._id,
		});
		dispatch({
			type: FETCH_STREAMS,
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

export const editStream = (update) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		let { _id, name, description, hasCategory, level, prefix } = update;

		let body = {
			name,
			description,
			level,
			hasCategory,
		};

		const { data } = await axios.post(`/api/admin/editStream`, {
			id: _id,
			update: body,
		});
		dispatch({
			type: UPDATE_STREAM,
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

export const deleteStream = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteStream`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_STREAM,
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
export const addCategory = (newCat) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		let {
			data: {
				data: { stream: streamOfNewCat },
			},
		} = await axios.post(`/api/admin/addCategory`, newCat);
		const { data } = await axios.post(`/api/admin/getCategories`, {
			stream: streamOfNewCat._id,
		});
		dispatch({
			type: FETCH_CATEGORIES,
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

export const editCategory = (update) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		let { _id, name, description, hasNesting, stream } = update;

		let body = {
			name,
			description,
			hasNesting,
			stream,
		};
		const { data } = await axios.post(`/api/admin/editCategory`, {
			id: _id,
			update: body,
		});
		dispatch({
			type: UPDATE_CATEGORY,
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

export const deleteCategory = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteCategory`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_CATEGORY,
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

export const addSubject = (newSub) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/addSubject`, newSub);
		dispatch({
			type: ADD_SUBJECT,
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

export const editSubject = (update) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		let {
			_id,
			name,
			icon,
			description,
			level,
			stream,
			category,
			banner,
			tags,
			providersCount,
		} = update;
		let body = {
			name,
			description,
			// icon,
			// banner,
			// tags,
			// providersCount,
			level: level._id,
			stream: stream ? stream._id : null,
			category: category ? category._id : null,
			hasCategory: category ? true : false,
		};

		const { data } = await axios.post(`/api/admin/editSubject`, {
			id: _id,
			update: body,
		});
		dispatch({
			type: UPDATE_SUBJECTS,
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

export const deleteSubject = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteSubject`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_SUBJECT,
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

export const selectSegment = (id) => async (dispatch, getState) => {
	dispatch({
		type: SELECT_SEGMENT,
		payload: id,
	});
};
export const selectLevel = (id) => async (dispatch, getState) => {
	dispatch({
		type: SELECT_LEVEL,
		payload: id,
	});
};

export const selectStream = (id) => async (dispatch, getState) => {
	dispatch({
		type: SELECT_STREAM,
		payload: id,
	});
};
export const selectCategory = (id) => async (dispatch, getState) => {
	dispatch({
		type: SELECT_CATEGORY,
		payload: id,
	});
};

export const clearSubjects = () => async (dispatch, getState) => {
	dispatch({
		type: CLEAR_SUBJECTS,
	});
};
