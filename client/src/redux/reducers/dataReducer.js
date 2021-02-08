import {
	GET_GROUPS,
	SET_GROUP,
	ADD_GROUP,
	UPDATE_GROUP,
	SET_SHOW_EDIT_GROUP,
	GET_PASSWORDS,
	ADD_PASSWORD,
	GET_PASSWORD,
	UPDATE_PASSWORD,
	SET_PASSWORD,
} from "../types";

const initialState = {
	groups: [],
	selectedGroup: null,
	showEditGroup: null,
	passwords: [],
	selectedPasswords: [],
	selectedPassword: null,
	showEditPassword: null,
};

let index,
	groupsCopy,
	passwordsCopy,
	selectedPasswordsCopy,
	selectedPasswordCopy;

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
					(pass) => pass.groupId === payload.id
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
		case UPDATE_GROUP:
			groupsCopy = state.groups;
			index = state.groups.findIndex((group) => group.id === payload.id);
			groupsCopy[index] = payload;
			return {
				...state,
				groups: groupsCopy,
				selectedGroup: payload,
			};
		case SET_SHOW_EDIT_GROUP:
			return {
				...state,
				showEditGroup: !!payload,
				selectedGroup: payload ? payload : state.selectedGroup,
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
		case UPDATE_PASSWORD:
			passwordsCopy = state.passwords;
			index = state.passwords.findIndex((pass) => pass.id === payload.id);
			passwordsCopy[index] = payload;
			selectedPasswordsCopy = state.selectedPasswords;
			index = state.selectedPasswords.findIndex(
				(pass) => pass.id === payload.id
			);
			selectedPasswordsCopy[index] = payload;
			return {
				...state,
				passwords: passwordsCopy,
				selectedPasswords: selectedPasswordsCopy,
				selectedPassword: payload,
			};
		case GET_PASSWORD:
			return {
				...state,
				showEditPassword: true,
				selectedPassword: payload,
			};
		case SET_PASSWORD:
			if (payload) {
				index = state.passwords.findIndex(
					(pass) => pass.id === payload
				);
				selectedPasswordCopy = state.passwords[index];
			} else {
				selectedPasswordCopy = null;
			}
			return {
				...state,
				selectedPassword: selectedPasswordCopy,
			};
		default:
			return state;
	}
};

export default dataReducer;
