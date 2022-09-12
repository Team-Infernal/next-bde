import type { AppProps } from "next/app";
import { withAuthUser } from "next-firebase-auth";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Layout from "components/layout/Layout";

import initAuth from "lib/initAuth";

import "styles/globals.css";

config.autoAddCss = false;
initAuth();

const BDECesiRouen = ({ Component, pageProps }: AppProps) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</div>
	);
};

export default withAuthUser()(BDECesiRouen as () => JSX.Element);
