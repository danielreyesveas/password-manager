import {
	GET_GROUPS,
	SET_GROUP,
	ADD_GROUP,
	GET_PASSWORDS,
	ADD_PASSWORD,
	SET_PASSWORD,
} from "../types";
import axios from "axios";

export const getGroups = () => (dispatch) => {
	axios.get("/groups").then((response) => {
		dispatch({ type: GET_GROUPS, payload: response.data });
	});
};

export const setGroup = (selectedGroup) => (dispatch) => {
	dispatch({ type: SET_GROUP, payload: selectedGroup });
};

export const getPasswords = () => (dispatch) => {
	axios.get("/passwords").then((response) => {
		dispatch({ type: GET_PASSWORDS, payload: response.data });
	});
};

export const addPassword = (password) => (dispatch) => {
	axios.post("/add-password", password).then((response) => {
		console.log(response.data);
		dispatch({ type: ADD_PASSWORD, payload: response.data });
	});
};

export const addGroup = (group) => (dispatch) => {
	axios.post("/add-group", group).then((response) => {
		dispatch({ type: ADD_GROUP, payload: response.data });
	});
};

export const setPassword = (selectedPassword) => (dispatch) => {
	dispatch({ type: SET_PASSWORD, payload: selectedPassword });
};
