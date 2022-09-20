import { AuthUser } from "next-firebase-auth";

import UserInfoContainer from "components/account/info/UserInfoContainer";

type Props = {
	user: AuthUser;
};

const Account = ({ user }: Props) => {
	return (
		<div className="grid grid-cols-2 gap-16">
			<UserInfoContainer user={user} />
		</div>
	);
};

export default Account;
