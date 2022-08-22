import { getFirestore, collection, getDocs, doc, CollectionReference, DocumentData, QuerySnapshot, addDoc } from 'firebase/firestore/lite';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/initApp'

const database = getFirestore(db);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { method, body } = req;
        const eventsCollection: CollectionReference<DocumentData> = collection(database, 'events');
        switch (method) {
            case 'GET':
                const eventsSnapshot: QuerySnapshot<DocumentData> = await getDocs(eventsCollection);
                const eventList = eventsSnapshot.docs.map(doc => [doc.id, doc.data()]);
                res.status(200).json({ eventList });
                break;
            case 'POST':
                body.starting_date = parseInt(body.starting_date);
                body.ending_date = parseInt(body.ending_date);
                await addDoc(collection(database, 'events'), body);
                res.status(200).json('user successfully added');
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