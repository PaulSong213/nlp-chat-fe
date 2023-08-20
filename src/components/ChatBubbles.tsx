interface Chat {
  isFromBot: boolean;
  message: string;
}

interface ChatBubblesProps {
  chats: Chat[];
}

const ChatBubbles: React.FC<ChatBubblesProps> = ({ chats }) => {
  return (
    <div className="flex flex-col-reverse h-full overflow-x-hidden mb-4">
      {chats.map((chat, index) => (
        <div
          key={index}
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
  );
};

export default ChatBubbles;
