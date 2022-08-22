import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore/lite';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/initApp'

const database = getFirestore(db);

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { method } = req
		const eventsCollection = collection(database, 'events');

		switch (method) {
			case 'GET':
				const q = query(eventsCollection, where('starting_date', '>=', Date.now()))
				const eventsSnapshot = await getDocs(q)
				const eventList = eventsSnapshot.docs.map(doc => doc.data())
				res.status(200).json({ eventList });
				break;
			default:
				res.status(400).json('An error occured');
				break;
		}
	}
	catch (errorMessage) {
		res.status(400).json(errorMessage)
	}
}