import CalendarDates from "calendar-dates";
import { getMonth, getYear, fromUnixTime, formatISO } from "date-fns";
import { useEffect, useState } from "react";

import CalendarToolbar from "components/calendar/CalendarToolbar";
import CalendarDayHeader from "components/calendar/CalendarDayHeader";
import CalendarDay from "components/calendar/CalendarDay";

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

	const [dates, setDates] = useState<any[]>([]);
	const [currentMonth, setCurrentMonth] = useState({
		month: getMonth(now),
		year: getYear(now),
	});
	const [events, setEvents] = useState<EventResponse[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getDates = async () => {
			const date = new Date(currentMonth.year, currentMonth.month, 1);
			const dates = await calendarDates.getDates(date);
			setDates(dates);
		};
		getDates();

		const getEvents = async () => {
			setLoading(true);
			fetch(
				`/api/events/temp?year=${currentMonth.year}&month=${
					currentMonth.month + 1
				}`
			)
				.then(response => response.json())
				.then(data => {
					setEvents(data.data);
					setLoading(false);
				});
		};
		getEvents();
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

	const getDayEvents = (searchDate: string) => {
		const filteredEvents = events.filter(event => {
			const date = fromUnixTime(event.timestamp);
			const dateISO = formatISO(date, { representation: "date" });
			return dateISO === searchDate;
		});
		return filteredEvents;
	};

	return (
		<>
			<CalendarToolbar
				current={currentMonth}
				onPreviousClick={() => handlePreviousMonthClick()}
				onNextClick={() => handleNextMonthClick()}
				onNowClick={() => handleNowClick()}
				loading={loading}
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
					<div className="grid grid-cols-7">
						{dates.map((date, index) => (
							<CalendarDay
								key={`day-${index}`}
								day={date}
								events={getDayEvents(`${date.iso}`)}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Calendar;
