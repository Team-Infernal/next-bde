import Image from "next/future/image";
import Link from "next/link";

import config, { navbar } from "config";

const Navbar = () => {
	return (
		<div className="navbar bg-base-100 px-10 shadow-md">
			<div className="navbar-start">
				<Link href="/">
					<a>
						<Image
							src="/img/logo_cropped.jpg"
							width={100}
							height={100}
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
				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img src="https://placeimg.com/80/80/people" />
						</div>
					</label>
					<ul
						tabIndex={0}
						className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							<Link href={config.router.signin.path}>
								<a>{config.router.signin.name}</a>
							</Link>
						</li>
						<li>
							<Link href={config.router.signup.path}>
								<a>{config.router.signup.name}</a>
							</Link>
						</li>
						<li>
							<Link href={config.router.account.path}>
								<a>{config.router.account.name}</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
