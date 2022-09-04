import cn from "classnames";

type Props = {
	day: string;
	lastHeader: boolean;
};

const CalendarDayHeader = ({ day, lastHeader }: Props) => {
	return (
		<div
			className={cn("flex justify-center font-semibold bg-base-100 p-2", {
				"mr-0": !lastHeader,
			})}
		>
			<span>{day}</span>
		</div>
	);
};

export default CalendarDayHeader;
