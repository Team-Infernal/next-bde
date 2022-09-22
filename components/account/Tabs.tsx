import cn from "classnames";
import { AuthUser } from "next-firebase-auth";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
	user: AuthUser;
};

const Tabs = ({ user }: Props) => {
	const { pathname } = useRouter();

	return (
		<div className="tabs">
			<Link href="/compte">
				<a
					className={cn("tab tab-bordered", {
						"tab-active": pathname === "/compte",
					})}
				>
					Général
				</a>
			</Link>
			{!!user.claims.admin && (
				<Link href="/compte/admin">
					<a
						className={cn("tab tab-bordered", {
							"tab-active": pathname === "/compte/admin",
						})}
					>
						Administration
					</a>
				</Link>
			)}
		</div>
	);
};

export default Tabs;
