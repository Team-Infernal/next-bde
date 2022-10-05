import cn from "classnames";

import { Announcement } from "types";

type Props = {
	index: number;
	announcement: Announcement;
	selectedAnnouncementIndex: number | null;
	setSelectedAnnouncementIndex: React.Dispatch<
		React.SetStateAction<number | null>
	>;
};

const AnnouncementListItem = ({
	index,
	announcement,
	selectedAnnouncementIndex,
	setSelectedAnnouncementIndex,
}: Props) => {
	const isCurrentlySelected = index === selectedAnnouncementIndex;

	const handleAnnouncementClick = () => {
		setSelectedAnnouncementIndex(index);
	};

	return (
		<li
			className={cn(
				"p-4 border-l-4 cursor-pointer transition-all hover:bg-base-200",
				{
					"border-primary": isCurrentlySelected,
					"font-semibold": isCurrentlySelected,
				}
			)}
			onClick={() => handleAnnouncementClick()}
		>
			{announcement.content}
		</li>
	);
};

export default AnnouncementListItem;
