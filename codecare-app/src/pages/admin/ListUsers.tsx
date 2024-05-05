import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers, loadUsers} from '../../store/users-slice';
import * as adminService from '../../services/admin-service';
import AuthGuard from '../../components/Auth/AuthGuard';
import Roles from '../../models/Roles';
import {
    Modal,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField, Autocomplete
} from '@mui/material';
import {User} from "../../models/User.ts";
import {ResponseObject} from "../../models/ResponseObject.ts";
import * as doctorService from "../../services/doctor-service.ts";
import Doctor from "../../models/Doctor.ts";
import {Specialization} from "../../models/Specialization.ts";
import * as authUtil from "../../utils/auth-util.ts"

export default function ListUsers() {
    const dispatch = useDispatch();
    const users = useSelector(getUsers());
    const [editedUser, setEditedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const [searchParams, setSearchParams] = useState({});
    const [doctorDetails, setDoctorDetails] = useState({
        id: '',
        user: '',
        specialization: '',
        roomNo: '',
        hospitalName: '',
        city: ''
    });
    const [specializations, setSpecializations] = useState<Specialization[]>([]);

    useEffect(() => {
        adminService.searchUsers(searchParams).then((response: ResponseObject<User[]>) => {
            if (response.data) {
                dispatch(loadUsers(response.data));
            }
        });
        doctorService.getSpecializations({}).then((response: ResponseObject<Specialization[]>) => {
            if (response.data) {
                setSpecializations(response.data);
            }
        });
    }, [searchParams]);

    const openEditModal = (user: User) => {
        setEditedUser(user);
        setRole(user.role);
        if (user.role === Roles.DOCTOR) {
            doctorService.fetchDoctorDetails(user.id).then((response: ResponseObject<Doctor>) => {
                if (response.data) {
                    const doctor = response.data;
                    setDoctorDetails({
                        id: doctor.id,
                        user: doctor.user,
                        specialization: doctor.specialization,
                        roomNo: doctor.roomNo,
                        hospitalName: doctor.address.hospitalName,
                        city: doctor.address.city
                    });
                }
            });
        }
        setOpen(true);
    };

    const closeEditModal = () => {
        setOpen(false);
    };

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

      
    const handleRoleChange = (event) => {
        setRole(event.target.value);
        if (event.target.value !== Roles.DOCTOR) {
            setDoctorDetails({
                id: '',
                user: '',
                specialization: '',
                roomNo: '',
                hospitalName: '',
                city: ''
            });
        }
    };

    const handleChange = (event) => {
        setDoctorDetails(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleSave = async () => {
        const userUpdatePromise = adminService.updateUserRole({
            userId: editedUser.id,
            role: role
        });

        let doctorUpdatePromise: Promise<ResponseObject<Doctor>> = Promise.resolve<ResponseObject<Doctor>>({});
        if (role === Roles.DOCTOR) {
            doctorUpdatePromise = doctorService.createOrUpdateDoctor({
                user: editedUser.id,
                specialization: doctorDetails.specialization.code,
                roomNo: doctorDetails.roomNo,
                address: {
                    hospitalName: doctorDetails.hospitalName,
                    city: doctorDetails.city
                }
            });
        }

        Promise.all([userUpdatePromise, doctorUpdatePromise])
            .then(() => {
                adminService.searchUsers(searchParams).then((response: ResponseObject<User[]>) => {
                    if (response.data) {
                        dispatch(loadUsers(response.data));
                    }
                });
                closeEditModal();
            })
            .catch(error => {
                console.error('Failed to update user or doctor:', error);
            });
    };

    return (
        <AuthGuard allowedRoles={[Roles.ADMIN]}>
            <>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Username</TableCell>
                                <TableCell align="right">Firstname</TableCell>
                                <TableCell align="right">Lastname</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell align="center">{user.username}</TableCell>
                                    <TableCell align="right">{user.firstname}</TableCell>
                                    <TableCell align="right">{user.lastname}</TableCell>
                                    <TableCell align="right">{user.role}</TableCell>
                                    <TableCell align="center">
                                        {authUtil.isUserInRole(user, [Roles.ADMIN]) ?
                                            <Button variant="outlined" disabled>Edit</Button> :
                                            <Button variant="outlined"
                                                    onClick={() => openEditModal(user)}>Edit</Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>



                <Modal open={open} onClose={closeEditModal}>
                    <Box className="modal" sx={style}>
                        <Typography variant="h6" sx={{mb: 2}}>Edit User</Typography>
                        <FormControl fullWidth sx={{mb: 2}}>
                            <InputLabel>Role</InputLabel>
                            <Select value={role} label="Role" onChange={handleRoleChange}>
                                <MenuItem value={Roles.USER}>User</MenuItem>
                                <MenuItem value={Roles.DOCTOR}>Doctor</MenuItem>
                            </Select>
                        </FormControl>
                        {role === Roles.DOCTOR && (
                            <>
                                <Autocomplete
                                    fullWidth
                                    options={specializations}
                                    getOptionLabel={(option) => option.name}
                                    value={doctorDetails.specialization || ''}
                                    onChange={(event, newValue) => {
                                        setDoctorDetails(prev => ({...prev, specialization: newValue}));
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Specialization"/>}
                                />
                                <br/>
                                <TextField fullWidth label="Room No" value={doctorDetails.roomNo} name="roomNo"
                                           onChange={handleChange} sx={{mb: 2}}/>
                                <TextField fullWidth label="Hospital Name" value={doctorDetails.hospitalName}
                                           name="hospitalName" onChange={handleChange} sx={{mb: 2}}/>
                                <TextField fullWidth label="City" value={doctorDetails.city} name="city"
                                           onChange={handleChange} sx={{mb: 2}}/>
                            </>
                        )}
                        <Button variant="contained" onClick={handleSave}>Save Changes</Button>
                    </Box>
                </Modal>
            </>
        </AuthGuard>
    );
}
