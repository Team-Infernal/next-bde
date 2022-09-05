import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";
import { useEffect, useReducer } from "react";
import { loadStripe } from "@stripe/stripe-js";

import CartList from "components/shop/CartList";
import CartSidebar from "components/shop/CartSidebar";
import Error from "components/misc/Error";
import Loader from "components/misc/Loader";

import config from "config";

import { cartReducer, INITIAL_STATE } from "reducers/cartReducer";

import sleep from "utils/sleep";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Panier = () => {
	const AuthUser = useAuthUser();

	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	useEffect(() => {
		if (!AuthUser.id) {
			return;
		}

		let isCanceled = false;

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/shop/cart/recap", {
					method: "GET",
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(async data => {
				// await sleep(1000);
				return data;
			})
			.then(data => {
				console.log(data);
				if (!isCanceled && data.success) {
					dispatch({
						type: "FETCH_SUCCESS",
						payload: {
							cart: data.items,
							total: data.total,
						},
					});
				} else {
					dispatch({
						type: "FETCH_ERROR",
					});
				}
			})
			.catch(err => {
				dispatch({
					type: "FETCH_ERROR",
				});
			});

		return () => {
			isCanceled = true;
		};
	}, [AuthUser, AuthUser.id]);

	if (state.loading) {
		return <Loader scale={3} />;
	}

	if (state.error) {
		return (
			<Error message="Erreur lors du chargement de votre panier. Veuillez réessayer plus tard." />
		);
	}

	return (
		<div className="flex-grow grid grid-cols-3 gap-16 py-16 px-48">
			{AuthUser.email && (
				<>
					<div className="col-span-3">
						<h1 className="text-3xl font-semibold">Votre panier</h1>
						<Link href={config.router.shop.path}>
							<a className="link link-hover">Retour à la boutique</a>
						</Link>
					</div>

					<CartList
						className="col-span-2"
						cart={state.cart}
					/>
					<CartSidebar total={state.total} />
				</>
			)}
		</div>
	);
};

export default Panier;
