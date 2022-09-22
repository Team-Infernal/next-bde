import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { Announcement } from "types";
import Link from "next/link";

const AnnouncementsBanner = () => {
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);
	const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

	useEffect(() => {
		let isCancelled = false;

		fetch("/api/announcements", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				if (data.success && !isCancelled) {
					isCancelled = true;
					setAnnouncements(data.announcements);
				}
			});

		return () => {
			isCancelled = true;
		};
	}, []);

	const handlePreviousAnnouncementClick = () => {
		setCurrentAnnouncementIndex(currentIndex =>
			currentIndex - 1 < 0 ? announcements.length - 1 : currentIndex - 1
		);
	};

	const handleNextAnnouncementClick = () => {
		setCurrentAnnouncementIndex(currentIndex =>
			currentIndex + 1 > announcements.length - 1 ? 0 : currentIndex + 1
		);
	};

	const AnnouncementContent = (announcement: Announcement, seeMore = false) => {
		return (
			<p className="font-semibold uppercase">
				{announcement.content}
				{seeMore && (
					<>
						{" "}
						- <span className="underline">Voir plus</span>
					</>
				)}
			</p>
		);
	};

	if (announcements.length === 0) {
		return <></>;
	}

	return (
		<div className="m-3 p-2 rounded-lg bg-info flex justify-between items-center gap-2 animate-fade-in-up">
			<button
				className={cn("btn btn-square btn-ghost", {
					invisible: announcements.length === 1,
				})}
				onClick={() => handlePreviousAnnouncementClick()}
			>
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>
			<div
				className={cn(
					"flex-grow self-stretch flex items-center justify-center",
					{
						"cursor-pointer": !!announcements[currentAnnouncementIndex].path,
					}
				)}
			>
				{!!announcements[currentAnnouncementIndex].path ? (
					<Link href={announcements[currentAnnouncementIndex].path as string}>
						<a>
							{AnnouncementContent(
								announcements[currentAnnouncementIndex],
								true
							)}
						</a>
					</Link>
				) : (
					AnnouncementContent(announcements[currentAnnouncementIndex])
				)}
			</div>
			<button
				className={cn("btn btn-square btn-ghost", {
					invisible: announcements.length === 1,
				})}
				onClick={() => handleNextAnnouncementClick()}
			>
				<FontAwesomeIcon icon={faAngleRight} />
			</button>
		</div>
	);
};

export default AnnouncementsBanner;
