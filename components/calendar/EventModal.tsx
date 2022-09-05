import { getDay, getMonth, fromUnixTime, getDate } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { EventResponse } from "types";

type Props = {
	event: EventResponse;
	id: string;
};

const days = [
	"Dimanche",
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
];

const months = [
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre",
];

const EventModal = ({ event, id }: Props) => {
	const getFormattedDate = (timestamp: number) => {
		const date = fromUnixTime(timestamp);
		return `${days[getDay(date)]} ${getDate(date)} ${months[getMonth(date)]}`;
	};

	return (
		<>
			<input
				type="checkbox"
				className="modal-toggle"
				id={id}
			/>
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box relative">
					<label
						htmlFor={id}
						className="btn btn-circle absolute top-2 right-2"
					>
						<FontAwesomeIcon
							icon={faXmark}
							className="text-xl"
						/>
					</label>
					<div className="flex flex-col gap-2">
						<h3 className="font-semibold text-xl">{event.name}</h3>
						<p>Date: {getFormattedDate(event.timestamp)}</p>
						<p>Organisé par {event.organiser}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default EventModal;
