import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, MessageCircle, ShoppingBag } from 'lucide-react';
import { User, Chat, db } from '../database';

interface ChatPageProps {
  user: User;
  initialChatId?: string;
  onBack: () => void;
}

export default function ChatPage({ user, initialChatId, onBack }: ChatPageProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState('');
  const [tick, setTick] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refreshChats();
    if (initialChatId) {
      const chat = db.getChatById(initialChatId);
      if (chat) setActiveChat(chat);
    }
  }, [initialChatId]);

  // Poll for new messages (seller auto-reply)
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      refreshChats();
      if (activeChat) {
        const updated = db.getChatById(activeChat.id);
        if (updated) setActiveChat(updated);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  function refreshChats() {
    setChats(db.getUserChats(user.id));
  }

  function sendMessage() {
    if (!activeChat || !message.trim()) return;
    const updated = db.addMessage(activeChat.id, 'user', message.trim());
    if (updated) {
      setActiveChat(updated);
      refreshChats();
    }
    setMessage('');
  }

  function formatTime(isoString: string) {
    const d = new Date(isoString);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  function formatDate(isoString: string) {
    const d = new Date(isoString);
    const today = new Date();
    const diff = today.getDate() - d.getDate();
    if (diff === 0) return 'Hari ini';
    if (diff === 1) return 'Kemarin';
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  }

  const lastMessage = (chat: Chat) => {
    const msgs = chat.messages;
    if (!msgs.length) return '';
    const last = msgs[msgs.length - 1];
    return (last.from === 'user' ? 'Kamu: ' : '') + last.text.slice(0, 40) + (last.text.length > 40 ? '...' : '');
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col">
      {/* Top Bar */}
      <div className="h-8 bg-white border-b border-[#EEEEEE] flex items-center justify-end px-8 gap-5">
        <span className="text-[12px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>🛡️ Bantuan</span>
        <span className="text-[12px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>🇮🇩 ID - IDR | ID</span>
      </div>

      {/* Header */}
      <div className="bg-[#1341C4] px-8 h-[60px] flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Kembali</span>
        </button>
        <div className="w-px h-6 bg-white/20"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[18px]">💎</div>
          <span className="text-white text-[18px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Kotak Pesan</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 128px)' }}>

        {/* Chat List */}
        <div className="w-[320px] bg-white border-r border-[#E5E7EB] flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-[#E5E7EB]">
            <span className="text-[14px] text-[#111111]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Pesan ({chats.length})</span>
          </div>

          {chats.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <MessageCircle className="w-12 h-12 text-[#CCCCCC] mb-3" />
              <p className="text-[14px] text-[#888888]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Belum ada pesan</p>
              <p className="text-[12px] text-[#AAAAAA] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Chat dengan penjual dari halaman produk
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-[#F4F6FB] transition-colors border-b border-[#E5E7EB] ${activeChat?.id === chat.id ? 'bg-[#E8F0FF]' : ''}`}
                >
                  <div className="w-10 h-10 bg-[#1341C4] rounded-full flex items-center justify-center text-white text-[14px] flex-shrink-0" style={{ fontWeight: 700 }}>
                    {chat.sellerInitial}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#111111]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{chat.sellerName}</span>
                      <span className="text-[10px] text-[#AAAAAA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {chat.messages.length ? formatTime(chat.messages[chat.messages.length - 1].timestamp) : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#1341C4] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{chat.productName}</p>
                    <p className="text-[11px] text-[#888888] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{lastMessage(chat)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat Window */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-[#F4F6FB]">
            {/* Chat Header */}
            <div className="bg-white px-6 py-3 border-b border-[#E5E7EB] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1341C4] rounded-full flex items-center justify-center text-white text-[14px]" style={{ fontWeight: 700 }}>
                {activeChat.sellerInitial}
              </div>
              <div>
                <p className="text-[14px] text-[#111111]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{activeChat.sellerName}</p>
                <p className="text-[11px] text-[#22C55E]" style={{ fontFamily: 'Inter, sans-serif' }}>● Online</p>
              </div>
              <div className="ml-auto">
                <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl px-3 py-1.5 flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#0369A1]" />
                  <span className="text-[11px] text-[#0369A1]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{activeChat.productName}</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {/* Date separator */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 border-t border-[#E5E7EB]"></div>
                <span className="text-[11px] text-[#AAAAAA] bg-[#F4F6FB] px-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {activeChat.messages.length ? formatDate(activeChat.messages[0].timestamp) : ''}
                </span>
                <div className="flex-1 border-t border-[#E5E7EB]"></div>
              </div>

              {activeChat.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'seller' && (
                    <div className="w-7 h-7 bg-[#1341C4] rounded-full flex items-center justify-center text-white text-[11px] mr-2 flex-shrink-0 self-end" style={{ fontWeight: 700 }}>
                      {activeChat.sellerInitial}
                    </div>
                  )}
                  <div className={`max-w-[65%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                        msg.from === 'user'
                          ? 'bg-[#1341C4] text-white rounded-br-sm'
                          : 'bg-white text-[#111111] rounded-bl-sm shadow-sm border border-[#E5E7EB]'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[#AAAAAA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {formatTime(msg.timestamp)}
                      {msg.from === 'user' && ' ✓✓'}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto bg-white border-t border-[#E5E7EB]">
              {['Harga berapa?', 'Berapa lama prosesnya?', 'Apakah stok ada?', 'Terima kasih!'].map((q) => (
                <button
                  key={q}
                  onClick={() => setMessage(q)}
                  className="flex-shrink-0 bg-[#E8F0FF] text-[#1341C4] rounded-full px-3 py-1.5 text-[11px] hover:bg-[#1341C4] hover:text-white transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="bg-white px-6 py-3 flex gap-3 border-t border-[#E5E7EB]">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Tulis pesan..."
                className="flex-1 border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-[#1341C4] focus:ring-2 focus:ring-[#E8F0FF] transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 bg-[#1341C4] hover:bg-[#0f3399] rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-[#E8F0FF] rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-10 h-10 text-[#1341C4]" />
            </div>
            <p className="text-[16px] text-[#111111] mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Pilih Percakapan</p>
            <p className="text-[13px] text-[#888888]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Pilih chat di sebelah kiri untuk mulai berkomunikasi dengan penjual
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
