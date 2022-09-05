import { Action } from "types";

type State = {
	email: string | null;
	success: boolean;
	error: boolean;
	loading: boolean;
};

const INITIAL_STATE: State = {
	email: null,
	success: false,
	error: false,
	loading: false,
};

const changeEmailReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "INITIAL_SETUP":
			return {
				...state,
				email: action.payload,
			};
		default:
			return state;
	}
};

export { changeEmailReducer, INITIAL_STATE };
