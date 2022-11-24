import {useContext} from "react";
import {AppointmentsContext} from "../contexts/appointmentsContext";

const AppointmentsList = () => {
    const {appointments, dispatchAppointments, appointmentsSelectionDate} = useContext(AppointmentsContext);

    return (
        <div className="AppointmentList">
            <h2>Liste des rdv du {appointmentsSelectionDate}</h2>
            <small>CLiquez sur une date pour voir la listes des rdv.</small>
            {
                appointments.filter(appointment => appointment.date === appointmentsSelectionDate).length !== 0 ?
                    <ul>
                        {
                            appointments
                                .filter(appointment => appointment.date === appointmentsSelectionDate)
                                .map((appointment, index) =>
                                    <li key={index}>
                                        <div>
                                            <p>RDV : {appointment.title}</p>
                                            {
                                                appointment.comment &&
                                                <p>Commentaire : {appointment.comment}</p>
                                            }

                                        </div>
                                        <p><i className="bi bi-trash-fill" onClick={() => dispatchAppointments({
                                            type: 'remove',
                                            data: appointment
                                        })}></i></p>
                                    </li>
                                )
                        }
                    </ul>
                    : <p>Il n'y a pas de rdv pour cette date.</p>
            }
        </div>

    );
}

export default AppointmentsList;