import cn from "classnames";
import { formatISO } from "date-fns";

import Event from "components/calendar/Event";

type Props = {
	day: {
		date: number;
		iso: string;
		type: string;
	};
	events: EventResponse[];
};

const CalendarDay = ({ day, events }: Props) => {
	const now = new Date();
	const todayISO = formatISO(now, { representation: "date" });

	return (
		<div
			className={cn("h-48 bg-base-100 p-4 m-[1px] mb-0 flex flex-col gap-4")}
		>
			<div
				className={cn("font-semibold", {
					"text-base-300": day.type !== "current",
					"text-primary": day.iso === todayISO,
				})}
			>
				{day.date}
			</div>
			<div className="overflow-y-auto flex flex-col gap-2">
				{events.map((event, index) => (
					<Event
						key={`${event.yearMonth}-${index}`}
						event={event}
						modalId={`${event.yearMonth}-${index}`}
					/>
				))}
			</div>
		</div>
	);
};

export default CalendarDay;
