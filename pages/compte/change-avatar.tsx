import Title from "components/misc/Title";
import ChangeContainer from "components/account/update/ChangeContainer";
import ChangeAvatar from "components/account/update/ChangeAvatar";
import { useAuthUser, withAuthUser } from "next-firebase-auth";

const ChangeAvatarPage = () => {
	const AuthUser = useAuthUser();

	return (
		<>
			<Title text="Changer d'avatar" />
			<ChangeContainer type="Avatar">
				<ChangeAvatar email={AuthUser.email || ""} />
			</ChangeContainer>
		</>
	);
};

export default withAuthUser()(ChangeAvatarPage);
