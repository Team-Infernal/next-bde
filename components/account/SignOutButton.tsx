import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";

import { router } from "config";

const localRouter = router;

const SignOutButton = () => {
	const router = useRouter();
	const auth = getAuth();

	const [loading, setLoading] = useState(false);

	const handleSignOut = () => {
		setLoading(true);
		signOut(auth).then(() => {
			router.push(localRouter.home.path);
			setLoading(false);
		});
	};

	return (
		<div className="w-fit self-center mt-auto">
			<button
				onClick={() => handleSignOut()}
				className="btn btn-primary"
			>
				{!loading ? "Se déconnecter" : "Déconnexion..."}
			</button>
		</div>
	);
};

export default SignOutButton;
