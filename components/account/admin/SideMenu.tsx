import SideMenuItem from "components/account/admin/SideMenuItem";

import { AdminInterface } from "types";

type Props = {
	interfaces: AdminInterface[];
	selectedInterfaceIndex: number;
	setSelectedInterfaceIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SideMenu = ({
	interfaces,
	selectedInterfaceIndex,
	setSelectedInterfaceIndex,
}: Props) => {
	return (
		<ul className="menu gap-2 bg-base-100 w-64 py-8 border-r-4 border-base-200">
			{interfaces.map((el, index) => (
				<SideMenuItem
					key={el.name}
					index={index}
					active={selectedInterfaceIndex === index}
					text={el.name}
					setSelectedInterfaceIndex={setSelectedInterfaceIndex}
				/>
			))}
		</ul>
	);
};

export default SideMenu;
