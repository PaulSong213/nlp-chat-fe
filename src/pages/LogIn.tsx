
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import 'firebase/auth';
import React, { useState, useEffect } from 'react';
const firebaseConfig = {
    apiKey: "AIzaSyDFk8xWRKVkALfi6ILzSfPb9nfbZdjUrFw",
    authDomain: "zarate-appointment.firebaseapp.com",
    databaseURL: "https://zarate-appointment-default-rtdb.firebaseio.com",
    projectId: "zarate-appointment",
    storageBucket: "zarate-appointment.appspot.com",
    messagingSenderId: "376311733517",
    appId: "1:376311733517:web:076a33630a3a32ea8ba444"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Initialize auth instance

interface LogInProps {
}

const LogIn: React.FC<LogInProps> = () => {
    const [phone, setPhone] = useState('');

    const onSuccessLogin = (user: any) => {
        if (user) {
            console.log('User logged in successfully!');
            console.log('User information:', user);

            // You can access specific user properties like displayName, email, uid, etc.
            console.log('User UID:', user.uid);
            console.log('User Display Name:', user.displayName);
            console.log('User Email:', user.email);
            // ... Add any other actions you want to perform after a successful login
        }
    };

    useEffect(() => {
        // Set up a listener for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                onSuccessLogin(user);
            }
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, [onSuccessLogin]);

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider(); // Update auth import
        try {
            await signInWithPopup(auth, provider, undefined); // Update auth import
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    const handlePhoneSignIn = async () => {
        const phoneNumber = `+63${phone}`;

        // Correct the order of arguments in RecaptchaVerifier initialization
        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            const code = window.prompt('Enter the verification code sent to your phone:');
            if (code) {
                await confirmationResult.confirm(code);
            }
        } catch (error) {
            console.error('Phone Sign-In Error:', error);
        }
    };


    return (
        <main className="flex h-screen justify-center items-center antialiased text-gray-800">
            <div className="bg-white p-8 shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Log In</h2>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={handleGoogleSignIn}>
                    Sign In with Google
                </button>

                <div>
                    <label className="block mb-2" htmlFor="phone">
                        Phone Number:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="border p-2 w-full"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                        onClick={handlePhoneSignIn}
                    >
                        Sign In with Phone Number
                    </button>
                </div>

                {/* Container for the reCAPTCHA widget */}
                <div id="recaptcha-container"></div>
            </div>
        </main>
    );
};

export default LogIn;
