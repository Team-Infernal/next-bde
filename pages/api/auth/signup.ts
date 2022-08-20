import { NextApiHandler } from "next";
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";

import {
	verifyEmail,
	verifyPassword,
	verifyName,
} from "utils/formVerification";
import errMsg from "utils/firebaseErrors";

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405);
	}

	const { email, password, firstName, lastName } = req.body;

	const emailV = verifyEmail(email);
	// const passV = verifyPassword(password);
	const fnameV = verifyName(firstName);
	const lnameV = verifyName(lastName);

	if (
		!emailV.isValid ||
		/*!passV.isValid ||*/ !fnameV.isValid ||
		!lnameV.isValid
	) {
		return res.status(400).json({
			success: false,
			errors: [
				...emailV.errors,
				// ...passV.errors,
				...fnameV.errors,
				...lnameV.errors,
			],
		});
	}

	try {
		const auth = getAuth();

		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const { user } = userCredential;

		await updateProfile(user, { displayName: `${firstName}_${lastName}` });
		sendEmailVerification(user);

		return res.status(200).json({
			success: true,
			user: {
				uid: user.uid,
				email: user.email,
				firstName: user.displayName?.split("_")[0],
				lastName: user.displayName?.split("_")[1],
			},
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			error: errMsg(error.code),
		});
	}
};

export default handler;
