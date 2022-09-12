import Head from "next/head";

import Unavailable from "components/misc/Unavailable";

import { app } from "config";

const Clubs = () => {
	return (
		<>
			<Head>
				<title>Clubs - {app.name}</title>
			</Head>
			<div className="flex-grow flex justify-center items-center h-screen lg:h-fit">
				<Unavailable />
			</div>
		</>
	);
};

export default Clubs;
