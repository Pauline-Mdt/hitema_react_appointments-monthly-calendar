import {useContext, useState} from "react";
import {AppointmentsContext} from "../contexts/appointmentsContext";
import {CalendarContext} from '../contexts/calendarContext';

const AppointmentForm = () => {
    const {today} = useContext(CalendarContext)
    const {dispatchAppointments} = useContext(AppointmentsContext);
    const [appointment, setAppointment] = useState({
        title: '',
        date: '',
        comment: '',
    });

    return (
        <div className="AppointmentForm">
            <h2>Prendre un rendez-vous</h2>
            <form onSubmit={event => event.preventDefault()}>
                <p>
                    <label>
                        Titre* :
                        <input type="text" value={appointment.title} onChange={event => setAppointment({...appointment, title: event.target.value})} required={true} />
                    </label>
                </p>
                <p>
                    <label>
                        Date* :
                        <input type="date" onChange={event => {
                            new Date(event.target.value) > today ?
                                setAppointment({...appointment, date: new Date(event.target.value).toLocaleDateString()})
                                : alert('Vous ne pouvez pas prendre de rendez-vous avant la date du jour')
                        }} required={true} />
                    </label>
                </p>
                <p>
                    <label>
                        Commentaire :
                        <textarea value={appointment.comment} onChange={event => setAppointment({...appointment, comment: event.target.value})}/>
                    </label>
                </p>
                <button type="submit" onClick={(event) => {
                    event.preventDefault()

                    console.log('appointment send', appointment)
                    dispatchAppointments({
                        type: 'add',
                        data: appointment
                    })
                }}>
                    Enregistrer
                </button>
            </form>
        </div>
    );
}

export default AppointmentForm;