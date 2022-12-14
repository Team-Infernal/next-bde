import { NextApiHandler } from "next";
import { getFirebaseAdmin, verifyIdToken } from "next-firebase-auth";

const { auth } = getFirebaseAdmin();

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "PUT") {
		try {
			const AuthUser = await verifyIdToken(req.headers.authorization || "");
			const email: string = JSON.parse(req.body);
			const cleanEmail = email.trim().toLowerCase();

			return auth()
				.updateUser(AuthUser.id || "", {
					email: cleanEmail,
				})
				.then(userRecord => {
					return res.status(201).json({
						success: true,
						email: userRecord.email,
					});
				})
				.catch(err => {
					throw new Error(err.message);
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
