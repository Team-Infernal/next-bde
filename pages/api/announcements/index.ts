import {
	collection,
	getDocs,
	getFirestore,
	orderBy,
	query,
	Timestamp,
	where,
} from "firebase/firestore";
import { NextApiHandler } from "next";

import db from "lib/initApp";

import { Announcement } from "types";

const firestore = getFirestore(db);

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "GET") {
		try {
			const date = Timestamp.fromDate(new Date());
			const announcementsRef = collection(firestore, "announcements");
			const q = query(
				announcementsRef,
				where("startDateTime", "<=", date),
				orderBy("startDateTime")
			);
			const querySnapshot = await getDocs(q);

			let announcements: Announcement[] = [];

			querySnapshot.forEach(doc => {
				const announcement = doc.data() as Announcement;
				announcements.push({
					...announcement,
					id: doc.id,
				});
			});

			res.status(200).json({
				success: true,
				announcements,
			});
		} catch (err) {
			console.warn(err);
			res.status(500).json({
				success: false,
			});
		}
	} else {
		res.status(405).json({
			success: false,
			message: "Méthode non-autorisée.",
		});
	}
};

export default handler;
