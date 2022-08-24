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
}: Props) => {
	return (
		<div className="flex gap-8 shadow-lg rounded-lg mb-8 p-8">
			<div className="btn-group">
				<button
					className="btn"
					onClick={() => onPreviousClick()}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				<button className="btn btn-disabled text-base-content w-48">
					{months[current.month]} {current.year}
				</button>
				<button
					className="btn"
					onClick={() => onNextClick()}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
			</div>
			<div>
				<button
					className="btn"
					onClick={() => onNowClick()}
				>
					Aujourd'hui
				</button>
			</div>
		</div>
	);
};

export default CalendarToolbar;
