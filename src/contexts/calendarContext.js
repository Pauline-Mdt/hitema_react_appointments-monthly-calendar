import {createContext, useReducer} from 'react';

export const CalendarContext = createContext();

const today = new Date();

const dateReducer = (state, action) => {
    switch (action) {
        case 'previous-month':
            return {...state, month: state.month === 0 ? 11 : state.month - 1};

        case 'next-month':
            return {...state, month: state.month === 11 ? 0 : state.month + 1};

        case 'previous-year':
            return {...state, year: state.year - 1};

        case 'next-year':
            return {...state, year: state.year + 1};

        case 'reset':
            return {
                month: today.getMonth(),
                year: today.getFullYear(),
            };

        default:
            return state;
    }
}

export const CalendarContextProvider = (props) => {
    const [currentPeriod, dispatchCurrentPeriod] = useReducer(dateReducer, {
        month: today.getMonth(),
        year: today.getFullYear(),
    });

    const getMonthCalendar = (month, year) => {
        let monthCalendar = [], i = 1, dateToAdd = new Date(year, month, i);
        while (dateToAdd.getMonth() === month) {
            monthCalendar.push({
                id: month+'-'+i,
                date: dateToAdd,
            })
            i++;
            dateToAdd = new Date(year, month, i);
        }
        return monthCalendar;
    }

    const getPreviousMonth = () => {
        return currentPeriod.month === 0 ? 11 : currentPeriod.month - 1;
    }

    const getNextMonth = () => {
        return currentPeriod.month === 11 ? 0 : currentPeriod.month + 1;
    }

    return <CalendarContext.Provider value={{
        today,
        currentPeriod,
        dispatchCurrentPeriod,
        getMonthCalendar,
        getPreviousMonth,
        getNextMonth
    }}>
        {props.children}
    </CalendarContext.Provider>
}