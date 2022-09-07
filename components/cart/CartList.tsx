import CartListItem from "components/cart/CartListItem";

import { Action, CartFinalItem } from "types";

type Props = {
	cart: CartFinalItem[];
	dispatch: React.Dispatch<Action>;
};

const CartList = ({ cart, dispatch }: Props) => {
	return (
		<div className="col-span-2 flex flex-col">
			{cart.map((item, index) => (
				<div key={`item-${index}`}>
					<CartListItem
						item={item}
						dispatch={dispatch}
					/>
					{index !== cart.length - 1 && <div className="divider"></div>}
				</div>
			))}
		</div>
	);
};

export default CartList;
