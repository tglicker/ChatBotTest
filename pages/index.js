// pages/index.js
import dynamic from 'next/dynamic';

// Dynamically import ChatPrototype to disable SSR
const ChatPrototype = dynamic(() => import('../components/ChatPrototype'), { ssr: false });

export default function Home() {
  return <ChatPrototype />;
}
