import Title from "components/misc/Title";
import Calendar from "components/calendar/Calendar";

const Events = () => {
	return (
		<>
			<Title text="Événements" />
			<div className="p-2 lg:p-8">
				<Calendar />
			</div>
		</>
	);
};

export default Events;
