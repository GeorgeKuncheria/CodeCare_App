import {Box} from '@mui/material';
import {useEffect, useState} from 'react';
import MainFeaturedPost from '../components/Homepage/MainFeaturedPost.tsx';
import Footer from '../components/Homepage/Footer.tsx';
import Slider from "react-slick";


import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {searchEvents} from '../services/event-service.ts';
import {useNavigate} from 'react-router-dom';
import {getAll, loadEvents} from '../store/event-slice.ts';
import {AppDispatch} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import MyButton from '../utils/MyButton.tsx';
import booking_appointment from './../assets/booking_appointment.jpg';
import donations from './../assets/donations.jpg'


import {useTranslation} from 'react-i18next';


const mainFeaturedPost = {
    title: 'Empowering Health: Your Communitys Compassionate Care Portal',
    description:
        "   Welcome to CodeCare, your trusted healthcare companion. We are committed to providing accessible and compassionate healthcare solutions for everyone. Our platform connects patients with dedicated professionals, offering a range of services tailored to your needs. Together, we strive to create a healthier community, one person at a time.",
};


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function HomePage() {

    const {t} = useTranslation('common');

    const navigate = useNavigate();
    const events = useSelector(getAll());
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        searchEvents(searchParams).then((event) => {
            dispatch(loadEvents(event));
        });
    }, [searchParams]);

    return (
        <>
            <main>
                <MainFeaturedPost post={mainFeaturedPost}/>
                <Box sx={{position: 'relative', zIndex: 1, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                    <Typography variant="h4" component="h2" sx={{my: 2, textAlign: 'center'}}>
                        Upcoming Events
                    </Typography>
                    <Slider {...settings}>
                        {events.map((event) => (
                            <Box key={event.id} sx={{display: 'flex', p: 2, height: 300}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <img src={event.eventImage} alt="Event"
                                             style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                    </Grid>
                                    <Grid item xs={6}
                                          sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <Typography variant="h5">{event.title}</Typography>
                                        <Typography
                                            variant="subtitle1"><b>{t('homepage.link.label.homepageFeaturedHost')}: </b> {event.organizer}
                                        </Typography>
                                        <Typography
                                            variant="body1"><b>{t('homepage.link.label.homepageFeaturedDate')}: </b>{new Date(event.date).toLocaleDateString()}
                                        </Typography>
                                        <Typography
                                            variant="body1"><b>{t('homepage.link.label.homepageFeaturedLocation')}: </b> {`${event.location.name}, ${event.location.address}, ${event.location.city}, ${event.location.state}, ${event.location.country}`}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end', // This will align the button container to the right
                                                alignItems: 'center', // Align items vertically in the middle
                                                paddingRight: '20px' // Padding right to ensure the button is not sticking to the edge
                                            }}
                                        >
                                            <MyButton
                                                label={t('homepage.link.label.homepageFeaturedMoreDetails')}
                                                variant="contained"
                                                onClick={() => navigate(`/events/${event.id}`)}
                                                sx={{
                                                    fontSize: '0.75rem', // Smaller text
                                                    padding: '6px 12px' // Smaller padding
                                                }}
                                            />
                                        </Box>

                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Slider>
                </Box>


                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                maxWidth: '1200px',
                                height: '500px',
                                margin: '20px auto',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            {/* Content */}
                            <Box sx={{flex: 1, paddingLeft: '20px'}}>
                                <Typography
                                    component="h2"
                                    variant="h4"
                                    color="inherit"
                                    align="left"
                                    noWrap
                                >
                                    {t("homepage.link.label.homepageAppointmentTitle")} !!!
                                </Typography>

                                <Typography
                                    component="p"
                                    variant="body1"
                                    color="inherit"
                                    align="left"
                                >
                                    {t('homepage.link.label.homepageAppointmentDetails')}
                                </Typography>

                            </Box>


                            <Box
                                sx={{
                                    flex: 1,
                                    backgroundImage: `url(${booking_appointment})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'left center',
                                    height: '100%',
                                    borderRadius: '8px'
                                }}
                            />
                        </Box>

                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                maxWidth: '1200px',
                                height: '500px',
                                margin: '20px auto',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    backgroundImage: `url(${donations})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right center', // Moved the image to the left
                                    height: '100%',
                                    borderRadius: '8px'
                                }}
                            />
                            <Box sx={{flex: 1, paddingLeft: '20px'}}>
                                <Typography
                                    component="h2"
                                    variant="h4"
                                    color="inherit"
                                    align="left"
                                    noWrap
                                >
                                    {t("homepage.link.label.homepageDonationsTitle")}
                                </Typography>

                                <Typography
                                    component="p"
                                    variant="body1"
                                    color="inherit"
                                    align="left"
                                >
                                    {t('homepage.link.label.homepageDonationDetails')}
                                </Typography>
                                <br/>
                                <MyButton label={t('header.button.label.donate')} variant='contained' onClick={() => {
                                    navigate(`/donate`)
                                }}/>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>


                <div style={{marginTop: '50px'}}>
                    <Footer
                        title="CodeCare"
                        description="Empowering communities through accessible healthcare solutions."
                    />
                </div>
            </main>
        </>
    );
}
