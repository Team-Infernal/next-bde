import Head from "next/head";

import { app } from "config";

type Props = {
	text: string;
};

const Title = ({ text }: Props) => {
	const title = `${text} - ${app.name}`;

	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
};

export default Title;
