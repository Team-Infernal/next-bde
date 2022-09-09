import Link from "next/link";

import { router } from "config";

type Props = {
	parentPageName?: string;
	currentPageName: string;
};

const Breadcrumbs = ({ parentPageName, currentPageName }: Props) => {
	return (
		<div className="text-sm breadcrumbs py-8">
			<ul>
				<li>
					<Link href={router.shop.path}>
						<a>{router.shop.name}</a>
					</Link>
				</li>
				{parentPageName && <li>{parentPageName}</li>}
				<li>{currentPageName}</li>
			</ul>
		</div>
	);
};

export default Breadcrumbs;
