import {
	CREATE_STAGE,
	CREATE_EVENT,
	CREATE_SUBEVENT,
	FETCH_COMPETITIONS,
	UPDATE_COMPETITIONS,
	UPDATE_SUBEVENT,
	FETCH_SKILLS,
	FETCH_WORKSHOPS,
	UPDATE_STAGE,
	REFRESH_COMPETITION,
	REFRESH_SUBEVENT,
	DELETE_EVENT,
	DELETE_SUBEVENT,
	DELETE_STAGE,
	SELECT_COMPETITIONS,
	SELECT_SUBEVENT,
	DELETE_SPONSOR,
	UPDATE_SPONSOR,
	ADD_SPONSOR,
	FETCH_SPONSORS,
	GET_COMPETITION_PARTICIPANTS,
	CREATE_NEW_SUBEVENT,
} from '../constants/eventConstants';
import axios from '../axios';

import { toast } from 'react-toastify';

// Create event
export const createEvent =
	(
		name,
		shortDescription,
		longDescription,
		isActive,
		banner,
		guidelines,
		tags,
		registrationStartDate,
		registrationEndDate,
		awards,
		gallery,
		faqs,
		sponsors
	) =>
		async (dispatch) => {
			dispatch({
				type: 'SET_LOADING',
				payload: true,
			});

			let event = {
				name,
				shortDescription,
				longDescription,
				isActive,
				banner,
				guidelines,
				tags,
				registrationStartDate,
				registrationEndDate,
				awards,
				gallery,
				faqs,
				sponsors,
			};

			let config = {
				method: 'POST',
				url: '/api/admin/creatEvent',
				data: { event: event },
			};

			try {
				const { data } = await axios(config);
				console.log('Created event', data.data);
				dispatch({
					type: CREATE_EVENT,
					payload: data.data,
				});
				toast.success('Created event');
			} catch (error) {
				if (error.response.data.msg) {
					toast.error(error.response.data.msg);
				} else {
					toast.error(error);
				}
				// toast.error(error.message);
			}

			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		};

// Upadte competition
export const updateEvent =
	(
		name,
		shortDescription,
		longDescription,
		isActive,
		banner,
		guidelines,
		tags,
		registrationStartDate,
		registrationEndDate,
		awards,
		gallery,
		faqs,
		sponsors,
		eventId
	) =>
		async (dispatch) => {
			dispatch({
				type: 'SET_LOADING',
				payload: true,
			});

			let update = {
				name,
				shortDescription,
				longDescription,
				isActive,
				banner,
				guidelines,
				tags,
				registrationStartDate,
				registrationEndDate,
				awards,
				gallery,
				faqs,
				sponsors,
			};

			let config = {
				method: 'POST',
				url: '/api/admin/updateEvent',
				data: { update: update, eventId },
			};
			try {
				const { data } = await axios(config);
				console.log('Update Event', data);
				dispatch({
					type: UPDATE_COMPETITIONS,
					payload: data.data,
				});
				toast.success('Updated event');
			} catch (error) {
				if (error.response.data.msg) {
					toast.error(error.response.data.msg);
				} else {
					toast.error(error);
				}
				// toast.error(`${err.message}`);
			}

			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		};

export const deleteEvent = (id) => async (dispatch) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteEvent`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_EVENT,
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
// Create subevent
export const createSubEvent =
	(name, description, topic, eventId) => async (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		let subevent = {
			name,
			description,
			topic,
		};
		try {
			const { data } = await axios.post(`/api/admin/createSubEvent`, {
				subevent: subevent,
			});
			let subEventId = data.data._id;
			let subEventData = data.data;
			console.log('Created subevent', data.data);
			// Add Subevent to event
			const response = await axios.post(`/api/admin/addSubEventToEvent`, {
				eventId: eventId,
				subEventId: subEventId,
			});
			console.log('Added subEvent to event', response.data);
			toast.success('SubEvent created');
			console.log('subEventData', subEventData);
			dispatch({
				type: CREATE_NEW_SUBEVENT,
				payload: subEventData,
			});
			// if (response.data.status === 'success') {
			// 	dispatch({
			// 		type: CREATE_NEW_SUBEVENT,
			// 		payload: subEventData,
			// 	});
			// 	console.log('After the event', subEventData);
			// } else {
			// 	console.log('ELSE condition trigger');
			// }
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			console.log(error)
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

// Update subEvent
export const updateSubEvent =
	(name, description, topic, _id) => async (dispatch) => {
		let subEventId = _id;
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		var config = {
			method: 'POST',
			url: '/api/admin/updateSubEvent',
			data: { subevent: { name, description, topic }, subEventId },
		};
		try {
			const { data } = await axios(config);
			if (data !== null) {
				dispatch({
					type: UPDATE_SUBEVENT,
					payload: data.data,
				});
				toast.success('SubEvent updated');
			}
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			// toast.error(err.message);
		}

		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 600);
	};
// Create Stage
export const createStage =
	(type, newData, currency, currencySymbol, subEventId, competitionId) =>
		async (dispatch) => {
			let { stageOrder, stageName, stageCost } = newData;

			dispatch({
				type: 'SET_LOADING',
				payload: true,
			});

			var config = {
				method: 'POST',
				url: '/api/admin/createStage',
				data: {
					stage: {
						stageOrder,
						stageName,
						stageCost,
						currency,
						currencySymbol,
						subEventId,
					},
				},
			};

			try {
				// adding stage to DB
				const res = await axios(config);
				let stageId = res.data.data._id;
				console.log('Created stage with id', res.data.data._id);

				var configData = {
					method: 'POST',
					url: '/api/admin/addStageToSubEvent',
					data: { subEventId, stageId },
				};
				// Add stage to subevent
				const response = await axios(configData);
				console.log('Add stage to subevent', response.data);
				dispatch({
					type: CREATE_STAGE,
					payload: {
						type: type,
						stage: res.data.data,
					},
				});
				let refreshEventConfig = {
					method: 'POST',
					url: '/api/admin/refreshEvent',
					data: { competitionId },
				};

				//   getting the updated event after adding stages :

				const event = await axios(refreshEventConfig);
				let subeventData = event.data.data.subEvents.filter(
					(e) => e._id === subEventId
				);
				console.log('subeventData>>', subeventData);

				toast.success('Stage added');

				dispatch({
					type: SELECT_COMPETITIONS,
					payload: event.data.data,
				});

				dispatch({
					type: SELECT_SUBEVENT,
					payload: subeventData[0],
				});
			} catch (error) {
				if (error.response.data.msg) {
					toast.error(error.response.data.msg);
				} else {
					toast.error(error);
				}
				// toast.error(error.message);
			}

			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		};

// Update Stage
export const updateStage =
	(type, newData, currency, currencySymbol, subEventId, competitionId) =>
		async (dispatch) => {
			let { _id, stageOrder, stageName, stageCost } = newData;

			dispatch({
				type: 'SET_LOADING',
				payload: true,
			});

			var config = {
				method: 'POST',
				url: '/api/admin/updateStage',
				data: {
					stageId: _id,
					stage: {
						stageOrder,
						stageName,
						stageCost,
						currency,
						currencySymbol,
					},
				},
			};

			try {
				const res = await axios(config);
				console.log('updated stage', res.data);

				dispatch({
					type: CREATE_STAGE,
					payload: {
						type: type,
						stage: res.data.data,
					},
				});
				let refreshEventConfig = {
					method: 'POST',
					url: '/api/admin/refreshEvent',
					data: { competitionId },
				};
				const event = await axios(refreshEventConfig);
				let subeventData = event.data.data.subEvents.filter(
					(e) => e._id === subEventId
				);

				dispatch({
					type: SELECT_COMPETITIONS,
					payload: event.data.data,
				});

				dispatch({
					type: SELECT_SUBEVENT,
					payload: subeventData[0],
				});
				toast.success('Stage updated');
			} catch (error) {
				if (error.response.data.msg) {
					toast.error(error.response.data.msg);
				} else {
					toast.error(error);
				}
				// toast.error(error.message);
			}

			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		};
export const deleteStage =
	(id, subEventId, competitionId) => async (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		var config = {
			method: 'POST',
			url: '/api/admin/deleteStage',
			data: {
				id: id,
			},
		};

		try {
			const res = await axios(config);
			if (res.status === 200) {
				dispatch({
					type: DELETE_STAGE,
					payload: id,
				});
			}

			let refreshEventConfig = {
				method: 'POST',
				url: '/api/admin/refreshEvent',
				data: { competitionId },
			};
			const event = await axios(refreshEventConfig);
			let subeventData = event.data.data.subEvents.filter(
				(e) => e._id === subEventId
			);

			dispatch({
				type: SELECT_COMPETITIONS,
				payload: event.data.data,
			});

			dispatch({
				type: SELECT_SUBEVENT,
				payload: subeventData[0],
			});
			toast.success('Stage deleted');
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			// toast.error(error.message);
		}

		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 600);
	};

export const getCompetitions = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.get(`/api/admin/getAllCompetitions`);
		dispatch({
			type: FETCH_COMPETITIONS,
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

export const deleteSubeventById = (id, competitionId) => async (dispatch) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const res = await axios.post(`/api/admin/deleteSubEvent`, {
			subEventId: id,
		});
		if (res.status === 200) {
			dispatch({
				type: DELETE_SUBEVENT,
				payload: id,
			});
		}
		const event = await axios({
			method: 'POST',
			url: '/api/admin/refreshEvent',
			data: { competitionId },
		});

		dispatch({
			type: SELECT_COMPETITIONS,
			payload: event.data.data,
		});
		toast.success('Deleted Sub-Event');
	} catch (error) {
		if (error.response.data.msg) {
			toast.error(error.response.data.msg);
		}
		// toast.error(error.message);
	}

	setTimeout(() => {
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}, 600);
};

export const getAllSponsors = () => async (dispatch) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/getAllSponsors`);
		dispatch({
			type: FETCH_SPONSORS,
			payload: data.data,
		});
	} catch (error) {
		if (error.response.data.msg) {
			toast.error(error.response.data.msg);
		}
		// toast.error(error.message);
	}
	setTimeout(() => {
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}, 600);
};
export const addSponsor = (newData) => async (dispatch) => {
	console.log('addSponser', newData);
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/addSponsor`, newData);
		dispatch({
			type: ADD_SPONSOR,
			payload: data.data,
		});
		toast.success('Sponsor added');
	} catch (error) {
		if (error.response.data.msg) {
			toast.error(error.response.data.msg);
		}
		// toast.error(error.message);
	}
	setTimeout(() => {
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}, 600);
};

export const updateSponsor = (update) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	let { _id, name, logo, description } = update;
	let id = _id;
	try {
		const { data } = await axios.post(`/api/admin/updateSponsor`, {
			id,
			name,
			logo,
			description,
		});
		dispatch({
			type: UPDATE_SPONSOR,
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

export const deleteSponsor = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/deleteSponsor`, { id });
		if (data.status === 'success') {
			dispatch({
				type: DELETE_SPONSOR,
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
export const getCompetitionsParticipants =
	(eventId) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/admin/getParticipants`, {
				eventId: eventId,
			});
			console.log(data);

			dispatch({
				type: GET_COMPETITION_PARTICIPANTS,
				payload: data.data,
			});
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 100);
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

export const promoteAParticipant = (body) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/admin/promoteAParticipant`, body);
		console.log(data);
		dispatch({
			type: GET_COMPETITION_PARTICIPANTS,
			payload: data.data,
		});
		toast.success('Promoted');
		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 100);
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
