import {
	getFirestore,
	collection,
	getDocs,
	doc,
	CollectionReference,
	DocumentData,
	QuerySnapshot,
	addDoc,
} from "firebase/firestore/lite";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/initApp";

const database = getFirestore(db);

const requiredParams = [
	"name",
	"price",
	"remaining_stock",
	"seller",
	"image",
	"location",
	"shipping_date",
	"ending_date",
	"roles_denied",
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { method, body } = req;
		const productsCollection: CollectionReference<DocumentData> = collection(
			database,
			"products"
		);
		switch (method) {
			case "GET":
				const productsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
					productsCollection
				);
				const productList = productsSnapshot.docs.map(doc => [
					doc.id,
					doc.data(),
				]);
				res.status(200).json({ productList });
				break;
			case "POST":
				let correctlyFilled = true;
				for (let i of requiredParams) {
					if (!Object.keys(body).includes(i)) correctlyFilled = false;
				}
				if (correctlyFilled) {
					body.starting_date = parseInt(body.starting_date);
					body.ending_date = parseInt(body.ending_date);
					await addDoc(collection(database, "products"), body);
					res.status(201).json("product successfully added");
				} else res.status(400).json("Wrong params entered");
				break;
			default:
				res.status(400).json("An error occured");
				break;
		}
	} catch (errorMessage) {
		res.status(400).json(errorMessage);
	}
};

export default handler;
