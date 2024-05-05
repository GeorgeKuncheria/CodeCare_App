import {ReactElement} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getUser} from "../../store/loginUser-slice.ts";

interface AuthGuardProps {
    allowedRoles: Array<string>;
    children: JSX.Element;
}

function AuthGuard(props: AuthGuardProps): ReactElement {
    const {allowedRoles, children} = props;
    const location = useLocation();
    const user = useSelector(getUser());
    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    const role = user.role;
    if(!allowedRoles.includes(role)) {
        return <Navigate to="/forbidden" replace/>;
    }
    //TODO: add more checks to redirect to profile for user and specialization setup for doctor
    return children;
}

export default AuthGuard;
