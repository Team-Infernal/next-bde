type Props = {
	price: number;
	promo: number | null;
	quantity: number;
};

const CartItemPrice = ({ price, promo, quantity }: Props) => {
	if (promo !== null) {
		return (
			<div className="flex flex-col items-end gap-2">
				<div className="flex gap-2">
					<p className="text-sm font-semibold">
						<span className="line-through">{price}€</span>
					</p>
					<div className="badge badge-info">
						-{Math.round((promo / price) * 100)}%
					</div>
				</div>
				{quantity > 1 && (
					<p className="text-sm font-semibold">
						{quantity} x {promo}€
					</p>
				)}
				<p className="text-lg text-primary font-semibold">
					{(promo * quantity).toFixed(2)}€
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-end">
			{quantity > 1 && (
				<p className="text-sm font-semibold">
					{quantity} x {price}€
				</p>
			)}
			<p className="text-lg text-primary font-semibold">
				{(price * quantity).toFixed(2)}€
			</p>
		</div>
	);
};

export default CartItemPrice;
