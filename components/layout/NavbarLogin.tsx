import Link from "next/link";

import { router } from "config";

const NavbarLogin = () => {
	return (
		<div>
			<Link href={router.signin.path}>
				<a>
					<button className="btn btn-primary">{router.signin.name}</button>
				</a>
			</Link>
		</div>
	);
};

export default NavbarLogin;
