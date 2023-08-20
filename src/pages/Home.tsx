import { Send } from "react-ionicons";
import { useState } from "react";
import ChatBubbles from "../components/ChatBubbles";
import ChatTypeLoader from "../components/ChatTypeLoader";
interface CounterProps {}

const Home: React.FC<CounterProps> = () => {
  // state of array chats
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

  // state of loader while bot is typing
  const [isBotTyping, setIsBotTyping] = useState(false);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {/* Chat Messages */}
            <ChatBubbles chats={chats} />
            <ChatTypeLoader isVisible={isBotTyping} />
            <div className="flex space-x-1 items-stretch justify-between ">
              {/* Chat Input */}
              <input
                type="text"
                className="z-20 flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 shadow outline-none"
              />
              {/* Sidebar Close button */}
              <button
                onClick={() => {
                  setIsBotTyping(!isBotTyping);
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
  );
};

export default Home;
