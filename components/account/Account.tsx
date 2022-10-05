import { AuthUser } from "next-firebase-auth";

import Tabs from "components/account/Tabs";
import UserInfoContainer from "components/account/info/UserInfoContainer";

type Props = {
	user: AuthUser;
};

const Account = ({ user }: Props) => {
	return (
		<>
			{/* <Tabs user={user} /> */}
			<div className="grid grid-cols-2 gap-16">
				<UserInfoContainer user={user} />
			</div>
		</>
	);
};

export default Account;
