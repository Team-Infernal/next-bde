import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faAngleRight,
	faExclamation,
	faExclamationCircle,
	faWarning,
} from "@fortawesome/free-solid-svg-icons";
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
			<p className="font-semibold uppercase inline-flex gap-2">
				{announcement.type === "important" && (
					<span>
						<FontAwesomeIcon icon={faExclamationCircle} />
					</span>
				)}
				<span>{announcement.content}</span>
				{seeMore && (
					<>
						<span>-</span>
						<span className="underline">Voir plus</span>
					</>
				)}
			</p>
		);
	};

	const selectedA = announcements[currentAnnouncementIndex];

	if (announcements.length === 0) {
		return <></>;
	}

	return (
		<div
			className={cn(
				"m-3 p-2 mb-0 rounded-lg bg-info flex justify-between items-center gap-2 animate-fade-in-up transition-colors",
				{
					"bg-info": selectedA.type === "info",
					"bg-secondary": selectedA.type === "important",
				}
			)}
		>
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
						"cursor-pointer": !!selectedA.path,
					}
				)}
			>
				{!!selectedA.path ? (
					<Link href={selectedA.path}>
						<a className="flex-grow h-full flex justify-center items-center">
							{AnnouncementContent(selectedA, true)}
						</a>
					</Link>
				) : (
					AnnouncementContent(selectedA)
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
