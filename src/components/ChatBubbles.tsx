import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ChatTypeLoader from '../components/ChatTypeLoader';

interface Chat {
  id?: string;
  isFromBot: boolean;
  message: string;
}

interface ChatBubblesProps {
  chats: Chat[];
  isBotTyping: boolean;
  inPerson: boolean;
  sendChat: (chat: string, isFromBot: boolean) => void;
}

const ChatBubbles: React.FC<ChatBubblesProps> = ({ chats, isBotTyping, inPerson = false, sendChat }) => {

  const presetChats = [
    {
      title: 'Out Patient Appointment Process',
      message: 'How do I schedule an appointment?',
    },
    {
      title: 'Doctor Request',
      message: 'Can I request a specific doctor for my Hospital visit?'
    },
    {
      title: 'Hospital Location',
      message: 'Where does the E. Zarate Hospital located?'
    },
    {
      title: 'Medical Document Availability',
      message: 'Does my medical document available?'
    },
    {
      title: 'Service Availability',
      message: 'Is X-Ray service available?'
    },
    {
      title: 'Required Documents',
      message: 'What should I bring with me for my Out Patient appointment?'
    },
    {
      title: 'Facility',
      message: 'Is there a pharmacy or laboratory within the hospital for convenience?'
    },
    {
      title: 'Contact Information',
      message: 'How can I contact the hospital?'
    },
    {
      title: 'Typical Waiting Time',
      message: 'How long is the typical waiting time at the OPD?'
    },
    {
      title: 'Payment Mode',
      message: 'What are the accepted modes of payment?'
    },
    {
      title: 'Parking',
      message: 'Is there a parking lot available?'
    },
    {
      title: 'Hospital Hours',
      message: 'What are the hospital hours?'
    },
  ]

  return (
    <div className="flex flex-col justify-end mt-auto min-h-full pb-3 space-y-2">

      <div className="grid grid-cols-3 gap-4 mb-10 mt-20">
        {presetChats.map((chat, index) => (
          <div
            key={index}
            onClick={() => sendChat(chat.message, false)}
            className={`flex flex-col border mouse-pointer border-white bg-white rounded-md shadow-md p-3 hover:bg-zinc-100 cursor-pointer`}>
            <p className={` flex flex-col rounded-lg break-word `} >
              {chat.title}
              <span className='text-xs'>{chat.message}</span>
            </p>
          </div>
        ))
        }
      </div>

      <TransitionGroup component={null}>
        {chats.map((chat, index) => (
          <CSSTransition
            key={chat.id || index}
            timeout={500}
            classNames="fade"  // Make sure to define fade-enter, fade-enter-active, fade-exit, fade-exit-active in your CSS
          >
            <div
              className={`flex w-3/4 mt-5  ${chat.isFromBot ? 'space-x-2 ' : 'self-end justify-end'}`}
            >
              {chat.isFromBot && (
                <img className="w-10 h-10" src={inPerson ? '/person.png' : "/logo.png"} alt="Logo" />
              )}
              <p
                className={`p-4 rounded-lg break-word shadow-sm ${chat.isFromBot
                  ? 'bg-slate-700 text-slate-50'
                  : 'bg-slate-200 text-slate-800'
                  }`}
              >
                {chat.message}
              </p>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <ChatTypeLoader isVisible={isBotTyping} />
    </div>
  );
};

export default ChatBubbles;
