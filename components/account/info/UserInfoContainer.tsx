import { AuthUser } from "next-firebase-auth";

import UserInfoLine from "components/account/info/UserInfoLine";
import UserInfoLineAvatar from "components/account/info/UserInfoLineAvatar";

type Props = {
	user: AuthUser;
};

const UserInfoContainer = ({ user }: Props) => {
	const lines = [
		{
			title: "Prénom",
			value: user.displayName?.split("_")[0] || null,
		},
		{
			title: "Nom",
			value: user.displayName?.split("_")[1] || null,
		},
		{
			title: "Adresse mail",
			value: user.email,
			edit: "change-email",
		},
		{
			title: "Téléphone",
			value: user.phoneNumber,
			edit: "change-telephone",
		},
	];
	return (
		<div className="card bg-base-100 shadow-xl">
			<h2 className="p-8 text-2xl font-semibold">Vos informations</h2>
			<dl>
				<UserInfoLineAvatar
					email={user.email || ""}
					photoURL={user.photoURL}
				/>
				{lines.map(line => (
					<>
						<div className="border-t"></div>
						<UserInfoLine
							key={line.title}
							title={line.title}
							value={line.value}
							edit={line?.edit}
						/>
					</>
				))}
			</dl>
		</div>
	);
};

export default UserInfoContainer;
