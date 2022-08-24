import { useEffect, useState } from "react";
import CalendarDates from "calendar-dates";

import CalendarToolbar from "components/calendar/CalendarToolbar";
import CalendarDayHeader from "components/calendar/CalendarDayHeader";
import CalendarDay from "components/calendar/CalendarDay";
import CalendarRow from "components/calendar/CalendarRow";
import { getMonth, getYear } from "date-fns";

const calendarDates = new CalendarDates();

const days = [
	"Dimanche",
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
];

const Calendar = () => {
	const now = new Date();

	const [matrixes, setMatrixes] = useState<any[]>([]);
	const [currentMonth, setCurrentMonth] = useState({
		month: getMonth(now),
		year: getYear(now),
	});

	useEffect(() => {
		const getMatrixes = async () => {
			const date = new Date(currentMonth.year, currentMonth.month, 1);
			let matrixes = [];
			for (const matrix of await calendarDates.getMatrix(date)) {
				matrixes.push(matrix);
			}
			setMatrixes(matrixes);
		};
		getMatrixes();
	}, [currentMonth]);

	const handlePreviousMonthClick = () => {
		setCurrentMonth(currentMonth => {
			let { month, year } = currentMonth;
			if (month === 0) {
				month = 11;
				year--;
			} else {
				month--;
			}

			return {
				month,
				year,
			};
		});
	};

	const handleNextMonthClick = () => {
		setCurrentMonth(currentMonth => {
			let { month, year } = currentMonth;
			if (month === 11) {
				month = 0;
				year++;
			} else {
				month++;
			}

			return {
				month,
				year,
			};
		});
	};

	const handleNowClick = () => {
		setCurrentMonth({
			month: getMonth(now),
			year: getYear(now),
		});
	};

	return (
		<>
			<CalendarToolbar
				current={currentMonth}
				onPreviousClick={() => handlePreviousMonthClick()}
				onNextClick={() => handleNextMonthClick()}
				onNowClick={() => handleNowClick()}
			/>
			<div className="shadow-lg rounded-lg p-4">
				<div className="bg-base-200">
					<div className="grid grid-cols-7">
						{days.map((day, index) => (
							<CalendarDayHeader
								key={day}
								day={day}
								lastHeader={index === days.length - 1}
							/>
						))}
					</div>
					{matrixes.map((row, index) => (
						<CalendarRow
							key={`row-${index}`}
							row={row}
							last={index === matrixes.length - 1}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Calendar;
