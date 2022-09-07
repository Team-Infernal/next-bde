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

const ACTIONS = {
	FETCH_SUCCESS: "FETCH_SUCCESS",
	FETCH_ERROR: "FETCH_ERROR",
	DELETE_ITEM: "DELETE_ITEM",
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
		case "DELETE_ITEM":
			const cart = state.cart.filter(item => item !== action.payload);

			return {
				...state,
				cart,
				total: cart.reduce(
					(prev, curr) =>
						prev +
						parseFloat(
							(curr.quantity * (curr.item.promo || curr.item.price)).toFixed(2)
						),
					0
				),
			};
		default:
			return state;
	}
};

export { cartReducer, INITIAL_STATE, ACTIONS };
