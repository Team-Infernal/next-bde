import { getFirestore, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/initApp'

const database = getFirestore(db);

const requiredParams = [
    'name',
    'price',
    'remaining_stock',
    'seller',
    'image',
    'location',
    'shipping_date',
    'ending_date',
    'roles_denied',
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { method, query, body } = req;
        const id = query.id;
        const docRef = doc(database, 'events', (id as string));
        switch (method) {
            case 'GET':
                const eventsSnapshot = await getDoc(docRef);
                res.status(200).json({ data: eventsSnapshot.data() });
                break;
            case 'PUT':
                let correctlyFilled = true;
                for (let i of requiredParams) {
                    if (!Object.keys(body).includes(i)) correctlyFilled = false;
                }
                if (correctlyFilled) {
                    await setDoc(doc(database, "events", id as string), body);
                    res.status(200).json('sucessfully updated element');
                }
                else res.status(400).json('Wrong parameters entered');
                break;
            default:
                res.status(400).json('an error occured');
                break;
        }
    }
    catch (errorMessage) {
        res.status(400).json(errorMessage)
    }
}