import Image from "next/future/image";
import Link from "next/link";

import config from "config";

import gravatar from "utils/gravatar";

type Props = {
	email: string | null;
};

const NavbarAvatar = ({ email }: Props) => {
	return (
		<div className="avatar">
			<div className="w-12 rounded-full">
				<Link href={config.router.account.path}>
					<a>
						<Image
							src={gravatar(email || "")}
							fill
							alt="User's avatar"
						/>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default NavbarAvatar;
