import Image from "next/future/image";
import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";

import NavbarAvatar from "components/layout/NavbarAvatar";
import NavbarLogin from "components/layout/NavbarLogin";

import { navbar } from "config";

const Navbar = () => {
	const AuthUser = useAuthUser();
	const { firebaseUser } = AuthUser;

	return (
		<nav className="navbar bg-base-100 px-10 shadow-md flex-initial z-50">
			<div className="navbar-start">
				<Link href="/">
					<a>
						<Image
							src="/img/logo (transparent, no text).png"
							width={100}
							height={100}
							alt="Logo du BDE CESI Rouen"
						/>
					</a>
				</Link>
			</div>

			<div className="navbar-center gap-10">
				{navbar.map(el => (
					<Link
						key={el.name}
						href={el.path}
					>
						<a className="btn btn-ghost text-lg">{el.name}</a>
					</Link>
				))}
			</div>

			<div className="navbar-end">
				{firebaseUser ? (
					<NavbarAvatar email={firebaseUser.email} />
				) : (
					<NavbarLogin />
				)}
			</div>
		</nav>
	);
};

export default Navbar;
