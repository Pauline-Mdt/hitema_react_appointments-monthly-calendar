import './App.scss';
import Calendar from "./components/Calendar";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentsList from "./components/AppointmentsList";

function App() {
    return (
        <div className="App">
            <h1>Appointments monthly calendar</h1>
            <Calendar />
            <div className="Appointments">
                <AppointmentForm />
                <AppointmentsList />
            </div>
        </div>
    );
}

export default App;
