import { useAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";

import AnnouncementList from "components/account/admin/panels/announcements/AnnouncementList";
import AnnouncementDetails from "components/account/admin/panels/announcements/AnnouncementDetails";
import AddAnnouncement from "components/account/admin/panels/announcements/AddAnnouncement";

import { Announcement } from "types";
import { Timestamp } from "firebase/firestore";

const fakeAnnouncements: Announcement[] = [
	{
		id: "1234",
		content: "Random Content",
		type: "info",
		path: null,
		startDateTime: Timestamp.fromDate(new Date()),
		endDateTime: Timestamp.fromDate(new Date()),
	},
	{
		id: "5678",
		content: "Lorem ipsum dolor sit amet",
		type: "important",
		path: "/boutique",
		startDateTime: Timestamp.fromDate(new Date()),
		endDateTime: Timestamp.fromDate(new Date()),
	},
];

const AnnouncementManagement = () => {
	const AuthUser = useAuthUser();

	const [announcements, setAnnouncements] = useState<Announcement[]>([]);
	const [selectedAnnouncementIndex, setSelectedAnnouncementIndex] = useState<
		number | null
	>(null);
	const [addAnnouncement, setAddAnnouncements] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let isCancelled = false;
		setLoading(true);
		setSelectedAnnouncementIndex(null);

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/announcements?all=1", {
					method: "GET",
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(data => {
				if (data.success && !isCancelled) {
					setLoading(false);
					setAnnouncements(data.announcements);
					isCancelled = true;

					if (announcements.length === 0) {
						//! Remove
						setAnnouncements(fakeAnnouncements);
					}
				}
			})
			.catch(err => {
				console.warn(err);
			});

		return () => {
			isCancelled = true;
		};
	}, [AuthUser]);

	const handleAddAnnouncementClick = (add = true) => {
		setAddAnnouncements(add);
	};

	const handleUpdateAnnouncementClick = (id: string) => {
		setAddAnnouncements(false);
		if (!id) {
			return;
		}
	};

	const handleDeleteAnnouncementClick = (id: string) => {
		setAddAnnouncements(false);
		if (!id) {
			return;
		}

		AuthUser.getIdToken()
			.then(token =>
				fetch(`/api/announcements/${id}`, {
					method: "DELETE",
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setSelectedAnnouncementIndex(null);
					setAnnouncements(announcements =>
						announcements.filter(announcement => announcement.id !== id)
					);
				}
			})
			.catch(err => {
				console.warn(err);
			});
	};

	return (
		<section className="mt-8 flex-grow grid grid-cols-3 gap-12">
			<AnnouncementList
				announcements={announcements}
				loading={loading}
				selectedAnnouncementIndex={selectedAnnouncementIndex}
				setSelectedAnnouncementIndex={setSelectedAnnouncementIndex}
				addAnnouncement={handleAddAnnouncementClick}
				updateAnnouncement={handleUpdateAnnouncementClick}
				deleteAnnouncement={handleDeleteAnnouncementClick}
			/>
			{addAnnouncement ? (
				<AddAnnouncement />
			) : (
				selectedAnnouncementIndex !== null && (
					<AnnouncementDetails
						announcement={announcements[selectedAnnouncementIndex]}
					/>
				)
			)}
		</section>
	);
};

export default AnnouncementManagement;
