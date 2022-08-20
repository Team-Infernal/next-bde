import Link from "next/link";

import config from "config";

const NavbarLogin = () => {
	return (
		<div>
			<Link href={config.router.signin.path}>
				<a>
					<button className="btn btn-primary">
						{config.router.signin.name}
					</button>
				</a>
			</Link>
		</div>
	);
};

export default NavbarLogin;
