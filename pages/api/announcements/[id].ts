import { NextApiHandler } from "next";
import { getFirebaseAdmin, verifyIdToken } from "next-firebase-auth";

const adminFirestore = getFirebaseAdmin().firestore();

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const AuthUser = await verifyIdToken(req.headers.authorization as string);
			const isAdmin = !!AuthUser.claims.admin;

			if (!isAdmin) {
				return res.status(403).json({
					success: false,
					message: "Autorisations insuffisantes.",
				});
			}

			const id = req.query.id as string;

			return adminFirestore
				.doc(`announcements/${id}`)
				.delete()
				.then(() =>
					res.status(200).json({
						success: true,
					})
				)
				.catch(err => {
					throw new Error(err);
				});
		} catch (err: any) {
			return res.status(500).json({
				success: false,
				message: err.message,
			});
		}
	}

	return res.status(405).json({
		success: false,
		message: "Méthode non-autorisée.",
	});
};

export default handler;
