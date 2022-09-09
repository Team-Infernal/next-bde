import Head from "next/head";

import { app } from "config";

const PageNotFound = () => {
	return (
		<>
			<Head>
				<title>Erreur 404 - {app.name}</title>
			</Head>
			<div className="flex-grow flex items-center justify-center flex-col gap-4">
				<h1 className="text-primary text-3xl font-semibold">Erreur 404</h1>
				<p>La page que vous cherchez n&apos;existe pas...</p>
			</div>
		</>
	);
};

export default PageNotFound;
