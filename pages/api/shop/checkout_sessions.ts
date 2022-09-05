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

			const cartRef = doc(firestore, "shopCarts", AuthUser.id as string);
			const cartSnap = await getDoc(cartRef);

			if (!cartSnap.exists()) {
				return res.status(500).json({
					success: false,
					message: "Panier introuvable.",
				});
			}

			const items = cartSnap.data().items as CartItem[];
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
						id: item.id,
						category: data.category,
						description: data.description,
						name: data.name,
						price: data.price,
						promo: data.promo,
						sizes: data.sizes,
						images: data.images,
					},
				});
			}

			let line_items = [];

			for (const item of cartItems) {
				const price = parseInt(
					((item.item.promo || item.item.price) * 100).toFixed(2)
				);

				line_items.push({
					price_data: {
						currency: "EUR",
						product_data: {
							name: `${item.item.name}${
								item.size && ` - ${item.size.toUpperCase()}`
							}`,
							images: item.item.images.slice(0, 7),
						},
						unit_amount: price,
					},
					quantity: item.quantity,
				});
			}

			const session = await stripe.checkout.sessions.create({
				line_items,
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
		} catch (err: any) {
			return res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).json("Méthode non-autorisée.");
	}
};

export default handler;
