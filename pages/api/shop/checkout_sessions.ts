import { doc, getDoc, getFirestore } from "firebase/firestore";
import { NextApiHandler } from "next";
import { verifyIdToken } from "next-firebase-auth";
import Stripe from "stripe";

import db from "lib/initApp";

import { CartFinalItem, CartItem } from "types";

const firestore = getFirestore(db);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2022-08-01",
});

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const AuthUser = await verifyIdToken(req.headers.authorization as string);
			const token = await AuthUser.getIdToken();
			console.log(token);

			const cartRef = doc(firestore, "shopCarts", AuthUser.id as string);
			const cartSnap = await getDoc(cartRef);

			if (!cartSnap.exists()) {
				return res.status(500).json({
					success: false,
					message: "Panier introuvable.",
				});
			}

			const items = cartSnap.data().items as CartItem[];
			let total = 0;
			let cartItems: CartFinalItem[] = [];

			for (const item of items) {
				const itemSnap = await getDoc(item.ref);

				if (!itemSnap.exists()) {
					return res.status(500).json({
						success: false,
						message: "Une erreur est survenue. Veuillez réessayer plus tard.",
					});
				}

				const data = itemSnap.data();
				cartItems.push({
					id: item.id,
					quantity: item.quantity,
					size: item.size,
					item: {
						category: data.category,
						description: data.description,
						name: data.name,
						price: data.price,
						promo: data.promo,
						sizes: data.sizes,
						images: data.images,
					},
				});
				total +=
					data.promo !== null
						? data.promo * item.quantity
						: data.price * item.quantity;
			}

			console.log(cartItems);

			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						price: "price_1LczQCGGrI70u7SM6AeOlkHS",
						quantity: 1,
					},
				],
				customer_email: AuthUser.email ?? undefined,
				mode: "payment",
				billing_address_collection: "required",
				shipping_address_collection: {
					allowed_countries: ["FR"],
				},
				success_url: `${req.headers.origin}/boutique/panier/paiement-reussi`,
				cancel_url: `${req.headers.origin}/boutique/panier`,
				locale: "fr",
				payment_method_types: ["card"],
				phone_number_collection: {
					enabled: true,
				},
			});
			return res.status(200).json({
				payment_url: session.url as string,
			});
			// res.redirect(303, session.url as string);
		} catch (err: any) {
			return res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).json("Méthode non-autorisée.");
	}
};

export default handler;
