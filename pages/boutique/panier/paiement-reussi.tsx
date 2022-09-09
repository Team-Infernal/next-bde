import Head from "next/head";

import { app } from "config";

const PaymentSuccess = () => {
	return (
		<>
			<Head>
				<title>Paiement effectué! - {app.name}</title>
			</Head>
			<div className="flex-grow"></div>;
		</>
	);
};

export default PaymentSuccess;
