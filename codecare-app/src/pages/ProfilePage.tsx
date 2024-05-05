import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid } from '@mui/material';
import ProfileForm from '../components/ProfileForm';
import NotesPage from './NotePage';
import EditIcon from '@mui/icons-material/Edit';
import {useSelector} from "react-redux";
import {getUser} from "../store/loginUser-slice";
import {AppState} from "../store";

const ProfilePage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector(getUser());

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    /*const [profile, setProfile] = useState({
        age: 0,
        gender: '',
        vaccinations: [
            { id: '', name: '', date: '' }
        ]
    });*/
    const profile = useSelector((state: AppState) => state.profile);

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 4, display: 'flex', flexDirection: 'row' }}>
            <Grid container spacing={2} alignItems="flex-start"> {/* Adjusted for vertical alignment */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" gutterBottom sx = {{ mt: 3}}>
                        <strong>Profile</strong>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>Name:</strong> {user.firstname} {user.lastname}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>Age:</strong> {profile.age}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>Gender:</strong> {profile.gender}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom>
                        <strong>Vaccinations:</strong>
                    </Typography>
                    {profile.vaccinations.map(vaccination => (
                        <Typography key={vaccination.id} variant="h6" gutterBottom>
                            {vaccination.name}, {vaccination.date}
                        </Typography>
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={handleOpen}
                        sx={{ mb: 2, mt: 2, color: 'white' }}
                    >
                        Edit Profile
                    </Button>

                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogContent>
                            <ProfileForm />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => {
                                console.log('Save changes here');
                                handleClose();
                            }}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

                <Grid item xs={12} md={6}>
                    <NotesPage />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
