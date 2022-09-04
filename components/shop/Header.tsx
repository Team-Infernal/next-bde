import Link from "next/link";

import config from "config";

const Header = () => {
	return (
		<div className="flex justify-between items-center">
			<h1 className="text-3xl font-semibold">Boutique</h1>
			<Link href={config.router.cart.path}>
				<a>
					<button className="btn btn-primary">Mon panier</button>
				</a>
			</Link>
		</div>
	);
};

export default Header;
