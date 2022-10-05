import AnnouncementManagement from "components/account/admin/panels/announcements/AnnouncementManagement";
import ShopManagement from "components/account/admin/panels/shop/ShopManagement";
import TicketManagement from "components/account/admin/panels/tickets/TicketManagement";

import { AdminInterface } from "types";

type Props = {
	currentInterface: AdminInterface;
};

const panels = new Map();
panels.set("announcement-mgmt", AnnouncementManagement);
panels.set("shop-mgmt", ShopManagement);
panels.set("ticket-mgmt", TicketManagement);

const PanelContainer = ({ currentInterface }: Props) => {
	const Panel = panels.get(currentInterface.id);

	return (
		<div className="flex-grow p-12 flex flex-col">
			<h2 className="text-lg">Administration</h2>
			<h1 className="text-2xl font-semibold underline decoration-primary">
				{currentInterface.header}
			</h1>
			<Panel />
		</div>
	);
};

export default PanelContainer;
