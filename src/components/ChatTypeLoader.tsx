interface ChatTypeLoaderProps {
  isVisible: boolean;
}

const ChatTypeLoader: React.FC<ChatTypeLoaderProps> = ({ isVisible }) => {
  return (
    <div
      className={`space-x-3 duration-200 z-10 ${isVisible ? "flex" : "hidden"}`}
    >
      <img className="w-10 h-10" src="/logo.png" alt="Logo" />
      <div className=" bg-slate-200 p-2 h-10 flex space-x-1 items-center w-max rounded-lg ">
        <div className="bg-slate-700 w-3 h-3 rounded-full self-center animate-bounce"></div>
        <div className="bg-slate-700 w-3 h-3 rounded-full self-center animate-bounce delay-1000 transform translate-y-1/2"></div>
        <div className="bg-slate-700 w-3 h-3 rounded-full self-center animate-bounce"></div>
      </div>
    </div>
  );
};

export default ChatTypeLoader;
