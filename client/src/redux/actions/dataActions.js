import {
	GET_GROUPS,
	SET_GROUP,
	ADD_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
	GET_PASSWORDS,
	ADD_PASSWORD,
	GET_PASSWORD,
	UPDATE_PASSWORD,
	SET_PASSWORD,
	DELETE_PASSWORD,
} from "../types";

import axios from "axios";

export const getGroups = () => (dispatch) => {
	axios
		.get("/groups")
		.then((response) => {
			dispatch({ type: GET_GROUPS, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const setGroup = (selectedGroup) => (dispatch) => {
	dispatch({ type: SET_GROUP, payload: selectedGroup });
};

export const addGroup = (group) => (dispatch) => {
	axios
		.post("/add-group", group)
		.then((response) => {
			dispatch({ type: ADD_GROUP, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateGroup = (group) => (dispatch) => {
	axios
		.post("/update-group", group)
		.then((response) => {
			dispatch({ type: UPDATE_GROUP, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const deleteGroup = (id) => (dispatch) => {
	axios
		.post("/delete-group", { id })
		.then((response) => {
			dispatch({ type: DELETE_GROUP, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getPasswords = () => (dispatch) => {
	axios
		.get("/passwords")
		.then((response) => {
			dispatch({ type: GET_PASSWORDS, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const addPassword = (password) => (dispatch) => {
	axios
		.post("/add-password", password)
		.then((response) => {
			console.log(response.data);
			dispatch({ type: ADD_PASSWORD, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updatePassword = (password) => (dispatch) => {
	axios
		.post("/update-password", password)
		.then((response) => {
			dispatch({ type: UPDATE_PASSWORD, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const getPassword = (id) => (dispatch) => {
	axios
		.get(`get-password/${id}`)
		.then((response) => {
			dispatch({ type: GET_PASSWORD, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};

export const setPassword = (selectedPassword) => (dispatch) => {
	dispatch({ type: SET_PASSWORD, payload: selectedPassword });
};

export const deletePassword = (id) => (dispatch) => {
	axios
		.post("/delete-password", { id })
		.then((response) => {
			dispatch({ type: DELETE_PASSWORD, payload: response.data });
		})
		.catch((error) => {
			console.error(error);
		});
};
