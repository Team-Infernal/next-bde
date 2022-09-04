import CartListItem from "components/shop/CartListItem";

import { CartFinalItem } from "types";

type Props = {
	className: string;
	cart: CartFinalItem[];
};

const CartList = ({ className, cart }: Props) => {
	return (
		<div className={`${className}`}>
			{cart.map((item, index) => (
				<div key={`item-${index}`}>
					<CartListItem item={item} />
					{index !== cart.length - 1 && <div className="divider"></div>}
				</div>
			))}
		</div>
	);
};

export default CartList;
