import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";

import { router } from "config";

const NavbarBasket = () => {
	const AuthUser = useAuthUser();

	const [cartSize, setCartSize] = useState(0);

	useEffect(() => {
		let isCancelled = false;

		if (!AuthUser.id) {
			return;
		}

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/shop/cart/size", {
					method: "GET",
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(data => {
				if (!isCancelled && data.success) {
					setCartSize(data.size);
				}
			});

		return () => {
			isCancelled = true;
		};
	}, [AuthUser]);

	if (cartSize === 0) {
		return (
			<div>
				<Link href={router.cart.path}>
					<a>
						<button className="btn btn-ghost w-12 rounded-full">
							<FontAwesomeIcon
								icon={faBasketShopping}
								className="text-xl text-base-content fa-fw"
							/>
						</button>
					</a>
				</Link>
			</div>
		);
	}

	return (
		<div>
			<Link href={router.cart.path}>
				<a>
					<div className="indicator">
						<span className="indicator-item indicator-bottom indicator-center badge badge-primary">
							{cartSize}
						</span>
						<button className="btn btn-ghost w-12 rounded-full">
							<FontAwesomeIcon
								icon={faBasketShopping}
								className="text-xl text-base-content fa-fw"
							/>
						</button>
					</div>
				</a>
			</Link>
		</div>
	);
};

export default NavbarBasket;
