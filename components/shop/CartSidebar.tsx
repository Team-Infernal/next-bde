import cn from "classnames";
import { useAuthUser } from "next-firebase-auth";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
	total: number | null;
};

const CartSidebar = ({ total }: Props) => {
	const AuthUser = useAuthUser();
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleOnPaymentClick = () => {
		setLoading(true);

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/shop/checkout_sessions", {
					method: "POST",
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				router.push(data.payment_url);
			});
	};

	return (
		<div className="card w-full h-fit bg-base-100 shadow-xl">
			<div className="card-body justify-between">
				<h2 className="card-title">
					{total !== null && (
						<>
							Total: {total}€{" "}
							<span className="text-sm text-base-content">TVA incluse</span>
						</>
					)}
				</h2>
				<div className="card-actions flex">
					{total === null || !AuthUser.email ? (
						<button className="btn btn-disabled loading">
							Chargement de votre total...
						</button>
					) : (
						<button
							className={cn("btn btn-primary w-full", {
								loading: loading,
							})}
							onClick={() => handleOnPaymentClick()}
						>
							{!loading ? "Procéder au paiement" : "Redirection en cours..."}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartSidebar;
