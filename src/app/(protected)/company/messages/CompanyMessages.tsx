import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';

export default function CompanyMessages() {
  return (
    <div className="h-[calc(100vh-80px)] flex gap-6">
      <ConversationList />
      <ChatWindow />
    </div>
  );
}
