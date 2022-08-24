import { format, addMonths, subMonths } from "date-fns";
import {
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";
import { NextApiHandler } from "next";

import db from "lib/initApp";

const database = getFirestore(db);

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "GET") {
		const { month, year } = req.query;

		if (
			!month ||
			!year ||
			typeof month !== "string" ||
			typeof year !== "string"
		) {
			return res.status(400).json({
				success: false,
				message: "month & year sont nécessaires.",
			});
		}

		const currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
		const previousMonth = subMonths(currentDate, 1);
		const nextMonth = addMonths(currentDate, 1);

		const yearMonths = [previousMonth, currentDate, nextMonth].map(date =>
			format(date, "yyyy-MM")
		);

		const q = query(
			collection(database, "events"),
			where("yearMonth", "in", yearMonths)
		);
		const querySnapshot = await getDocs(q);

		let data = <EventResponse[]>[];
		querySnapshot.forEach(doc => {
			const { name, organiser, yearMonth, location, timestamp } = doc.data();
			data.push({
				name,
				organiser,
				yearMonth,
				location,
				timestamp,
			});
		});

		return res.status(200).json({
			data: data,
		});
	}
};

export default handler;
