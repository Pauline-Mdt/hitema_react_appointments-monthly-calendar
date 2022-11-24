import {createContext, useContext, useEffect, useReducer, useState} from 'react';
import {CalendarContext} from './calendarContext';

export const AppointmentsContext = createContext();

const appointmentsReducer = (state, action) => {
    switch (action.type) {
        case 'get':
            return [...JSON.parse(localStorage.getItem("appointments"))];

        case 'add':
            const stateAfterAdd = [...state, action.data];
            localStorage.setItem("appointments", JSON.stringify(stateAfterAdd));
            return stateAfterAdd;

        case 'remove':
            const stateAfterRemove = state.filter((element) => element !== action.data);
            localStorage.setItem("appointments", JSON.stringify(stateAfterRemove));
            return stateAfterRemove;

        default:
            return state;
    }
}

export const AppointmentsContextProvider = (props) => {
    const {today} = useContext(CalendarContext);
    const [appointments, dispatchAppointments] = useReducer(appointmentsReducer, []);
    const [appointmentsSelectionDate, setAppointmentsSelectionDate] = useState(today.toLocaleDateString())

    useEffect(() => {
        if (localStorage.getItem("appointments")) {
            dispatchAppointments({type: 'get'})
        }
    }, [])

    return <AppointmentsContext.Provider value={{
        appointments,
        dispatchAppointments,
        appointmentsSelectionDate,
        setAppointmentsSelectionDate,
    }}>
        {props.children}
    </AppointmentsContext.Provider>
}