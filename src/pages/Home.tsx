import { Send } from "react-ionicons";
import { useState } from "react";
interface CounterProps {}

const Home: React.FC<CounterProps> = () => {
  // create state of chats
  const [chats] = useState([
    {
      isFromBot: true,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur mollitia esse, quos at neque et perferendis repudiandae necessitatibus architecto vitae veniam consectetur tempore! Quis, dolorum fugit. Nesciunt repellat nulla minima!",
    },
    {
      isFromBot: false,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur mollitia esse, quos at neque et perferendis repudiandae necessitatibus architecto vitae veniam consectetur tempore! Quis, dolorum fugit. Nesciunt repellat nulla minima!",
    },
  ]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {/* Chat Messages */}
            <div className="flex flex-col-reverse h-full overflow-x-hidden mb-4">
              {chats.map((chat) => (
                <div
                  className={`flex w-3/4 mt-5 shadow-sm ${
                    chat.isFromBot ? "space-x-2" : "self-end"
                  }`}
                >
                  {chat.isFromBot && (
                    <img className="w-10 h-10" src="/logo.png" alt="Logo" />
                  )}
                  <p
                    className={` p-4 rounded-lg break-all ${
                      chat.isFromBot
                        ? "bg-slate-700 text-slate-50"
                        : "bg-slate-200 text-slate-800 "
                    }`}
                  >
                    {chat.message}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex space-x-1  items-stretch justify-between">
              {/* Chat Input */}
              <input
                type="text"
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 shadow outline-none"
              />
              {/* Sidebar Close button */}
              <button
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
  );
};

export default Home;
