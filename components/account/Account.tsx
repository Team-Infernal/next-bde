import { AuthUser } from "next-firebase-auth";

import ChangeEmail from "components/account/ChangeEmail";

type Props = {
	user: AuthUser;
};

const Account = ({ user }: Props) => {
	return (
		<div className="grid grid-cols-2 gap-16">
			<ChangeEmail user={user} />
		</div>
	);
};

export default Account;
