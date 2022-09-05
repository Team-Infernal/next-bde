import { doc, getDoc, getFirestore } from "firebase/firestore";
import { NextApiHandler } from "next";
import { verifyIdToken } from "next-firebase-auth";

import db from "lib/initApp";

import { CartItem } from "types";

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
			let size = items.reduce((prev, curr) => prev + curr.quantity, 0);

			return res.status(200).json({
				success: true,
				size,
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
