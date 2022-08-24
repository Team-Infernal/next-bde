import cn from "classnames";
import { formatISO } from "date-fns";

import Event from "components/calendar/Event";

type Props = {
	day: {
		date: number;
		iso: string;
		type: string;
	};
	last: boolean;
};

const events = [
	{
		iso: "2022-08-26",
		name: "Bowling",
	},
	{
		iso: "2022-08-26",
		name: "Bowling",
	},
	{
		iso: "2022-08-26",
		name: "Bowling",
	},
	{
		iso: "2022-08-26",
		name: "Bowling",
	},
	{
		iso: "2022-09-06",
		name: "Hmmmm",
	},
];

const CalendarDay = ({ day, last }: Props) => {
	const now = new Date();
	const todayISO = formatISO(now, { representation: "date" });

	return (
		<div
			className={cn("h-48 bg-base-100 p-4 m-[1px] mb-0 flex flex-col gap-4", {
				"mr-0": !last,
			})}
		>
			<div
				className={cn("font-semibold", {
					"text-base-300": day.type !== "current",
					"text-primary": day.iso === todayISO,
				})}
			>
				{day.date}
			</div>
			<div className="overflow-y-auto flex flex-col gap-2 pr-2">
				{events
					.filter(event => event.iso === day.iso)
					.map((event, index) => (
						<Event
							key={`${event.iso}-${index}`}
							event={event}
						/>
					))}
			</div>
		</div>
	);
};

export default CalendarDay;
