import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { withAuthUser } from "next-firebase-auth";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";

import initAuth from "lib/initAuth";

import "styles/globals.css";

config.autoAddCss = false;
initAuth();

const BDECesiRouen = ({ Component, pageProps }: AppProps) => {
	const { pathname } = useRouter();

	const displayFooter = !["/auth/signin", "/auth/signup"].includes(pathname);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<Component {...pageProps} />
			{displayFooter && <Footer />}
		</div>
	);
};

export default withAuthUser()(BDECesiRouen as () => JSX.Element);
