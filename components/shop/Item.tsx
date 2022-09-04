import cn from "classnames";
import { useAuthUser } from "next-firebase-auth";
import { useEffect, useReducer, useState } from "react";

import ItemPrice from "components/shop/ItemPrice";
import ItemSizes from "components/shop/ItemSizes";
import ItemQuantity from "components/shop/ItemQuantity";
import ItemImages from "components/shop/ItemImages";

import { INITIAL_STATE, shopItemReducer } from "reducers/shopItemReducer";

import { ShopItem } from "types";

import sleep from "utils/sleep";

type Props = {
	item: ShopItem;
};

const Item = ({ item }: Props) => {
	const AuthUser = useAuthUser();

	const [state, dispatch] = useReducer(shopItemReducer, INITIAL_STATE);

	const handleAddToCartClick = async () => {
		dispatch({ type: "ADD_CART_LOADING" });

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/shop/cart", {
					method: "PUT",
					body: JSON.stringify({
						id: item.id,
						size: state.selectedSize.size,
						quantity: state.quantity,
					}),
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(async data => {
				if (data.success) {
					dispatch({ type: "ADD_CART_SUCCESS" });
					await sleep(2000);
					dispatch({ type: "RESET_BUTTON" });
				} else {
					throw new Error();
				}
			})
			.catch(async err => {
				dispatch({ type: "ADD_CART_ERROR" });
				await sleep(2000);
				dispatch({ type: "RESET_BUTTON" });
			});
	};

	return (
		<div className="grid grid-cols-5 gap-16">
			<div className="col-span-2">
				<ItemImages />
			</div>
			<div className="col-span-3 flex flex-col gap-8 justify-center">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-semibold">{item.name}</h1>
					<ItemPrice
						price={item.price}
						promo={item.promo}
					/>
					<p>{item.description}</p>
				</div>
				<div className="flex gap-8">
					<ItemSizes
						sizes={item.sizes}
						selectedSize={state.selectedSize}
						dispatch={dispatch}
					/>
					<ItemQuantity
						quantity={state.quantity}
						dispatch={dispatch}
					/>
					{state.selectedSize.available ? (
						<button
							className={cn("btn btn-primary flex-grow", {
								loading: state.loading,
								"btn-success": state.addedToCart,
								"btn-error": state.errorAddedToCart,
							})}
							onClick={() => handleAddToCartClick()}
						>
							{state.loading
								? "Ajout au panier..."
								: state.addedToCart
								? "Ajouté au panier !"
								: state.errorAddedToCart
								? "Erreur..."
								: "Ajouter au panier"}
						</button>
					) : (
						<button className="btn btn-warning no-animation cursor-default flex-grow">
							Produit indisponible
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Item;
