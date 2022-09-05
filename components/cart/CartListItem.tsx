import Image from "next/future/image";

import CartItemPrice from "components/cart/CartItemPrice";

import { CartFinalItem } from "types";

type Props = {
	item: CartFinalItem;
};

const CartListItem = ({ item }: Props) => {
	const handleDeleteClick = () => {
		console.log(item);
	};

	return (
		<div className="flex justify-between">
			<div className="flex gap-4">
				<Image
					src={item.item.images[0]}
					width={150}
					height={150}
					className="rounded-lg"
					alt={item.item.name}
				/>
				<div className="flex flex-col justify-between">
					<div>
						<h2 className="text-xl font-semibold">{item.item.name}</h2>
						{item.size && (
							<p>
								Taille:{" "}
								<span className="font-semibold">{item.size.toUpperCase()}</span>
							</p>
						)}
						Quantité: <span className="font-semibold">{item.quantity}</span>
					</div>
					<div
						className="link link-hover text-sm opacity-75"
						onClick={() => handleDeleteClick()}
					>
						Supprimer
					</div>
				</div>
			</div>
			<div>
				<CartItemPrice
					price={item.item.price}
					promo={item.item.promo}
					quantity={item.quantity}
				/>
			</div>
		</div>
	);
};

export default CartListItem;
