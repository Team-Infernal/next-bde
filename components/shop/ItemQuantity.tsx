import { Action } from "types";

type Props = {
	quantity: number;
	dispatch: React.Dispatch<Action>;
};

const quantities = Array.from({ length: 10 }, (_, index) => index + 1);

const ItemQuantity = ({ dispatch }: Props) => {
	return (
		<select
			className="select select-primary"
			onChange={event =>
				dispatch({
					type: "CHANGE_QUANTITY",
					payload: parseInt(event.target.value),
				})
			}
		>
			{quantities.map(quantity => (
				<option
					key={`quantity-${quantity}`}
					value={quantity}
				>
					{quantity}
				</option>
			))}
		</select>
	);
};

export default ItemQuantity;
