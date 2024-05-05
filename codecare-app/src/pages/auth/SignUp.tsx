import { SignUp } from '@clerk/clerk-react';
import signUpImage from './../../assets/doctor_img1.jpg'

export default function SignUpPage() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <div style={{
                flex: 1, 
                backgroundImage: `url(${signUpImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center'
            }}>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SignUp 
                    path="/signup" 
                    signInUrl="/signin" 
                    fallbackRedirectUrl="/signedUp" 
                    signInFallbackRedirectUrl="/signedIn" 
                    afterSignOutUrl="/signedOut" 
                />
            </div>
        </div>
    );
}

