import {
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
	AuthAction,
} from "next-firebase-auth";

import SignOutButton from "components/account/SignOutButton";
import Loader from "components/misc/Loader";

const Compte = () => {
	const AuthUser = useAuthUser();

	if (!AuthUser.firebaseUser) {
		return <Loader scale={3} />;
	}

	return (
		<div className="flex-grow p-16">
			<SignOutButton />
		</div>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
	return {
		props: {},
	};
});

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Compte);
