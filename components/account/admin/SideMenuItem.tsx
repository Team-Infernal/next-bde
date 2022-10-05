import cn from "classnames";

type Props = {
	index: number;
	active: boolean;
	text: string;
	setSelectedInterfaceIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SideMenuItem = ({
	index,
	active,
	text,
	setSelectedInterfaceIndex,
}: Props) => {
	return (
		<li
			className={cn(
				"border-l-4 p-4 cursor-pointer transition-all hover:bg-base-200",
				{
					"border-primary": active,
					"border-base-200": !active,
					"font-semibold": active,
				}
			)}
			onClick={() => setSelectedInterfaceIndex(index)}
		>
			{text}
		</li>
	);
};

export default SideMenuItem;
