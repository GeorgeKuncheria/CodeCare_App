import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Appointment from './../../models/Appointment.ts';
import CreateAppointmentModal from './../../components/Appointments/CreateAppointmentModal';
import MyButton from '../../utils/MyButton.tsx';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {getAll, loadAppointments} from "../../store/appointment-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import * as appointmentService from '../../services/appointment-service.ts'
import {ResponseObject} from "../../models/ResponseObject.ts";
import {AppDispatch} from "../../store";
import {searchAppointments} from "../../services/appointment-service.ts";

import * as authUtil from "../../utils/auth-util.ts";
import Roles from "../../models/Roles.ts";
import { getUser } from '../../store/loginUser-slice.ts';
import EditAppointmentModal from "../../components/Appointments/EditAppointmentModal.tsx"


const BasicTable = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const appointments = useSelector(getAll());
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(getUser());

    useEffect(() => {
        appointmentService.searchAppointments({}).then((response: ResponseObject<Appointment[]>) => {
            if (response.data) {
                dispatch(loadAppointments(response.data));
            }
        })
    }, [])


    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null);


    const handleEditOpen = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setOpenEditModal(true);
    };

    const handleEditClose = () => {
        setOpenEditModal(false);
        setSelectedAppointment(null);
    };



    const rowData = appointments.map((row) => (
        <TableRow
            key={row.id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {authUtil.isUserInRole(user, [Roles.DOCTOR]) ?
                (
                    <TableCell align="right">{row.user.firstname} {row.user.lastname}</TableCell>
                )
                : (<></>) }

            {authUtil.isUserInRole(user, [Roles.USER]) ?(
                    <TableCell align="right">Dr. {row.doctor.firstname} {row.doctor.lastname}</TableCell>):
                (<></>)}

            {authUtil.isUserInRole(user, [Roles.USER]) ?
                (
                    <TableCell align="right">{row.doctor.specialization}</TableCell>):(<></>)}
            <TableCell
                align="right">{row.doctor.roomNo} {row.doctor.address.hospitalName} {row.doctor.address.city}</TableCell>
            <TableCell
                align="right">{row.appointmentDate} at {row.appointmentStartTime} to {row.appointmentEndTime}</TableCell>
            <TableCell align="right">{row.issue[0]}</TableCell>
            <TableCell align="right">
                {authUtil.isUserInRole(user, [Roles.DOCTOR]) ? (
                    <IconButton color="primary" onClick={() => handleEditOpen(row)}>
                        <EditIcon />
                    </IconButton>
                ) : (
                    <IconButton color="primary">
                        <VisibilityIcon />
                    </IconButton>
                )}
            </TableCell>



        </TableRow>

    ));


    return (
        <div>
            {authUtil.isUserInRole(user, [Roles.USER]) ? (
                <div>
                    <MyButton label="Create Appointment +" onClick={handleOpen}/>
                    <CreateAppointmentModal open={open} handleClose={handleClose}/>
                </div>
            ):(<></>)}
            <br/>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 800}} aria-label="simple table">
                    <TableHead>

                        <TableRow>
                            {authUtil.isUserInRole(user, [Roles.DOCTOR]) ?
                                (
                                    <TableCell align="right">Patient Name</TableCell>):(<></>)}

                            {authUtil.isUserInRole(user, [Roles.USER]) ?
                                (
                                    <TableCell align="right">Doctor's Name</TableCell>)
                                :
                                (<></>)
                            }

                            {authUtil.isUserInRole(user, [Roles.USER]) ?
                                (
                                    <TableCell align="right">Specialization</TableCell>):
                                (<></>)
                            }
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Appointment Date & time</TableCell>
                            <TableCell align="right">Issue</TableCell>

                            <TableCell align="right">
                                {authUtil.isUserInRole(user, [Roles.DOCTOR]) ?
                                    (<>EDIT</>):(

                                        (<>VIEW</>)
                                    )}

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <EditAppointmentModal open={openEditModal} handleClose={handleEditClose} appointment={selectedAppointment || {} as Appointment} />
            </div>
        </div>
    );
}

export default BasicTable;