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
		<div className="flex gap-8 shadow-lg rounded-lg mb-8 p-8">
			<div className="btn-group">
				<button
					className={cn("btn", {
						"btn-disabled": loading,
					})}
					onClick={() => onPreviousClick()}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				<button className="btn btn-disabled text-base-content w-48">
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
			<div>
				<button
					className={cn("btn", {
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
