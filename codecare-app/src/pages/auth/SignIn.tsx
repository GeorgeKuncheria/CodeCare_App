import { SignIn } from '@clerk/clerk-react';
import signInImage from './../../assets/doctor_img2.jpg'

export default function SignInPage() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <div style={{
                flex: 1, 
                backgroundImage: `url(${signInImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center'
            }}>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SignIn 
                    path="/signin" 
                    signUpUrl="/signup" 
                    fallbackRedirectUrl="/signedIn" 
                    signUpFallbackRedirectUrl="/signedUp" 
                    afterSignOutUrl="/signedOut" 
                />
            </div>
        </div>
    );
}
