import { Send } from "react-ionicons";
import { useState, useRef, useEffect } from "react";
import ChatBubbles from "../components/ChatBubbles";

interface CounterProps { }

const Home: React.FC<CounterProps> = () => {
    const botInitialMessage = {
        isFromBot: true,
        message: "Hello, I am E. Zarate personal assistant. How can I help you?",
    };
    const [userChat, setUserChat] = useState("");
    const [chats, setChats] = useState([botInitialMessage]);

    useEffect(() => {
        if (chats[chats.length - 1].isFromBot) return;
        setIsBotTyping(true);
        // TODO : When backend is ready, send the user's message to the backend and get the bot's reply
        fetch("https://nlp-be.azurewebsites.net/chatbot?format=json&message=" + chats[chats.length - 1].message, { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
                sendChat(data.response, true);
                setIsBotTyping(false);
            })
            .catch((e) => {
                console.log(e);
            })
            ;
    }, [chats]);

    // Ref to the chat messages container
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);

    const sendChat = (chat: string, isFromBot: boolean) => {
        if (!chat) return; // If the chat is empty, do nothing
        const newChat = {
            isFromBot: isFromBot,
            message: chat,
        };

        setChats([...chats, newChat]);
        setUserChat("");
    };







    const [isBotTyping, setIsBotTyping] = useState(false);

    // Auto-scroll behavior
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [chats]);

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col justify-end flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full pl-3 py-3 pr-1 overflow-hidden">
                        {/* Chat Messages */}
                        <div
                            ref={chatMessagesRef}
                            className="overflow-y-auto p-2 flex-grow"
                        >
                            <ChatBubbles chats={chats} isBotTyping={isBotTyping} />
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
    );
};

export default Home;
