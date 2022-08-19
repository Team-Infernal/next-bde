import { NextApiHandler } from "next";
import { unsetAuthCookies } from "next-firebase-auth";

import initAuth from "lib/initAuth";
initAuth();

const handler: NextApiHandler = async (req, res) => {
	try {
		await unsetAuthCookies(req, res);
	} catch (err) {
		return res.status(500).json({ message: "Erreur." });
	}

	return res.status(200).json({ success: true });
};

export default handler;
