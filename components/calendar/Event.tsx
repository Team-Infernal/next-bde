type Props = {
	event: {
		iso: string;
		name: string;
	};
};

const Event = ({ event }: Props) => {
	return <button className="btn btn-primary">{event.name}</button>;
};

export default Event;
