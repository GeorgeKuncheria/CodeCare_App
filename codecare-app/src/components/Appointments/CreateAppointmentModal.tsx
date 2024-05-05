import React, {ReactElement, useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

import Doctor from './../../models/Doctor';
import MyButton from '../../utils/MyButton';
import dayjs from 'dayjs';
import {Autocomplete, TextareaAutosize} from "@mui/material";
import {Specialization} from "../../models/Specialization.ts";
import * as doctorService from '../../services/doctor-service.ts'
import {ResponseObject} from "../../models/ResponseObject.ts";
import * as appointmentService from "../../services/appointment-service.ts";
import Appointment from "../../models/Appointment.ts";
import {useNavigate} from "react-router-dom";
import {loadAppointments} from "../../store/appointment-slice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface CreateAppointmentModalProps {
    open: boolean;
    handleClose: () => void;
}

export function CreateAppointmentModal(props: CreateAppointmentModalProps): ReactElement {
    const {open, handleClose} = props;
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [issue, setIssue] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [specializations, setSpecializations] = useState<Specialization[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        doctorService.search({}).then((response: ResponseObject<Doctor[]>) => {
            if (response.data) {
                setDoctors(response.data);
                setFilteredDoctors(response.data);
            }
        });
        doctorService.getSpecializations({}).then((response: ResponseObject<Specialization[]>) => {
            if (response.data) {
                setSpecializations(response.data);
            }
        });
    }, []);

    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);


    const [newAppointmentData, setNewAppointmentData] = useState({
        doctorId: '',
        appointmentDate: '',
        appointmentStartTime: '',
        appointmentEndTime: '',
        issue: '',
    });

    const formatTime = (date: Date | null): string => {
        if (!date) return '';
        return dayjs(date).format('HH:mm');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formattedDate = formatDate(selectedDate);
        const formattedTime = formatTime(selectedDate);
        const newAppointment = {
            doctor: newAppointmentData.doctorId,
            appointmentDate: formattedDate,
            appointmentStartTime: formattedTime,
            issue: issue
        }
        appointmentService.createAppointment(newAppointment).then((response: ResponseObject<Appointment>) => {
            if (response.data) {
                appointmentService.searchAppointments({}).then((response: ResponseObject<Appointment[]>) => {
                    if (response.data) {
                        dispatch(loadAppointments(response.data));
                    }
                })
                handleClose();
            }
        });

    };

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        return dayjs(date).format('MM/DD/YYYY');
    };

    const handleIssueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIssue(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        let filteredDoctors: Doctor[] = [];
        doctors.forEach((doctor) => {
            let doctorSpecializationDesc: string = '';
            specializations.forEach(specialization => {
                if (specialization.code === doctor.specialization) {
                    doctorSpecializationDesc = specialization.description;
                    return;
                }
            });
            if (doctor.specialization.toLowerCase().includes(event.target.value.toLowerCase()) ||
                doctorSpecializationDesc.toLowerCase().includes(event.target.value.toLowerCase())) {
                filteredDoctors.push(doctor);
            }
        })
        setFilteredDoctors(filteredDoctors);
    };

    const handleDoctorChange = (event: React.SyntheticEvent<Element, Event>, value: Doctor | null) => {
        if (value) {
            setNewAppointmentData(prevState => ({
                ...prevState,
                doctorId: value.user
            }));
        }
    };

    const handleDateChange = (newDate: Date | null) => {
        setSelectedDate(newDate);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Create Appointment
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextareaAutosize
                                aria-label="issue"
                                placeholder="Enter your issue"
                                value={issue}
                                onChange={handleIssueChange}
                                minRows={3}
                            />
                            <TextField
                                label="Search Doctor"
                                placeholder="Search by specialization or description"
                                fullWidth
                                value={description}
                                onChange={handleDescriptionChange}
                                sx={{mb: 2}}
                            />
                            <Autocomplete
                                fullWidth
                                options={filteredDoctors}
                                getOptionLabel={(option) => `${option.firstname} ${option.lastname} - ${option.specialization}, ${option.address.hospitalName}, ${option.address.city}`}
                                onChange={handleDoctorChange}
                                renderInput={(params) => <TextField {...params} label="Select Doctor"/>}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                            <Typography> ${filteredDoctors.length}</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    name="date"
                                    label="Appointment Date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    sx={{mt: 2, mb: 2}}
                                    disablePast
                                />
                            </LocalizationProvider>
                            <MyButton
                                label="CREATE"
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{mt: 2}}
                            />
                        </div>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
}

export default CreateAppointmentModal;
