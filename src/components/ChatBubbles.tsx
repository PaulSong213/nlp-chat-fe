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
      message: 'Can I request for a specific doctor?'
    },
    {
      title: 'Hospital Location',
      message: 'Where can I locate E. Zarate Hospital located?'
    },
    {
      title: 'Medical Document Availability',
      message: 'Does my medical document available?'
    },
    {
      title: 'Service Availability',
      message: 'Is X-Ray available?'
    },
    {
      title: 'Required Documents',
      message: 'What should I bring with me for my Out Patient appointment?'
    },
    {
      title: 'Contact Information',
      message: 'How can I schedule an appointment?'
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
      message: 'What are the visiting hours?'
    },
    {
      title: 'Old Record',
      message: 'Do I need to bring my old medical certificate?'
    }
  ]

  return (
    <div className="flex flex-col justify-end mt-auto min-h-full pb-3 space-y-2">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 mt-20">
        {presetChats.map((chat, index) => (
          <div
            key={index}
            onClick={() => sendChat(chat.message, false)}
            className={`flex flex-col border mouse-pointer border-white bg-white rounded-md shadow-md p-3 hover:bg-zinc-100 cursor-pointer`}>
            <p className={` flex flex-col rounded-lg break-word `} >
              {chat.title}
              <span className='text-xs' dangerouslySetInnerHTML={{ __html: chat.message }} />

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
