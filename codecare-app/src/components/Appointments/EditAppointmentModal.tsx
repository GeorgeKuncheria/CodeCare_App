import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Appointment } from '../../models/Appointment.ts';
import * as appointmentService from './../../services/appointment-service.ts';
import { useNavigate } from 'react-router-dom';
import Status from "../../models/Status.ts";

interface EditAppointmentModalProps {
    open: boolean;
    handleClose: () => void;
    appointment: Appointment;
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({ open, handleClose, appointment }) => {
    const [diagnosis, setDiagnosis] = React.useState(appointment.diagnosis || '');
    const [prescription, setPrescription] = React.useState(appointment.prescription || '');
    const [status, setStatus] = React.useState(appointment.status || '');

    const handleStatusChange = (event: React.ChangeEvent<{ value: any }>) => {
        setStatus(event.target.value as string);
    };

    const navigate=useNavigate();

    console.log(appointment.id);
    const handleSubmit = () => {

        const updatedAppointment = {
            id: appointment.id,
            user: appointment.user.id,
            doctor: appointment.doctor.id,
            diagnosis: diagnosis,
            treatment: prescription ,
            status: Status.COMPLETE,
            dateOfTreatment: appointment.appointmentDate
        }

        appointmentService.updateAppointment(updatedAppointment).then((response: Appointment)=>{
            if(response.data) {
                navigate('/appointments');

            }
        });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Appointment</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="diagnosis"
                    label="Medical Diagnosis"
                    type="text"
                    fullWidth
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="prescription"
                    label="Prescription"
                    type="text"
                    fullWidth
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                />

                {/*<FormControl fullWidth margin="dense">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="CANCELLED">Cancelled</MenuItem>
                        <MenuItem value="COMPLETE">Complete</MenuItem>

                    </Select>
                </FormControl>*/}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAppointmentModal;