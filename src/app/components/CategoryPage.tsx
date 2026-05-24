import { Star, ChevronRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { User } from '../database';

interface NavProps {
  user: User | null;
  onOpenLogin: () => void;
  onNavigateToHome: () => void;
  onNavigateToCategory: (category: string) => void;
  onNavigateToProfile: () => void;
  onNavigateToChat: () => void;
  onLogout: () => void;
}

interface CategoryPageProps {
  category: string;
  onBack: () => void;
  onNavigateToProduct: (productId: string) => void;
  onOpenLogin: () => void;
  navProps: NavProps;
  user: User | null;
}

const categoryData = {
  'Top Up': {
    title: 'Top Up Game',
    description: 'Top up diamond, coin, dan currency game favorit kamu dengan harga terbaik',
    icon: '💎',
    subcategories: ['Mobile Games', 'PC Games', 'Console Games'],
    games: [
      { id: 'mobile-legends', name: 'Mobile Legends', emoji: '⚔️', items: '1.2k produk', popular: true },
      { id: 'free-fire', name: 'Free Fire', emoji: '🔥', items: '980 produk', popular: true },
      { id: 'genshin-impact', name: 'Genshin Impact', emoji: '✨', items: '750 produk', popular: true },
      { id: 'pubg-mobile', name: 'PUBG Mobile', emoji: '🎯', items: '850 produk', popular: false },
      { id: 'valorant', name: 'Valorant', emoji: '💥', items: '620 produk', popular: false },
      { id: 'roblox', name: 'Roblox', emoji: '🎮', items: '1.5k produk', popular: true },
      { id: 'clash-of-clans', name: 'Clash of Clans', emoji: '🏰', items: '540 produk', popular: false },
      { id: 'honor-of-kings', name: 'Honor of Kings', emoji: '👑', items: '420 produk', popular: false },
    ],
  },
  'Game Key': {
    title: 'Game Key & CD Key',
    description: 'Beli game original dengan harga murah. Steam, Epic Games, dan platform lainnya',
    icon: '🔑',
    subcategories: ['Steam Games', 'Epic Games', 'Origin Games', 'Random Key'],
    games: [
      { id: 'steam-key', name: 'Steam Games', emoji: '🎮', items: '5.2k produk', popular: true },
      { id: 'epic-games', name: 'Epic Games', emoji: '🎯', items: '2.1k produk', popular: true },
      { id: 'random-steam', name: 'Random Steam Key', emoji: '🎲', items: '850 produk', popular: false },
      { id: 'origin-games', name: 'Origin Games', emoji: '🎪', items: '620 produk', popular: false },
      { id: 'uplay-games', name: 'Uplay Games', emoji: '🎭', items: '450 produk', popular: false },
      { id: 'gog-games', name: 'GOG Games', emoji: '🏛️', items: '380 produk', popular: false },
    ],
  },
  'Akun': {
    title: 'Akun Game',
    description: 'Beli akun game berkualitas dengan harga terjangkau. Aman dan terpercaya',
    icon: '👤',
    subcategories: ['Mobile Games', 'PC Games', 'Console Games'],
    games: [
      { id: 'ml-account', name: 'Mobile Legends', emoji: '⚔️', items: '3.2k akun', popular: true },
      { id: 'ff-account', name: 'Free Fire', emoji: '🔥', items: '2.8k akun', popular: true },
      { id: 'genshin-account', name: 'Genshin Impact', emoji: '✨', items: '1.9k akun', popular: true },
      { id: 'pubg-account', name: 'PUBG Mobile', emoji: '🎯', items: '1.5k akun', popular: false },
      { id: 'roblox-account', name: 'Roblox', emoji: '🎮', items: '2.1k akun', popular: false },
      { id: 'clash-account', name: 'Clash of Clans', emoji: '🏰', items: '980 akun', popular: false },
    ],
  },
  'Voucher': {
    title: 'Voucher & Gift Card',
    description: 'Voucher game, e-wallet, streaming, dan gift card dengan harga spesial',
    icon: '🎫',
    subcategories: ['Game Voucher', 'E-Wallet', 'Streaming', 'Shopping'],
    games: [
      { id: 'steam-voucher', name: 'Steam Wallet', emoji: '💳', items: '1.8k voucher', popular: true },
      { id: 'google-play', name: 'Google Play', emoji: '📱', items: '2.5k voucher', popular: true },
      { id: 'apple-gift', name: 'Apple Gift Card', emoji: '🍎', items: '1.2k voucher', popular: true },
      { id: 'gopay', name: 'GoPay', emoji: '💰', items: '950 voucher', popular: false },
      { id: 'dana', name: 'DANA', emoji: '💵', items: '880 voucher', popular: false },
      { id: 'spotify', name: 'Spotify Premium', emoji: '🎵', items: '720 voucher', popular: false },
    ],
  },
  'Roblox': {
    title: 'Roblox',
    description: 'Top up Robux, beli akun, item, dan game pass Roblox termurah',
    icon: '🎮',
    subcategories: ['Robux', 'Game Pass', 'Items', 'Accounts'],
    games: [
      { id: 'roblox', name: 'Robux', emoji: '💎', items: '2.8k produk', popular: true },
      { id: 'blox-fruits', name: 'Blox Fruits', emoji: '🍎', items: '1.5k produk', popular: true },
      { id: 'adopt-me', name: 'Adopt Me', emoji: '🐾', items: '1.2k produk', popular: true },
      { id: 'tower-defense', name: 'Tower Defense', emoji: '🗼', items: '850 produk', popular: false },
      { id: 'brookhaven', name: 'Brookhaven RP', emoji: '🏠', items: '620 produk', popular: false },
      { id: 'royale-high', name: 'Royale High', emoji: '👑', items: '540 produk', popular: false },
    ],
  },
  'Item': {
    title: 'Item Game',
    description: 'Jual beli item game seperti skin, weapon, hero, dan lainnya',
    icon: '⚔️',
    subcategories: ['MOBA Items', 'RPG Items', 'Shooter Items', 'Trading Items'],
    games: [
      { id: 'ml-items', name: 'Mobile Legends', emoji: '⚔️', items: '4.2k items', popular: true },
      { id: 'dota-items', name: 'Dota 2', emoji: '🛡️', items: '3.5k items', popular: true },
      { id: 'csgo-items', name: 'CS:GO Skins', emoji: '🔫', items: '8.9k items', popular: true },
      { id: 'growtopia', name: 'Growtopia DL', emoji: '🌱', items: '2.1k items', popular: false },
      { id: 'valorant-items', name: 'Valorant Skins', emoji: '💥', items: '1.8k items', popular: false },
      { id: 'ff-items', name: 'Free Fire Items', emoji: '🔥', items: '2.5k items', popular: false },
    ],
  },
  'Koin Game': {
    title: 'Koin Game',
    description: 'Beli koin dan currency game dengan harga termurah dan proses cepat',
    icon: '🪙',
    subcategories: ['Mobile Games', 'PC Games', 'Web Games'],
    games: [
      { id: 'fc-mobile', name: 'FC Mobile', emoji: '⚽', items: '1.5k produk', popular: true },
      { id: 'fifa', name: 'FIFA Coins', emoji: '🏆', items: '1.8k produk', popular: true },
      { id: 'nba-2k', name: 'NBA 2K', emoji: '🏀', items: '920 produk', popular: false },
      { id: 'madden', name: 'Madden NFL', emoji: '🏈', items: '650 produk', popular: false },
      { id: 'coin-master', name: 'Coin Master', emoji: '🎰', items: '780 produk', popular: false },
    ],
  },
  'RPG': {
    title: 'RPG Games',
    description: 'Top up dan jual beli item untuk game RPG favorit kamu',
    icon: '🐉',
    subcategories: ['MMORPG', 'Action RPG', 'Turn-Based RPG'],
    games: [
      { id: 'genshin-rpg', name: 'Genshin Impact', emoji: '✨', items: '2.8k produk', popular: true },
      { id: 'ragnarok', name: 'Ragnarok M', emoji: '⚔️', items: '1.2k produk', popular: true },
      { id: 'black-desert', name: 'Black Desert', emoji: '🌙', items: '850 produk', popular: false },
      { id: 'lost-ark', name: 'Lost Ark', emoji: '🏺', items: '720 produk', popular: false },
      { id: 'honkai', name: 'Honkai Star Rail', emoji: '🚂', items: '1.5k produk', popular: true },
      { id: 'final-fantasy', name: 'Final Fantasy XIV', emoji: '🗡️', items: '980 produk', popular: false },
    ],
  },
  'Random Steam Key': {
    title: 'Random Steam Key',
    description: 'Dapatkan game Steam random dengan harga murah. Siapa tahu dapat game AAA!',
    icon: '🎲',
    subcategories: ['Bronze Key', 'Silver Key', 'Gold Key', 'Premium Key'],
    games: [
      { id: 'bronze-key', name: 'Bronze Random Key', emoji: '🥉', items: '∞ stock', popular: true },
      { id: 'silver-key', name: 'Silver Random Key', emoji: '🥈', items: '∞ stock', popular: true },
      { id: 'gold-key', name: 'Gold Random Key', emoji: '🥇', items: '∞ stock', popular: true },
      { id: 'platinum-key', name: 'Platinum Random Key', emoji: '💎', items: '∞ stock', popular: false },
      { id: 'indie-bundle', name: 'Indie Game Bundle', emoji: '🎮', items: '∞ stock', popular: false },
      { id: 'aaa-random', name: 'AAA Random Key', emoji: '⭐', items: '∞ stock', popular: true },
    ],
  },
  'Simulation': {
    title: 'Simulation Games',
    description: 'Top up dan item untuk game simulasi favorit kamu',
    icon: '🌾',
    subcategories: ['Farming Sim', 'City Builder', 'Life Sim', 'Management'],
    games: [
      { id: 'minecraft', name: 'Minecraft', emoji: '🧱', items: '1.8k produk', popular: true },
      { id: 'sims', name: 'The Sims 4', emoji: '🏡', items: '1.2k produk', popular: true },
      { id: 'farming-sim', name: 'Farming Simulator', emoji: '🚜', items: '650 produk', popular: false },
      { id: 'cities-skylines', name: 'Cities Skylines', emoji: '🏙️', items: '520 produk', popular: false },
      { id: 'stardew', name: 'Stardew Valley', emoji: '🌻', items: '480 produk', popular: false },
      { id: 'planet-zoo', name: 'Planet Zoo', emoji: '🦁', items: '380 produk', popular: false },
    ],
  },
};

export default function CategoryPage({ category, onBack, onNavigateToProduct, onOpenLogin, navProps, user }: CategoryPageProps) {
  const data = categoryData[category as keyof typeof categoryData];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F4F6FB] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[20px] text-[#111111]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Kategori tidak ditemukan
          </h2>
          <button
            onClick={onBack}
            className="mt-4 bg-[#1341C4] text-white px-6 py-2 rounded-lg text-[14px]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <Navbar {...navProps} />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#EEEEEE] px-8 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="text-[#1341C4] hover:underline text-[13px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Beranda
          </button>
          <ChevronRight className="w-4 h-4 text-[#888888]" />
          <span className="text-[#111111] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            {data.title}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-[240px]">
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden sticky top-6">
              {/* Header */}
              <div className="p-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[28px]">{data.icon}</span>
                  <h3 className="text-[#111111] text-[16px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    {data.title}
                  </h3>
                </div>
              </div>

              {/* Subcategories */}
              <div className="p-2">
                {data.subcategories.map((sub, idx) => (
                  <button
                    key={sub}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] transition-colors ${
                      idx === 0
                        ? 'bg-[#E8F0FF] text-[#1341C4]'
                        : 'text-[#555555] hover:bg-[#F4F6FB]'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: idx === 0 ? 600 : 400 }}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-[#111111] text-[24px] mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                {data.title}
              </h1>
              <p className="text-[#888888] text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {data.description}
              </p>
            </div>

            {/* Popular Games Badge */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-[#FEF3C7] border border-[#FCD34D] rounded-lg px-3 py-2">
                <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-[#92400E] text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Game Populer
                </span>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-3 gap-4">
              {data.games.filter(g => g.popular).map((game) => (
                <div
                  key={game.id}
                  onClick={() => onNavigateToProduct(game.id)}
                  className="bg-white rounded-xl border border-[#E5E7EB] p-4 cursor-pointer hover:shadow-lg hover:border-[#1341C4] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-[28px] flex-shrink-0">
                      {game.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#111111] text-[14px] mb-1 truncate" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        {game.name}
                      </h3>
                      <p className="text-[#888888] text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {game.items}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#CCCCCC] flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* All Games Section */}
            <div className="mt-8">
              <h2 className="text-[#111111] text-[18px] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                Semua Game
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {data.games.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => onNavigateToProduct(game.id)}
                    className="bg-white rounded-xl border border-[#E5E7EB] p-4 cursor-pointer hover:shadow-lg hover:border-[#1341C4] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-[28px] flex-shrink-0">
                        {game.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#111111] text-[14px] mb-1 truncate" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                          {game.name}
                        </h3>
                        <p className="text-[#888888] text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {game.items}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#CCCCCC] flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
