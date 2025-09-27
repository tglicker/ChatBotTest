import dynamic from 'next/dynamic';

const ChatPrototype = dynamic(
  () => import('../components/ChatPrototype'),
  { ssr: false, loading: () => <p>Loading chat...</p> }
);

export default function Home() {
  return <ChatPrototype />;
}
