import {useContext} from "react";
import {CalendarContext} from "../contexts/calendarContext";
import {AppointmentsContext} from '../contexts/appointmentsContext';

const Calendar = () => {
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    // const dayNames = [
    //     {value: 1, name: 'Lun'},
    //     {value: 2, name: 'Mar'},
    //     {value: 3, name: 'Mar'},
    //     {value: 4, name: 'Jeu'},
    //     {value: 5, name: 'Ven'},
    //     {value: 6, name: 'Sam'},
    //     {value: 0, name: 'Dim'},
    // ];
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const {today, currentPeriod, dispatchCurrentPeriod,
        getMonthCalendar, getPreviousMonth, getNextMonth} = useContext(CalendarContext);
    const {appointments, setAppointmentsSelectionDate} = useContext(AppointmentsContext);

    const calendar = {
        previous: getMonthCalendar(getPreviousMonth(), getPreviousMonth() === 11 ? currentPeriod.year-1 : currentPeriod.year),
        current: getMonthCalendar(currentPeriod.month, currentPeriod.year),
        next: getMonthCalendar(getNextMonth(), getNextMonth() === 0 ? currentPeriod.year+1 : currentPeriod.year),
    };

    const firstDayWeekOfPreviousMonth = calendar.previous
        .findLastIndex(day => day.date.getDay() === 1)
    const lastDayWeekOfNextMonth = calendar.current[calendar.current.length -1].date.getDay() !== 0 ?
        //si le dernier jour de la semaine est sur le mois suivant on cherche sa position
        calendar.next.findIndex(day => day.date.getDay() === 0)
        //sinon on retourne -1 pour avoir la valeur de fin du slice après à 0
        : -1
    const calendarToDisplay = calendar.previous
        .slice(firstDayWeekOfPreviousMonth)
        .concat(calendar.current)
        .concat(calendar.next.slice(0, lastDayWeekOfNextMonth+1))

    const nbWeek = [];
    for (let i = 1; i < calendarToDisplay.length/7 + 1; i++) {
        nbWeek.push(i)
    }

    return (
        <div className="Calendar">
            <div>
                <button onClick={() => {
                    dispatchCurrentPeriod('reset')
                    setAppointmentsSelectionDate(today.toLocaleDateString())
                }}>Revenir à aujourd'hui</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">
                            <a href="#" onClick={() => dispatchCurrentPeriod('previous-month')}>
                                <i className="bi bi-caret-left-fill"></i>
                            </a>
                        </th>
                        <th colSpan="3">
                            <span>{monthNames[currentPeriod.month]}</span>
                        </th>
                        <th colSpan="2">
                            <a href="#" onClick={() => dispatchCurrentPeriod('next-month')}>
                                <i className="bi bi-caret-right-fill"></i>
                            </a>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan="2">
                            <a href="#" onClick={() => dispatchCurrentPeriod('previous-year')}>
                                <i className="bi bi-caret-left-fill"></i>
                            </a>
                        </th>
                        <th colSpan="3">
                            <span>{currentPeriod.year}</span>
                        </th>
                        <th colSpan="2">
                            <a href="#" onClick={() => dispatchCurrentPeriod('next-year')}>
                                <i className="bi bi-caret-right-fill"></i>
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            dayNames.map((dayName, index) => {
                                return (
                                    <td key={index} className="day-name">{dayName}</td>
                                )
                            })
                        }
                    </tr>
                    {
                        nbWeek.map((week) => {
                            return (
                                <tr key={week}>
                                    {
                                        calendarToDisplay.slice((week-1)*7, week*7).map((day) => {
                                            let className = '';
                                            className += currentPeriod.month === day.date.getMonth() ? 'current-month ': '';
                                            className += day.date.toLocaleDateString() === today.toLocaleDateString() ? 'current-day ' : '';
                                            appointments.forEach(appointement => className += appointement.date === day.date.toLocaleDateString() && !className.includes('appointment-day') ? 'appointment-day' : '')

                                            return (
                                                <td key={day.id}
                                                    onClick={() => setAppointmentsSelectionDate(day.date.toLocaleDateString())}
                                                    className={className}
                                                >
                                                    {day.date.getDate()}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;