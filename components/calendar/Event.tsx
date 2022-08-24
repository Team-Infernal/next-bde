import EventModal from "components/calendar/EventModal";

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
