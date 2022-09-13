import Head from "next/head";
import Link from "next/link";
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useEffect, useReducer } from "react";
import { loadStripe } from "@stripe/stripe-js";

import CartList from "components/cart/CartList";
import CartSidebar from "components/cart/CartSidebar";
import Error from "components/misc/Error";
import Loader from "components/misc/Loader";

import { app, router } from "config";

import { cartReducer, INITIAL_STATE, ACTIONS } from "reducers/cartReducer";

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
				fetch("/api/shop/cart", {
					method: "GET",
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(data => {
				if (!isCanceled && data.success) {
					isCanceled = true;
					dispatch({
						type: ACTIONS.FETCH_SUCCESS,
						payload: {
							cart: data.items,
							total: data.total,
						},
					});
				} else if (!data.success) {
					dispatch({
						type: ACTIONS.FETCH_ERROR,
					});
				}
			})
			.catch(err => {
				dispatch({
					type: ACTIONS.FETCH_ERROR,
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
		<>
			<Head>
				<title>Votre panier - {app.name}</title>
			</Head>
			<div className="flex-grow flex flex-col gap-16 py-16 px-48 animate-fade-in-up">
				{AuthUser.email && (
					<>
						<div className="col-span-3">
							<h1 className="text-3xl font-semibold">
								Votre panier {state.cart.length === 0 && "est vide..."}
							</h1>
							<Link href={router.shop.path}>
								<a className="link link-hover">Retour à la boutique</a>
							</Link>
						</div>
						{state.cart.length !== 0 && (
							<div className="grid grid-cols-3 gap-16">
								<CartList
									cart={state.cart}
									dispatch={dispatch}
								/>
								<CartSidebar total={state.total} />
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Panier);
