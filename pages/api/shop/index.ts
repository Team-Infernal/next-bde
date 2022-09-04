import { collection, getFirestore, getDocs } from "firebase/firestore";
import { NextApiHandler } from "next";

import db from "lib/initApp";

import { ShopItem } from "types";

const firestore = getFirestore(db);

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "GET") {
		const querySnapshot = await getDocs(collection(firestore, "shop"));

		let items: ShopItem[] = [];

		querySnapshot.forEach(doc => {
			console.log(doc);
		});

		return res.status(200).json({
			success: true,
			// data: itemIds,
		});
	}

	return res.status(405).json({
		success: false,
		message: "Méthode non-autorisée.",
	});
};

export default handler;
