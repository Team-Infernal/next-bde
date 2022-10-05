import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import { useState } from "react";

import Title from "components/misc/Title";
import SideMenu from "components/account/admin/SideMenu";
import PanelContainer from "components/account/admin/PanelContainer";

import { api } from "config";

import { AdminInterface } from "types";

const interfaces: AdminInterface[] = [
	{
		id: "announcement-mgmt",
		name: "Annonces",
		header: "Gestion des annonces",
	},
	{
		id: "shop-mgmt",
		name: "Boutique",
		header: "Gestion de la boutique",
	},
	{
		id: "ticket-mgmt",
		name: "Billets",
		header: "Gestion des billets",
	},
];

const AdminPage = () => {
	const [selectedInterfaceIndex, setSelectedIntefaceIndex] = useState(0);

	return (
		<>
			<Title text="Administration" />
			<div className="flex-grow flex">
				<SideMenu
					interfaces={interfaces}
					selectedInterfaceIndex={selectedInterfaceIndex}
					setSelectedInterfaceIndex={setSelectedIntefaceIndex}
				/>
				<PanelContainer currentInterface={interfaces[selectedInterfaceIndex]} />
			</div>
		</>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
	if (!AuthUser?.claims?.admin) {
		return {
			redirect: {
				permanent: false,
				destination: api.signin,
			},
		};
	}

	return {
		props: {},
	};
});

export default AdminPage;
