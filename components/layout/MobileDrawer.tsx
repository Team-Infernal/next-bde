import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";

import { navbar, router } from "config";

type Props = {
	closeDrawer: () => void;
};

const MobileDrawer = ({ closeDrawer }: Props) => {
	const AuthUser = useAuthUser();

	return (
		<ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
			{navbar.map((el, index) => (
				<li
					key={`md-${index}`}
					onClick={() => closeDrawer()}
				>
					<Link href={el.path}>
						<a>{el.name}</a>
					</Link>
				</li>
			))}
			<li onClick={() => closeDrawer()}>
				{AuthUser.firebaseUser ? (
					<Link href={router.account.path}>
						<a>Mon compte</a>
					</Link>
				) : (
					<Link href={router.signin.path}>
						<a>Se connecter</a>
					</Link>
				)}
			</li>
		</ul>
	);
};

export default MobileDrawer;
