import { Person, Chatbox, Menu, Close, LogoGoogle, PersonCircleOutline } from "react-ionicons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
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

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const onSuccessLogin = (user: any) => {
    setUser(user);
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

  const promptSignout = () => {
    withReactContent(Swal).fire({
      title: 'Are you sure you want to sign out?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sign Out',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#27272a',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await auth.signOut();
        setUser(null);
        navigate('/login')
      }
    });
  };

  return (
    <nav>
      {/* Sidebar Toggle Button */}
      <div className="flex space-x-4 items-center p-2 sm:hidden">
        <button
          onClick={toggleSidebar}
          type="button"
          className="p-2 bg-slate-200 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        >
          <Menu color={"#00000"} height="25px" width="25px" />
        </button>
        <h6 className="text-slate-500 font-bold text-xl">{document.title}</h6>
      </div>

      {/* Sidebar Content */}
      <aside
        id="cta-button-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <div className="flex space-x-1  items-stretch justify-between">
            {/* Header Title */}
            <div className="flex items-center p-2 text-gray-200 rounded-lg bg-slate-700 group shadow-md flex-grow">
              <img className="w-8 h-8" src="/logo.png" alt="Logo" />
              <span className="ml-3 text-lg -800 font-medium">
                Chat Assistant
              </span>
            </div>
            {/* Sidebar Close button */}
            <button
              onClick={toggleSidebar}
              type="button"
              className="p-2 bg-slate-200 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-12 flex items-center justify-center"
            >
              <Close color={"#00000"} width="25px" />
            </button>
          </div>

          {/* Sidebar Items */}
          <ul className="space-y-2 font-medium mt-3">
            {/* Sidebar Item 1 */}
            <Link
              to="/"
              onClick={toggleSidebar}
              className={`flex items-center p-2 text-gray-800 rounded-lg   ${location.pathname === "/"
                ? "bg-slate-300"
                : "bg-slate-50 hover:bg-gray-200"
                }`}
            >
              <Chatbox color={"#314673"} height="30px" width="30px" />
              <span className="ml-3">Chat with AI Language Model</span>
            </Link>
            {/* Sidebar Item 2 */}
            <Link
              to="/chat-person"
              onClick={toggleSidebar}
              className={`flex items-center p-2 text-gray-800 rounded-lg   ${location.pathname === "/chat-person"
                ? "bg-slate-300"
                : "bg-slate-50 hover:bg-gray-200"
                }`}
            >
              <Person color={"#314673"} height="30px" width="30px" />
              <span className="ml-3">Connect with E. Zarate Representative</span>
            </Link>
            {/* Sidebar Item 4 */}
            {!user ? (

              <Link
                to="/login"
                state={{ prev: location.pathname }}
                onClick={toggleSidebar}
                className={`flex items-center p-2 text-gray-800 rounded-lg   ${location.pathname === "/login"
                  ? "bg-slate-300"
                  : "bg-slate-50 hover:bg-gray-200"
                  }`}
              >
                <LogoGoogle color={"#314673"} height="30px" width="30px" />
                <span className="ml-3">Log In</span>
              </Link>
            ) : (
              <div
                onClick={promptSignout}
                className={`flex items-center p-2 text-gray-800 rounded-lg   ${location.pathname === "/login"
                  ? "bg-slate-300"
                  : "bg-slate-50 hover:bg-gray-200"
                  }`}
              >
                <PersonCircleOutline color={"#314673"} height="30px" width="30px" />
                <span className="ml-3">
                  {user.email ? user.email : user.phoneNumber}
                </span>
              </div>
            )

            }
          </ul>
        </div>
      </aside>
    </nav>
  );
};

export default Sidebar;
