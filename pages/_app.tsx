import type { AppProps } from "next/app";
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
	return (
		<>
			<Navbar />
			<main>
				<Component {...pageProps} />
			</main>
			<Footer />
		</>
	);
};

export default withAuthUser()(BDECesiRouen as () => JSX.Element);
