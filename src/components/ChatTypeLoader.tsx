interface ChatTypeLoaderProps {
  isVisible: boolean;
}

const ChatTypeLoader: React.FC<ChatTypeLoaderProps> = ({ isVisible }) => {
  return (
    <div
      className={`space-x-3 my-2  duration-200 ease flex z-10 ${
        isVisible
          ? "h-12 opacity-100 transition-all"
          : "h-0 opacity-0  transition-none"
      }`}
    >
      <img className="w-10 h-10" src="/logo.png" alt="Logo" />
      <div className=" bg-slate-200 p-2 h-full flex space-x-1 items-center w-max rounded-lg ">
        <div className="bg-slate-700 w-3 h-3 rounded-full self-center animate-bounce"></div>
        <div className="bg-slate-700 w-3 h-3 rounded-full self-center animate-bounce delay-1000"></div>
        <div className="bg-slate-700 w-3 h-3 rounded-full self-center animate-bounce"></div>
      </div>
    </div>
  );
};

export default ChatTypeLoader;
