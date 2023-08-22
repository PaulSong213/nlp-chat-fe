import ChatTypeLoader from "../components/ChatTypeLoader";

interface Chat {
  isFromBot: boolean;
  message: string;
}

interface ChatBubblesProps {
  chats: Chat[];
  isBotTyping: boolean;
}

const ChatBubbles: React.FC<ChatBubblesProps> = ({ chats, isBotTyping }) => {
  return (
    <div className="flex flex-col justify-end mt-auto min-h-full pb-3 space-y-2">
      {chats.map((chat, index) => (
        <div
          key={index}
          className={`flex w-3/4 mt-5  ${
            chat.isFromBot ? "space-x-2 " : "self-end justify-end"
          }`}
        >
          {chat.isFromBot && (
            <img className="w-10 h-10" src="/logo.png" alt="Logo" />
          )}
          <p
            className={` p-4 rounded-lg break-all shadow-sm ${
              chat.isFromBot
                ? "bg-slate-700 text-slate-50"
                : "bg-slate-200 text-slate-800 "
            }`}
          >
            {chat.message}
          </p>
        </div>
      ))}
      <ChatTypeLoader isVisible={isBotTyping} />
    </div>
  );
};

export default ChatBubbles;
