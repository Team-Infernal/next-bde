import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import config from "config";

const NavbarBasket = () => {
	return (
		<div>
			<Link href={config.router.cart.path}>
				<a>
					<button className="btn btn-ghost w-12 rounded-full">
						<FontAwesomeIcon
							icon={faBasketShopping}
							className="text-xl"
						/>
					</button>
				</a>
			</Link>
		</div>
	);
};

export default NavbarBasket;
