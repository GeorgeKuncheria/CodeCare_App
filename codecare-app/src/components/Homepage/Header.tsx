import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

import { Typewriter } from 'react-simple-typewriter';

import {useSelector} from "react-redux";
import {getUser} from "./../../store/loginUser-slice.ts";
import * as authUtil from "./../../utils/auth-util.ts";
import Roles from "./../../models/Roles.ts";


//utilities
import {useNavigate} from 'react-router-dom';
import MyButton from '../../utils/MyButton';
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";
import { FormControlLabel, Switch } from '@mui/material';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';



interface HeaderProps {
    title: string;
}

export default function Header(props: HeaderProps) {
    const { title} = props;
    const {t} = useTranslation('common');

    const navigate = useNavigate();

    const titleBlock=[title]
    const user = useSelector(getUser());
   const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.checked ? 'ta' : 'en');
    };

    return (

        <React.Fragment>

            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Typography
                    component="h2"
                    variant="h4"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{flex: 1}}
                >

                    <Typewriter
                        words={titleBlock}
                        loop={3}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </Typography>
                <FormControlLabel
                control={
                    <Switch
                        checked={i18n.language === 'ta'}
                        onChange={handleLanguageChange}
                    />
                }
                label={i18n.language === 'en' ? 'English' : 'தமிழ்'}
                sx={{ marginRight: 4 }}
            />
                <SignedIn>
                <Box sx={{ transform: 'scale(1.2)' }}>
                    <UserButton afterSignOutUrl='/signedOut' />
                </Box>
                </SignedIn>

                <SignedOut>
                    <Link href="/signin">{t('header.link.label.signin')}</Link>
                </SignedOut>
                &nbsp; &nbsp;
                <SignedOut>
                    <Link href="/signup">{t('header.link.label.signup')}</Link>
                </SignedOut>

            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ overflowX: 'auto', gap: 2 }}
            >
                <Link
                    color="inherit"
                    noWrap
                    variant="body1"
                    onClick={() => {
                        return navigate(`/`)
                    }}
                    sx={{ p: 1, flexShrink: 0, cursor: 'pointer' }}
                >
                    {t('header.link.label.home')}
                </Link>

                <Link
                    color="inherit"
                    noWrap
                    variant="body1"
                    onClick={() => {
                        return navigate(`/events`)
                    }}
                    sx={{ p: 1, flexShrink: 0, cursor: 'pointer' }}
                >
                    {t('header.link.label.events')}
                </Link>





                {
                authUtil.isUserInRole(user, [Roles.USER,Roles.DOCTOR]) ?
                    (
                <Link
                    color="inherit"
                    noWrap
                    variant="body1"
                    onClick={() => {
                        return navigate(`/appointments`)
                    }}
                    sx={{ p: 1, flexShrink: 0, cursor: 'pointer'}}
                >
                     {
                authUtil.isUserInRole(user, [Roles.USER]) ? (

                    "Book" ):<></>} {t('header.link.label.appointment')}
                </Link>):<></>

            }


                {
                authUtil.isUserInRole(user, [Roles.ADMIN]) ?
                    (
                <Link
                    color="inherit"
                    noWrap
                    variant="body1"
                    onClick={() => {
                        return navigate(`/admin/users`)
                    }}
                    sx={{ p: 1, flexShrink: 0, cursor: 'pointer'}}
                >
                    {t('header.link.label.user')}
                </Link>):<></>

                    }

                {
                    authUtil.isUserInRole(user, [Roles.USER]) ?
                        (
                            <Link
                                color="inherit"
                                noWrap
                                variant="body1"
                                onClick={() => {
                                    return navigate(`/profiles`)
                                }}
                                sx={{ p: 1, flexShrink: 0, cursor: 'pointer'}}
                            >
                                {t('header.link.label.profiles')}
                            </Link>):<></>

                }

                <MyButton
                    label= {t('header.button.label.donate')}
                    onClick={() => navigate(`/donate`)}
                    variant="outlined"
                    sx={{marginLeft: 'auto'}} // Add margin to the left of the button
                />
            </Toolbar>

        </React.Fragment>
    );
}
