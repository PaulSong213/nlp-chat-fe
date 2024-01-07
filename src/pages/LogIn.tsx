
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import 'firebase/auth';
import { Call } from "react-ionicons";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
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
    const [phone, setPhone] = useState('+63');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorGoogle, setErrorGoogle] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();

    const onSuccessLogin = (user: any) => {
        if (user) {
            console.log('User logged in successfully!');
            console.log('User information:', user);

            // You can access specific user properties like displayName, email, uid, etc.
            console.log('User UID:', user.uid);
            console.log('User Display Name:', user.displayName);
            console.log('User Email:', user.email);
            // ... Add any other actions you want to perform after a successful login
            const prev = state?.prev === '/login' ? '/' : state?.prev ?? '/';
            navigate(prev);

            console.log(state);
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
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            let errorMessage = 'An error occurred during Google Sign-In.';

            if (error.code === 'auth/account-exists-with-different-credential') {
                errorMessage = 'An account already exists with the same email address but different sign-in credentials. Please sign in using the appropriate method.';
            } else if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Google Sign-In popup was closed before completion. Please try again.';
            } else if (error.code === 'auth/cancelled-popup-request') {
                errorMessage = 'The Google Sign-In popup request was cancelled. Please try again.';
            }
            // Add more specific cases as needed

            setErrorGoogle(errorMessage);
        }
    };

    const handlePhoneSignIn = async () => {
        const phoneNumber = `${phone}`;

        // Correct the order of arguments in RecaptchaVerifier initialization
        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            const code = window.prompt('Enter the verification code sent to your phone:');
            if (code) {
                await confirmationResult.confirm(code);
            }
        } catch (error: any) {
            console.error('Phone Sign-In Error:', error);
            // Reset reCAPTCHA widget after a failed sign-in attempt
            appVerifier.clear();
            // Format the error message for better user understanding
            let errorMessage = 'An error occurred while signing in with your phone number.';

            if (error.code === 'auth/invalid-phone-number') {
                errorMessage = 'Invalid phone number. Please check the provided phone number and try again.';
            } else if (error.code === 'auth/quota-exceeded') {
                errorMessage = 'Quota exceeded. Please try again later.';
            }
            // Add more specific cases as needed

            setErrorPhone(errorMessage);
        }
    };


    return (
        <main className="flex h-screen justify-center items-center antialiased text-gray-800">
            <div className="bg-white p-8 shadow-md rounded-md flex flex-col items-center sm:w-full md:max-w-md">
                <h2 className="text-2xl font-semibold ">LOG IN</h2>
                <h3 className='mb-4'>so we know how to contact you</h3>
                <span className='text-red-700 text-xs mb-1'>
                    {errorGoogle}
                </span>
                <button onClick={handleGoogleSignIn} className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                    <span>Continue with Google</span>
                </button>


                <div className='border-t-2 border-zinc-300 mt-8 mb-3 w-full text-center'>
                    <span className='-mt-[14px] block w-max bg-white mx-auto px-2'>or</span>
                </div>

                <div className='flex flex-col items-center w-full'>
                    <label className="block mb-2" htmlFor="phone">
                        Phone Number:
                    </label>
                    <span className='text-red-700 text-xs mb-1'>
                        {errorPhone}
                    </span>
                    <input
                        type="tel"
                        id="phone"
                        className="border p-2 w-full rounded-lg"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => {
                            // validate to be numbers only
                            const regex = /^[0-9+\b]+$/;
                            if (!regex.test(e.target.value)) return;

                            // Check for length constraints
                            if (e.target.value.length > 13) return; // Maximum length
                            if (e.target.value.length < 3) return;  // Minimum length

                            setPhone(e.target.value)
                        }}
                    />
                    <button
                        className="bg-zinc-800 text-white px-4 py-2 rounded-md mt-2 w-full flex justify-center space-x-2 items-center"
                        onClick={handlePhoneSignIn}
                    >
                        <Call color={"#fff"} />
                        <span>Sign In with Phone Number</span>
                    </button>
                </div>

                {/* Container for the reCAPTCHA widget */}
                <div className='my-2' id="recaptcha-container"></div>
            </div>
        </main>
    );
};

export default LogIn;
