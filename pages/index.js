// pages/index.js
import dynamic from 'next/dynamic';

// Dynamically import ChatPrototype to render only on the client
const ChatPrototype = dynamic(
  () => import('../components/ChatPrototype'),
  { ssr: false, loading: () => <p>Loading chat...</p> }
);

export default function Home() {
  return <ChatPrototype />;
}
