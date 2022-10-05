import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faPenToSquare,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

import AnnouncementListItem from "components/account/admin/panels/announcements/AnnouncementListItem";
import Loader from "components/misc/Loader";

import { Announcement } from "types";

type Props = {
	announcements: Announcement[];
	loading: boolean;
	selectedAnnouncementIndex: number | null;
	setSelectedAnnouncementIndex: React.Dispatch<
		React.SetStateAction<number | null>
	>;
	addAnnouncement: (add?: boolean) => void;
	updateAnnouncement: (id: string) => void;
	deleteAnnouncement: (id: string) => void;
};

const AnnouncementList = ({
	announcements,
	loading,
	selectedAnnouncementIndex,
	setSelectedAnnouncementIndex,
	addAnnouncement,
	updateAnnouncement,
	deleteAnnouncement,
}: Props) => {
	return (
		<>
			<div
				className={cn("flex-grow flex flex-col shadow-lg rounded-lg pt-8", {
					"justify-between": !loading,
					"justify-center": loading,
					"items-center": loading,
				})}
			>
				{loading ? (
					<Loader scale={2} />
				) : (
					<>
						<ul className="flex flex-col w-full">
							{announcements.map((announcement, index) => (
								<AnnouncementListItem
									key={announcement.id}
									index={index}
									announcement={announcement}
									selectedAnnouncementIndex={selectedAnnouncementIndex}
									setSelectedAnnouncementIndex={setSelectedAnnouncementIndex}
								/>
							))}
						</ul>
						<div className="flex gap-4 p-4">
							<button
								className="flex-grow group hover:flex-grow-[2] transition-all w-0 btn btn-ghost gap-2 flex-nowrap"
								onClick={() => addAnnouncement()}
							>
								<FontAwesomeIcon
									icon={faPlus}
									className="text-primary group-hover:text-success"
								/>
								<span className="hidden group-hover:block">Créer</span>
							</button>
							<button
								className={cn(
									"flex-grow group hover:flex-grow-[2] transition-all w-0 btn gap-2 flex-nowrap",
									{
										"btn-ghost": selectedAnnouncementIndex !== null,
										"btn-disabled": selectedAnnouncementIndex === null,
									}
								)}
								onClick={() =>
									updateAnnouncement(
										selectedAnnouncementIndex !== null
											? announcements[selectedAnnouncementIndex].id
											: ""
									)
								}
							>
								<FontAwesomeIcon
									icon={faPenToSquare}
									className={cn("group-hover:text-warning", {
										"text-primary": selectedAnnouncementIndex !== null,
									})}
								/>
								<span className="hidden group-hover:block">Modifier</span>
							</button>
							<label
								className={cn(
									"flex-grow group hover:flex-grow-[2] transition-all w-0 btn modal-button gap-2 flex-nowrap",
									{
										"btn-ghost": selectedAnnouncementIndex !== null,
										"btn-disabled": selectedAnnouncementIndex === null,
									}
								)}
								htmlFor="confirmDeletionModal"
							>
								<FontAwesomeIcon
									icon={faTrash}
									className={cn("group-hover:text-error", {
										"text-primary": selectedAnnouncementIndex !== null,
									})}
								/>
								<span className="hidden group-hover:block">Supprimer</span>
							</label>
						</div>
					</>
				)}
			</div>
			<input
				type="checkbox"
				id="confirmDeletionModal"
				className="modal-toggle"
			/>
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-semibold text-lg">
						Suppression de l&apos;annonce
					</h3>
					{selectedAnnouncementIndex !== null && (
						<h5>
							ID:{" "}
							<span className="italic">
								{announcements[selectedAnnouncementIndex].id}
							</span>
						</h5>
					)}
					<p className="py-4">
						Souhaitez-vous vraiment supprimer cette annonce?
					</p>
					<div className="modal-action">
						<label
							htmlFor="confirmDeletionModal"
							className="btn btn-ghost"
						>
							Annuler
						</label>
						<label
							htmlFor="confirmDeletionModal"
							className="btn btn-error gap-2"
							onClick={() =>
								deleteAnnouncement(
									selectedAnnouncementIndex !== null
										? announcements[selectedAnnouncementIndex].id
										: ""
								)
							}
						>
							<FontAwesomeIcon icon={faTrash} />
							<span>Confirmer</span>
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default AnnouncementList;
