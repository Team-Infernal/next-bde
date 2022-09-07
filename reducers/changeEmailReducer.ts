import { Action } from "types";

type State = {
	email: string | null;
	success: boolean;
	warning: boolean;
	error: boolean;
	loading: boolean;
};

const INITIAL_STATE: State = {
	email: null,
	success: false,
	warning: false,
	error: false,
	loading: false,
};

const ACTIONS = {
	INITIAL_SETUP: "INITIAL_SETUP",
	CHANGE: "CHANGE",
	FETCH_SUCCESS: "FETCH_SUCCESS",
	FETCH_ERROR: "FETCH_ERROR",
	LOADING: "LOADING",
};

const changeEmailReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "INITIAL_SETUP":
			return {
				...state,
				email: action.payload,
			};
		case "CHANGE":
			return {
				email: action.payload.email,
				success: false,
				warning: action.payload.warning,
				error: false,
				loading: false,
			};
		case "FETCH_SUCCESS":
			return {
				email: state.email,
				success: true,
				warning: false,
				error: false,
				loading: false,
			};
		case "FETCH_ERROR":
			return {
				email: state.email,
				success: false,
				warning: false,
				error: true,
				loading: false,
			};
		case "LOADING":
			return {
				email: state.email,
				success: false,
				warning: false,
				error: false,
				loading: true,
			};
		default:
			return state;
	}
};

export { changeEmailReducer, INITIAL_STATE, ACTIONS };
