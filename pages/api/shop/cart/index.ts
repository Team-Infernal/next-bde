import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	getFirestore,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { NextApiHandler } from "next";
import { verifyIdToken } from "next-firebase-auth";

import db from "lib/initApp";

import { CartFinalItem, CartItem, ShopItem } from "types";

type DeleteRequestBody = {
	id: string;
	size?: string;
};

const firestore = getFirestore(db);

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "GET") {
		try {
			const AuthUser = await verifyIdToken(req.headers.authorization as string);
			const cartRef = doc(firestore, "shopCarts", AuthUser.id as string);
			const cartSnap = await getDoc(cartRef);

			if (!cartSnap.exists()) {
				throw new Error("Panier introuvable.");
			}

			const cartItems: CartItem[] = cartSnap.data().items;

			let items = [];
			let total = 0;

			for (const item of cartItems) {
				const itemSnap = await getDoc(item.ref);

				if (!itemSnap.exists()) {
					throw new Error("Article introuvable");
				}

				const shopItem = itemSnap.data() as ShopItem;
				const currentPrice = parseFloat(
					((shopItem.promo || shopItem.price) * item.quantity).toFixed(2)
				);

				items.push({
					id: item.id,
					quantity: item.quantity,
					size: item.size,
					item: {
						id: item.id,
						category: shopItem.category,
						description: shopItem.description,
						name: shopItem.name,
						price: shopItem.price,
						promo: shopItem.promo,
						sizes: shopItem.sizes,
						images: shopItem.images,
					},
				});
				total += currentPrice;
			}

			return res.status(200).json({
				success: true,
				items,
				total,
			});
		} catch (err: any) {
			return res.status(500).json({
				success: false,
				message: err.message,
			});
		}
	} else if (req.method === "PUT") {
		try {
			const AuthUser = await verifyIdToken(req.headers.authorization as string);
			const cartRef = doc(firestore, "shopCarts", AuthUser.id as string);
			const cartSnap = await getDoc(cartRef);

			if (!cartSnap.exists()) {
				throw new Error("Panier introuvable.");
			}

			const { items } = cartSnap.data();
			const newItem: CartItem = JSON.parse(req.body);
			newItem.ref = doc(firestore, "shop", newItem.id);

			const alreadyInCart = items.some(
				(item: CartItem) => item.id === newItem.id && item.size === newItem.size
			);

			if (alreadyInCart) {
				const newItems = items.map((item: CartItem) =>
					item.id === newItem.id && item.size === newItem.size
						? {
								...item,
								quantity: item.quantity + newItem.quantity,
						  }
						: item
				);

				await setDoc(cartRef, {
					items: newItems,
				});
			} else {
				await updateDoc(cartRef, {
					items: arrayUnion({
						id: newItem.id,
						size: newItem.size,
						quantity: newItem.quantity,
						ref: newItem.ref,
					}),
				});
			}

			return res.status(201).json({
				success: true,
				newItem,
			});
		} catch (err: any) {
			return res.status(500).json({
				success: false,
				message: err.message,
			});
		}
	} else if (req.method === "DELETE") {
		try {
			const AuthUser = await verifyIdToken(req.headers.authorization as string);
			const cartRef = doc(firestore, "shopCarts", AuthUser.id as string);
			const cartSnap = await getDoc(cartRef);

			if (!cartSnap.exists()) {
				throw new Error("Panier introuvable.");
			}

			const { id, size }: DeleteRequestBody = JSON.parse(req.body);

			cartSnap.data().items.forEach(async (item: CartItem) => {
				if (item.id === id && item.size === size) {
					await updateDoc(cartRef, {
						items: arrayRemove(item),
					});
				}
			});

			return res.status(200).json({
				success: true,
			});
		} catch (err: any) {
			return res.status(500).json({
				success: false,
				message: err.message,
			});
		}
	} else {
		return res.status(405).json({
			message: "M??thode non-autoris??e.",
		});
	}
};

export default handler;
