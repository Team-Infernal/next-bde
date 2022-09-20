import { getStorage, ref, uploadBytes } from "firebase/storage";
import { NextApiHandler } from "next";
import { verifyIdToken } from "next-firebase-auth";

import db from "lib/initApp";

const storage = getStorage(db);

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "PUT") {
		try {
			const AuthUser = await verifyIdToken(req.headers.authorization || "");
			const avatarRef = ref(storage, `avatars/${AuthUser.id}`);
			const fileData = req.body;

			const file = new File(fileData, "test");

			console.log(file);

			uploadBytes(avatarRef, file)
				.then(snapshot => {
					console.log("Uploaded!", snapshot);
				})
				.catch(err => {
					console.warn(err);
				});

			return res.status(201).json({
				success: true,
			});
		} catch (err: any) {
			return res.status(500).json({
				success: false,
				message: err.message,
			});
		}
	}
};

export default handler;
