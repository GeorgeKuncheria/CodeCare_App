import { createBrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage.tsx';
import App from './App.tsx';
import Events from "./pages/events/Events.tsx";
import Event from "./pages/events/Event.tsx";
import CreateEvent from "./pages/events/CreateEvent.tsx";
import Donate from "./pages/donate/Donate.tsx";
import Success from "./pages/donate/Success.tsx";
import Cancel from "./pages/donate/Cancel.tsx";
import Forbidden from "./components/Auth/Forbidden.tsx";
import SignInPage from "./pages/auth/SignIn.tsx";
import SignUpPage from "./pages/auth/SignUp.tsx";
import SignedUpPage from "./pages/auth/SignedUp.tsx";
import SignedInPage from "./pages/auth/SignedIn.tsx";
import SignedOutPage from "./pages/auth/SignedOut.tsx";
import ListUsers from "./pages/admin/ListUsers.tsx";
import Appointment from "./pages/appointment/Appointments.tsx";
import ProfilePage from "./pages/ProfilePage";
import NotesPage from "./pages/NotePage";


const router = createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            {
                index:true,
                Component:HomePage
        },
        {
            path:'/signup/*',
            Component:SignUpPage

        },
        {
            path:'/signin/*',
            Component:SignInPage
        },
        {
            path: '/signedUp',
            Component: SignedUpPage
        },
        {
            path: '/signedIn',
            Component: SignedInPage
        },{
            path: '/signedOut',
            Component: SignedOutPage
        },
        {
            path: '/profiles',
            Component: ProfilePage
        },
        ]
    },
    {
        path: '/events',
        Component: App,
        children: [
            {
                Component: Events,
                index: true
            },
            {
                path: '/events/:id',
                Component: Event
            },
            {
                path: '/events/create',
                Component: CreateEvent
            },
            {
                path: '/events/:id/edit',
                Component: Event
            }
        ]
    },
    {
    path: '/appointments',
    Component: App,
    children: [
        {
            Component: Appointment,
            index: true
        }
    ]
},
    {
        path: '/donate',
        Component: App,
        children: [
            {
                Component: Donate,
                index: true
            },
            {
                path: '/donate/success',
                Component: Success
            },
            {
                path: '/donate/cancel',
                Component: Cancel
            }
        ]
    },
    {
      path: '/admin',
      Component: App,
      children: [
          {
              Component: ListUsers,
              index: true
          },
          {
              path: '/admin/users',
              Component: ListUsers
          }
      ]
    },
    {
        path: '/forbidden',
        Component: Forbidden
    }
]);

export default router;