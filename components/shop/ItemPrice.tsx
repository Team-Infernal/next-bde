type Props = {
	price: number;
	promo: number | null;
};

const ItemPrice = ({ price, promo }: Props) => {
	const calculatedPrice = (promo || price).toFixed(2);

	return (
		<>
			{promo === null ? (
				<p className="text-lg text-primary font-semibold">{calculatedPrice}€</p>
			) : (
				<div className="flex items-center gap-2">
					<p className="text-sm line-through font-semibold">{price}€</p>
					<p className="text-lg text-primary font-semibold">
						{calculatedPrice}€
					</p>
					<div className="badge badge-info">
						-{Math.round((promo / price) * 100)}%
					</div>
				</div>
			)}
		</>
	);
};

export default ItemPrice;
