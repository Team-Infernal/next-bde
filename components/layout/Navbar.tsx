import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/future/image";
import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";

import NavbarAvatar from "components/layout/NavbarAvatar";
import NavbarBasket from "components/layout/NavbarBasket";
import NavbarLogin from "components/layout/NavbarLogin";

import { navbar } from "config";

const Navbar = () => {
	const AuthUser = useAuthUser();
	const { firebaseUser } = AuthUser;

	return (
		<nav className="navbar bg-base-100 lg:px-10 shadow-md flex-initial z-50">
			<div className="flex-none lg:hidden">
				<label
					htmlFor="drawer"
					className="btn btn-square btn-ghost"
				>
					<FontAwesomeIcon
						icon={faBars}
						className="fa-fw"
					/>
				</label>
			</div>
			<div className="navbar-start hidden lg:flex">
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

			<div className="navbar-center gap-10 hidden lg:flex">
				{navbar.map(el => (
					<Link
						key={el.name}
						href={el.path}
					>
						<a className="btn btn-ghost text-lg">{el.name}</a>
					</Link>
				))}
			</div>

			<div className="navbar-end hidden lg:flex">
				{firebaseUser ? (
					<div className="flex gap-4 items-center">
						<NavbarBasket />
						<NavbarAvatar email={firebaseUser.email} />
					</div>
				) : (
					<NavbarLogin />
				)}
			</div>
		</nav>
	);
};

export default Navbar;
