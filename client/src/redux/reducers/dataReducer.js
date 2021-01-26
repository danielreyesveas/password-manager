import {
	GET_GROUPS,
	SET_GROUP,
	ADD_GROUP,
	GET_PASSWORDS,
	ADD_PASSWORD,
	SET_PASSWORD,
} from "../types";

const initialState = {
	groups: [],
	selectedGroup: null,
	passwords: [],
	selectedPasswords: [],
	selectedPassword: null,
};

let index, passwordsCopy;

const dataReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_GROUPS:
			return {
				...state,
				groups: payload,
			};
		case SET_GROUP:
			passwordsCopy = state.passwords;
			if (payload) {
				passwordsCopy = state.passwords.filter(
					(pass) => pass.groupId === payload
				);
			}
			return {
				...state,
				selectedGroup: payload,
				selectedPasswords: passwordsCopy,
				selectedPassword: null,
			};
		case ADD_GROUP:
			return {
				...state,
				groups: [...state.groups, payload],
			};
		case GET_PASSWORDS:
			return {
				...state,
				passwords: payload,
				selectedPasswords: payload,
				selectedPassword: null,
			};
		case ADD_PASSWORD:
			if (
				state.selectedGroup &&
				state.selectedGroup === payload.groupId
			) {
				passwordsCopy = [...state.selectedPasswords, payload];
			} else {
				passwordsCopy = [...state.passwords, payload];
			}
			return {
				...state,
				passwords: [...state.passwords, payload],
				selectedPasswords: passwordsCopy,
			};
		case SET_PASSWORD:
			index = state.passwords.findIndex((pass) => pass.id === payload);
			return {
				...state,
				selectedPassword: state.passwords[index],
			};
		default:
			return state;
	}
};

export default dataReducer;
