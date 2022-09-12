import { useRouter } from "next/router";
import { useRef } from "react";

import Navbar from "components/layout/Navbar";
import MobileDrawer from "components/layout/MobileDrawer";
import Footer from "components/layout/Footer";

type Props = {
	children: any;
};

const Layout = ({ children }: Props) => {
	const { pathname } = useRouter();

	const displayFooter = !["/auth/signin", "/auth/signup"].includes(pathname);

	const drawerCheckbox = useRef<HTMLInputElement>(null);

	const closeDrawer = () => {
		if (drawerCheckbox.current !== null) {
			drawerCheckbox.current.checked = false;
		}
	};

	return (
		<div className="drawer">
			<input
				type="checkbox"
				id="drawer"
				ref={drawerCheckbox}
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				<Navbar />
				{children}
				{displayFooter && <Footer />}
			</div>
			<div className="drawer-side">
				<label
					htmlFor="drawer"
					className="drawer-overlay"
				></label>
				<MobileDrawer closeDrawer={closeDrawer} />
			</div>
		</div>
	);
};

export default Layout;
