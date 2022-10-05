import { app } from "config";

import { Announcement } from "types";

import { capitalizeFirst } from "utils";
import { displayDate } from "utils/dates";

type Props = {
	announcement: Announcement;
};

const AnnouncementDetails = ({ announcement }: Props) => {
	const isLocalPath = announcement.path?.startsWith("/") || false;
	const newPath = isLocalPath
		? `${app.siteUrl}${announcement.path}`
		: announcement.path;

	return (
		<div className="col-span-2 flex flex-col shadow-lg rounded-lg">
			<div className="px-4 py-5 sm:px-6">
				<h3 className="text-lg font-semibold leading-6">Détails</h3>
				<p className="mt-1 max-w-2xl text-sm text-gray-500">
					ID: {announcement.id}
				</p>
			</div>
			<div className="border-t border-gray-200">
				<dl>
					<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Contenu</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{announcement.content}
						</dd>
					</div>
					<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Type</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{capitalizeFirst(announcement.type)}
						</dd>
					</div>
					<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Lien</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{newPath ?? <span className="italic">Pas de lien</span>}
						</dd>
					</div>
					<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Date de début d&apos;affichage
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{displayDate(new Date(announcement.startDateTime.seconds * 1000))}
						</dd>
					</div>
					<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Date de fin d&apos;affichage
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							{displayDate(new Date(announcement.endDateTime.seconds * 1000))}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default AnnouncementDetails;
