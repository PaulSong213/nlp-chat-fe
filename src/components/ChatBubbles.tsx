import React, { useRef } from 'react';
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
}

const ChatBubbles: React.FC<ChatBubblesProps> = ({ chats, isBotTyping, inPerson = false }) => {
  return (
    <div className="flex flex-col justify-end mt-auto min-h-full pb-3 space-y-2">
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
