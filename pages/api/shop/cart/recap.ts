import { doc, getDoc, getFirestore } from "firebase/firestore";
import { NextApiHandler } from "next";
import { verifyIdToken } from "next-firebase-auth";

import db from "lib/initApp";

import { CartFinalItem, CartItem } from "types";

const firestore = getFirestore(db);

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "GET") {
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
				total +=
					data.promo !== null
						? data.promo * item.quantity
						: data.price * item.quantity;
			}

			return res.status(200).json({
				success: true,
				items: cartItems,
				total,
			});
		} catch (err: any) {
			return res.status(500).json({
				success: false,
				message: err.message,
			});
		}
	} else {
		return res.status(405).json({
			success: false,
			message: "Méthode non-autorisée.",
		});
	}
};

export default handler;
