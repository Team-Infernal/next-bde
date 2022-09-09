import Head from "next/head";

import { app } from "config";

const Accueil = () => {
	return (
		<>
			<Head>
				<title>{app.name}</title>
			</Head>
			<div className="flex-grow">
				<h1>Hello world</h1>
			</div>
		</>
	);
};

export default Accueil;
