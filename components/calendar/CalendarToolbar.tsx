import cn from "classnames";
import { getMonth, getYear } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
	current: {
		month: number;
		year: number;
	};
	onPreviousClick: () => void;
	onNextClick: () => void;
	onNowClick: () => void;
	loading: boolean;
};

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

const CalendarToolbar = ({
	current,
	onPreviousClick,
	onNextClick,
	onNowClick,
	loading,
}: Props) => {
	const now = new Date();

	return (
		<div className="flex flex-col lg:flex-row gap-2 lg:gap-8 shadow-lg rounded-lg mb-2 lg:mb-8 p-4 lg:p-8">
			<div className="btn-group flex-nowrap">
				<button
					className={cn("btn", {
						"btn-disabled": loading,
					})}
					onClick={() => onPreviousClick()}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				<button className="btn btn-disabled text-base-content flex-grow">
					{months[current.month]} {current.year}
				</button>
				<button
					className={cn("btn", {
						"btn-disabled": loading,
					})}
					onClick={() => onNextClick()}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
			</div>
			<div className="flex">
				<button
					className={cn("btn flex-grow", {
						"btn-primary":
							current.month === getMonth(now) && current.year === getYear(now),
					})}
					onClick={() => onNowClick()}
				>
					Aujourd&apos;hui
				</button>
			</div>
		</div>
	);
};

export default CalendarToolbar;
