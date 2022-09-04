import EventModal from "components/calendar/EventModal";
import React from "react";

type Props = {
	event: EventResponse;
	modalId: string;
};

const Event = ({ event, modalId }: Props) => {
	return (
		<>
			<label
				htmlFor={modalId}
				className="btn btn-primary modal-button"
				onClick={event => event.stopPropagation()}
			>
				{event.name}
			</label>
			<EventModal
				event={event}
				id={modalId}
			/>
		</>
	);
};

export default Event;
