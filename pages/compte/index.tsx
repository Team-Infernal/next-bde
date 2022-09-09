import Head from "next/head";
import {
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
	AuthAction,
} from "next-firebase-auth";

import Header from "components/account/Header";
import Account from "components/account/Account";
import SignOutButton from "components/account/SignOutButton";
import Loader from "components/misc/Loader";

import { app } from "config";

const Compte = () => {
	const AuthUser = useAuthUser();

	if (!AuthUser.firebaseUser) {
		return <Loader scale={3} />;
	}

	return (
		<>
			<Head>
				<title>Compte - {app.name}</title>
			</Head>
			<div className="flex-grow flex flex-col gap-16 px-48 py-16">
				<Header />
				<Account user={AuthUser} />
				<SignOutButton />
			</div>
		</>
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
