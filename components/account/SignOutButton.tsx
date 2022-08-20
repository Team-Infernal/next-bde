import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";

import config from "config";

const SignOutButton = () => {
	const router = useRouter();
	const auth = getAuth();

	const [loading, setLoading] = useState(false);

	const handleSignOut = () => {
		setLoading(true);
		signOut(auth).then(() => {
			router.push(config.router.home.path);
			setLoading(false);
		});
	};

	return (
		<button
			onClick={() => handleSignOut()}
			className="btn btn-primary"
		>
			{!loading ? "Se déconnecter" : "Déconnexion..."}
		</button>
	);
};

export default SignOutButton;
