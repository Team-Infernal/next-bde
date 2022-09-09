import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";

import { router } from "config";

const Header = () => {
	const AuthUser = useAuthUser();

	return (
		<div className="flex justify-between items-center">
			<h1 className="text-3xl font-semibold">Boutique</h1>
			{AuthUser.id ? (
				<Link href={router.cart.path}>
					<a>
						<button className="btn btn-primary">Mon panier</button>
					</a>
				</Link>
			) : (
				<Link href={router.signin.path}>
					<a>
						<button className="btn btn-ghost">
							Connectez-vous pour accéder à votre panier
						</button>
					</a>
				</Link>
			)}
		</div>
	);
};

export default Header;
