import ChangeContainer from "components/account/update/ChangeContainer";
import ChangeAvatar from "components/account/update/ChangeAvatar";
import { useAuthUser, withAuthUser } from "next-firebase-auth";

const ChangeAvatarPage = () => {
	const AuthUser = useAuthUser();

	return (
		<ChangeContainer type="Avatar">
			<ChangeAvatar email={AuthUser.email || ""} />
		</ChangeContainer>
	);
};

export default withAuthUser()(ChangeAvatarPage);
