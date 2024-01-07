import { Send } from "react-ionicons";
import ChatBubbles from "../components/ChatBubbles";
import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onChildAdded, get } from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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

interface CounterProps { }

const ChatPerson: React.FC<CounterProps> = () => {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [userChat, setUserChat] = useState("");
    const [chats, setChats] = useState([{ "isFromBot": true, "message": "Hi there! We are the representatives from E. Zarate Hospital. How can we help you today?" }]);
    const db = getDatabase();


    const navigate = useNavigate();
    const { state } = useLocation();
    const onSuccessLogin = (user: any) => {
        setFirebaseUser(user);
        console.log('User logged in successfully!');
        // return;
        // Fetch chats
        const chatRef = ref(db, 'chats/' + user?.uid);

        onChildAdded(chatRef, (snapshot) => {
            // Get the data of the added child
            const data = snapshot.val();
            console.log(data);

            // Convert data to a chat object
            const newChat = {
                id: snapshot.key,
                isFromBot: !data.isFromPatient,
                message: data.message,
            };

            // Update the state with the new chat
            setChats(prevChats => {
                // Make sure to use the previous state to avoid race conditions
                return [...prevChats, newChat];
            });
        }, (error) => {
            console.error('Error listening for chat data:', error);
        });
    };


    useEffect(() => {
        // Set up a listener for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                if (!firebaseUser) onSuccessLogin(user);
            } else {

                withReactContent(Swal).fire({
                    title: 'Sign In first',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Sign In',
                    cancelButtonText: 'Cancel',
                    confirmButtonColor: '#27272a',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        // User is logged in
                        navigate('/login');
                    } else {
                        navigate('/');
                    }
                });


            }
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, [onSuccessLogin]);

    // const [chats, setChats] = useState<{ isFromBot: boolean; message: string }[]>([]);


    // Ref to the chat messages container
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);

    const sendChat = (chat: string, isFromBot: boolean) => {
        if (!chat) return; // If the chat is empty, do nothing
        const newChat = {
            isFromBot: isFromBot,
            message: chat,
        };

        // setChats([...chats, newChat]);

        const userData = {
            name: firebaseUser?.displayName,
            email: firebaseUser?.email,
            uid: firebaseUser?.uid,
            photoURL: firebaseUser?.photoURL,
        }

        // save to firebase
        const firebaseChat = {
            isFromPatient: !isFromBot,
            message: chat,
            user: userData,
        }
        const chatRef = ref(db, 'chats/' + firebaseUser?.uid + '/' + new Date().getTime());
        // const newChatRef = push(chatRef);
        set(chatRef, firebaseChat).then(function () {
            setUserChat("");
        });

    };


    // Auto-scroll behavior
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [chats]);

    return (
        <div className={"h-screen antialiased text-gray-800 " + (!firebaseUser ? 'invisible' : 'flex')}>
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full md:p-6">
                    <div className="flex flex-col justify-end flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full pl-3 py-3 pr-1 overflow-hidden">
                        {/* Chat Messages */}
                        <div
                            ref={chatMessagesRef}
                            className="overflow-y-auto xl:p-2 flex-grow pr-5"
                        >
                            <ChatBubbles inPerson={true} chats={chats} isBotTyping={false} />
                        </div>

                        {/* Chat Input */}
                        <div className="flex space-x-1 items-stretch justify-between">
                            <input
                                value={userChat}
                                onChange={(e) => {
                                    setUserChat(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") sendChat(userChat, false);
                                }}
                                type="text"
                                className="z-20 flex flex-row items-center h-14 rounded-xl bg-white w-full px-4 shadow outline-none"
                            />
                            {/* Send button */}
                            <button
                                onClick={() => {
                                    sendChat(userChat, false);
                                }}
                                type="button"
                                className="p-2 bg-slate-800 text-sm rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-center w-16"
                            >
                                <Send color={"#f3f4f6"} width="25px" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ChatPerson;
