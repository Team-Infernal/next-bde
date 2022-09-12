import cn from "classnames";
import { formatISO } from "date-fns";

import Event from "components/calendar/Event";

import { EventResponse } from "types";

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
	const isToday = day.iso === formatISO(now, { representation: "date" });

	return (
		<div
			className={cn(
				"h-48 bg-base-100 p-4 flex-col gap-4",
				{
					hidden: day.type !== "current",
				},
				"lg:flex"
			)}
		>
			<div
				className={cn("font-semibold", {
					"text-base-300": day.type !== "current",
					"text-primary": isToday,
				})}
			>
				{!isToday ? (
					day.date
				) : (
					<div className="badge badge-primary badge-lg">{day.date}</div>
				)}
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
