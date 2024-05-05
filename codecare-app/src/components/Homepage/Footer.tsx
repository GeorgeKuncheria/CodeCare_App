import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Grid, TextField } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import MyButton from '../../utils/MyButton';

import { useTranslation } from 'react-i18next';

function Copyright() {
  
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            <Link color="inherit" href="http://localhost:3002/">
                Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'} CodeCare. All Rights Reserved
        </Typography>
    );
}

interface FooterProps {
    description: string;
    title: string;
}

export default function Footer(props: FooterProps) {
    const { description, title } = props;
    const {t}=useTranslation('common');

    return (
        <Box component="footer" sx={{ bgcolor: 'grey.200', py: 6,  maxHeight:'10%'}}>
            <Container>

                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{position:'relative',right:'60px',top:'30px'}}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Link href="https://www.facebook.com"><FacebookIcon fontSize="large" /></Link>
                            <Link href="https://www.x.com"><TwitterIcon fontSize="large" sx={{ ml: 2 }} /></Link>
                            <Link href="https://www.instagram.com"><InstagramIcon fontSize="large" sx={{ ml: 2 }} /></Link>
                            {/* Add another icon here if needed */}
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}  sx={{position:'relative',right:'50px'}}>
                        <Typography variant="h6" align="center" gutterBottom>
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            color="text.secondary"
                            component="p"
                            gutterBottom
                        >
                            {t('homepage.link.label.homepageFooterDescription')}
                        </Typography>

                    </Grid>




                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{position:'relative' ,top:'30px'}}>
                        <TextField
                            variant="outlined"
                            label={t('homepage.link.label.homepageFooterNewsletter')}
                            fullWidth
                        />
                        <MyButton variant="contained" label={t('homepage.link.label.homepageFooterSubscribe')} color="primary" fullWidth sx={{ mt: 2 }}/>

                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{position:'relative', top:'40px',right:'50px'}}>
                        <Copyright />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
