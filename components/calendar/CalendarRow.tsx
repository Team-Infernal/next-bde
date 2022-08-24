import cn from "classnames";

import CalendarDay from "components/calendar/CalendarDay";

type Props = {
	row: {
		date: number;
		iso: string;
		type: string;
	}[];
	last: boolean;
};

const CalendarRow = ({ row, last }: Props) => {
	return (
		<div
			className={cn("grid grid-cols-7", {
				"pb-[1px]": last,
			})}
		>
			{row.map((day, index) => (
				<CalendarDay
					key={day.iso}
					day={day}
					last={index === row.length - 1}
				/>
			))}
		</div>
	);
};

export default CalendarRow;
