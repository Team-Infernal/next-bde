import cn from "classnames";
import Image from "next/future/image";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

import CartItemPrice from "components/cart/CartItemPrice";

import { ACTIONS } from "reducers/cartReducer";

import { Action, CartFinalItem } from "types";

type Props = {
	item: CartFinalItem;
	dispatch: React.Dispatch<Action>;
};

const CartListItem = ({ item, dispatch }: Props) => {
	const AuthUser = useAuthUser();

	const [loading, setLoading] = useState(false); // reducer

	const handleDeleteClick = () => {
		if (!AuthUser.id || loading) {
			return;
		}

		setLoading(true);

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/shop/cart", {
					method: "DELETE",
					body: JSON.stringify({
						id: item.id,
						size: item.size,
					}),
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(data => {
				setLoading(false);
				if (data.success) {
					dispatch({ type: ACTIONS.DELETE_ITEM, payload: item });
				}
			});
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
						className={cn("btn btn-ghost btn-sm opacity-75", {
							loading: loading,
						})}
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
