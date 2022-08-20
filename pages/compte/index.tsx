import {
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
	AuthAction,
} from "next-firebase-auth";

import SignOutButton from "components/account/SignOutButton";

const Compte = () => {
	const AuthUser = useAuthUser();
	console.log(AuthUser);

	return (
		<div>
			<SignOutButton />
		</div>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (/*{ AuthUser, req }*/) => {
	return {
		props: {},
	};
});

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Compte);
