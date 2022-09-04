import { Action } from "types";

type State = {
	selectedSize: {
		size: string;
		available: boolean;
	};
	quantity: number;
	loading: boolean;
	addedToCart: boolean;
	errorAddedToCart: boolean;
};

const INITIAL_STATE: State = {
	selectedSize: {
		size: "m",
		available: true,
	},
	quantity: 1,
	loading: false,
	addedToCart: false,
	errorAddedToCart: false,
};

const shopItemReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "CHANGE_SIZE":
			return {
				...state,
				selectedSize: {
					size: action.payload.size,
					available: action.payload.available,
				},
			};
		case "CHANGE_QUANTITY":
			return {
				...state,
				quantity: action.payload,
			};
		case "ADD_CART_LOADING":
			return {
				...state,
				loading: true,
			};
		case "ADD_CART_SUCCESS":
			return {
				...state,
				addedToCart: true,
				loading: false,
			};
		case "ADD_CART_ERROR":
			return {
				...state,
				errorAddedToCart: true,
				loading: false,
			};
		case "RESET_BUTTON":
			return {
				...state,
				addedToCart: false,
				errorAddedToCart: false,
			};
		default:
			return state;
	}
};

export { shopItemReducer, INITIAL_STATE };
