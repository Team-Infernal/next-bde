import { useState } from "react";

import InputRow from "components/table/InputRow";

const options = [
	{
		value: "info",
		displayValue: "Informatif",
	},
	{
		value: "important",
		displayValue: "Important",
	},
];

const AddAnnouncement = () => {
	const [hasLink, setHasLink] = useState(false);

	const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		setHasLink(checked);
	};

	return (
		<div className="col-span-2 flex flex-col shadow-lg rounded-lg animate-fade-in-up">
			<div className="px-4 py-5 sm:px-6">
				<h3 className="text-lg font-semibold leading-6">Nouvelle annonce</h3>
			</div>
			<div className="border-t border-gray-200">
				<dl>
					<InputRow
						title="Contenu"
						type="text"
						required
					/>
					<InputRow
						title="Type"
						type="select"
						required
						options={options}
					/>
					<InputRow
						title="Date"
						type="datetime"
						required
					/>
					<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 my-auto">Lien</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex items-center gap-4">
							<input
								className="toggle toggle-primary"
								type="checkbox"
								onChange={event => handleLinkChange(event)}
							/>
							<input
								className="input input-primary w-full"
								type="text"
								disabled={!hasLink}
							/>
						</dd>
					</div>
					<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 my-auto required">
							Date de début d&apos;affichage
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex gap-4">
							<input
								className="input input-primary w-0 flex-grow"
								type="date"
							/>
							<input
								className="input input-primary w-0 flex-grow"
								type="time"
							/>
						</dd>
					</div>
					<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 my-auto required">
							Date de fin d&apos;affichage
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex gap-4">
							<input
								className="input input-primary w-0 flex-grow"
								type="date"
							/>
							<input
								className="input input-primary w-0 flex-grow"
								type="time"
							/>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default AddAnnouncement;
