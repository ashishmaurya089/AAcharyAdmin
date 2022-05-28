import axios from "../axios";
import { toast } from "react-toastify";
import {
  FETCH_USERS,
  FETCH_COACHING,
  FETCH_TUTORS,
  UPDATE_TUTORS,
  UPDATE_TUR_INS,
  UPDATE_APPROVE_TUR_INS,
  DELETE_USER,
  FETCH_REQUIREMENTS,
} from "../constants/userConstanst";

export const getRequirement = (page, perPage) => async (dispatch) => {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });

  try {
    const { data } = await axios.post("/api/admin/getAllGlobalLeads", {
      page: page,
      perPage: perPage,
    });
    const requirement = data.data.filter((req) => req.seeker != null)
    data.data.map((req) => {
      if (req.seeker === null) {
        console.log(req)
      }
    })
    dispatch({
      type: FETCH_REQUIREMENTS,
      payload: requirement,
      globalLeadCount: data.totalCount
    });
    setTimeout(() => {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }, 600);
  } catch (error) {
    console.log(error);
    // if (error.response.data.msg) {
    //   toast.error(error.response.data.msg);
    // }
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });
  console.log("deleting a user");
  try {
    const { data } = await axios.post(`/api/admin/deleteUser`, { id: id });
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
    setTimeout(() => {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }, 600);
  } catch (error) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    }
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }
};
export const getAllUsers = () => async (dispatch, getState) => {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });

  try {
    const { data } = await axios.get(`/api/admin/getAllUsers`);
    dispatch({
      type: FETCH_USERS,
      payload: data.data,
    });
    setTimeout(() => {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }, 600);
  } catch (error) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    }
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }
};

export const getAllTutors = (page, perPage) => async (dispatch, getState) => {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });

  try {
    const { data } = await axios.post(`/api/admin/getAllTutorsForAdmin`, { page, perPage });
    dispatch({
      type: FETCH_TUTORS,
      payload: { data: data.data, count: data.totalCount },
    });
    setTimeout(() => {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }, 600);
  } catch (error) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    }
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }
};

export const getAllCoachingInstitutes = () => async (dispatch, getState) => {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });
  try {
    const { data } = await axios.get(`/api/admin/getAllCoachingAdmin`);
    dispatch({
      type: FETCH_COACHING,
      payload: data.data,
    });
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  } catch (error) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    }
    // toast.error(`Failed with error ${error}`);
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }
};

export const addPermittedLevels =
  (providerId, permittedLevels) => async (dispatch, getState) => {
    console.log(providerId, permittedLevels);
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    let body = {
      providerId: providerId,
      permittedLevels: permittedLevels,
    };
    try {
      const { data } = await axios.post(`/api/admin/addPermittedLevels`, body);
      dispatch({
        type: UPDATE_TUR_INS,
        payload: data.data,
      });
      toast.success("Permitted Levels Updated");
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error);
      }
      // toast.error(`Failed with error ${error}`);
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

export const approveProvider =
  (providerId, approved) => async (dispatch, getState) => {
    console.log(providerId, approved);
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    let body = {
      providerId: providerId,
      approved: approved,
    };
    try {
      const { data } = await axios.post(`/api/admin/approveProvider`, body);
      console.log(data.data);
      dispatch({
        type: UPDATE_APPROVE_TUR_INS,
        payload: data.data,
      });
      toast.success("Approval Details updated");
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error);
      }

      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };
