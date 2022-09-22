import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

import Title from "components/misc/Title";
import Header from "components/account/Header";
import Account from "components/account/Account";
import SignOutButton from "components/account/SignOutButton";
import Loader from "components/misc/Loader";

const AccountPage = () => {
	const AuthUser = useAuthUser();

	if (!AuthUser.firebaseUser) {
		return <Loader />;
	}

	return (
		<>
			<Title text="Compte" />
			<div className="flex-grow flex flex-col gap-16 px-48 py-16">
				<Header name={AuthUser.displayName} />
				<Account user={AuthUser} />
				<SignOutButton />
			</div>
		</>
	);
};

export default withAuthUser({
	LoaderComponent: Loader,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AccountPage);
