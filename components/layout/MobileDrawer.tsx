import Link from "next/link";

import { navbar } from "config";

type Props = {
	closeDrawer: () => void;
};

const MobileDrawer = ({ closeDrawer }: Props) => {
	return (
		<ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
			{navbar.map((el, index) => (
				<li
					key={`md-${index}`}
					onClick={() => closeDrawer()}
				>
					<Link href={el.path}>
						<a>{el.name}</a>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default MobileDrawer;
