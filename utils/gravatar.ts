import crypto from "crypto";

const gravatar = (email: string) => {
	const cleanEmail = email.trim().toLowerCase();
	const hash = crypto.createHash("md5").update(cleanEmail).digest("hex");
	const url = `https://www.gravatar.com/avatar/${hash}`;

	return url;
};

export default gravatar;
