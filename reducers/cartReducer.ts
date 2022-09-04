import { Action, CartFinalItem } from "types";

type State = {
	cart: CartFinalItem[];
	total: number | null;
	loading: boolean;
	error: boolean;
};

const INITIAL_STATE: State = {
	cart: [],
	total: null,
	loading: true,
	error: false,
};

const cartReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "FETCH_SUCCESS":
			return {
				cart: action.payload.cart,
				total: action.payload.total,
				loading: false,
				error: false,
			};
		case "FETCH_ERROR":
			return {
				cart: [],
				total: null,
				loading: false,
				error: true,
			};
		default:
			return state;
	}
};

export { cartReducer, INITIAL_STATE };
