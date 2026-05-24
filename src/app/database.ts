// Kugem Mock Database using localStorage

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  coin: number;
  kupon: number;
  dompetku: number;
  level: number;
  exp: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  amount: number;
  status: 'menunggu_pembayaran' | 'menunggu_dikirim' | 'sudah_terkirim' | 'selesai';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  from: 'user' | 'seller';
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  userId: string;
  sellerId: string;
  sellerName: string;
  sellerInitial: string;
  productName: string;
  messages: ChatMessage[];
  createdAt: string;
}

const USERS_KEY = 'kugem_users';
const TRANSACTIONS_KEY = 'kugem_transactions';
const CHATS_KEY = 'kugem_chats';
const SESSION_KEY = 'kugem_session';

function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getTransactions(): Transaction[] {
  try {
    return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

function getChats(): Chat[] {
  try {
    return JSON.parse(localStorage.getItem(CHATS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveChats(chats: Chat[]): void {
  localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
}

export const db = {
  // Auth
  register(username: string, email: string, phone: string, password: string): { success: boolean; user?: User; error?: string } {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email sudah terdaftar' };
    }
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username sudah digunakan' };
    }
    const user: User = {
      id: `user_${Date.now()}`,
      username,
      email,
      password,
      phone,
      coin: 0,
      kupon: 0,
      dompetku: 0,
      level: 1,
      exp: 0,
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, user]);
    return { success: true, user };
  },

  login(email: string, password: string): { success: boolean; user?: User; error?: string } {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, error: 'Email atau password salah' };
    }
    localStorage.setItem(SESSION_KEY, user.id);
    return { success: true, user };
  },

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession(): User | null {
    const userId = localStorage.getItem(SESSION_KEY);
    if (!userId) return null;
    const users = getUsers();
    return users.find(u => u.id === userId) || null;
  },

  getUserById(id: string): User | null {
    const users = getUsers();
    return users.find(u => u.id === id) || null;
  },

  // Transactions
  getUserTransactions(userId: string): Transaction[] {
    return getTransactions().filter(t => t.userId === userId);
  },

  addTransaction(userId: string, productId: string, productName: string, amount: number): Transaction {
    const transactions = getTransactions();
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      userId,
      productId,
      productName,
      amount,
      status: 'menunggu_pembayaran',
      createdAt: new Date().toISOString(),
    };
    saveTransactions([...transactions, tx]);
    return tx;
  },

  // Chats
  getUserChats(userId: string): Chat[] {
    return getChats().filter(c => c.userId === userId);
  },

  createOrGetChat(userId: string, sellerId: string, sellerName: string, sellerInitial: string, productName: string): Chat {
    const chats = getChats();
    const existing = chats.find(c => c.userId === userId && c.sellerId === sellerId);
    if (existing) return existing;
    const chat: Chat = {
      id: `chat_${Date.now()}`,
      userId,
      sellerId,
      sellerName,
      sellerInitial,
      productName,
      messages: [
        {
          id: `msg_${Date.now()}`,
          from: 'seller',
          text: `Halo! Terima kasih sudah menghubungi ${sellerName}. Ada yang bisa kami bantu mengenai ${productName}?`,
          timestamp: new Date().toISOString(),
        }
      ],
      createdAt: new Date().toISOString(),
    };
    saveChats([...chats, chat]);
    return chat;
  },

  addMessage(chatId: string, from: 'user' | 'seller', text: string): Chat | null {
    const chats = getChats();
    const idx = chats.findIndex(c => c.id === chatId);
    if (idx === -1) return null;
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      from,
      text,
      timestamp: new Date().toISOString(),
    };
    chats[idx].messages = [...chats[idx].messages, msg];
    saveChats(chats);

    // Auto-reply from seller after 1s
    if (from === 'user') {
      setTimeout(() => {
        const replies = [
          'Baik, kami proses segera ya kak!',
          'Terima kasih atas pertanyaannya. Produk kami 100% aman dan terpercaya.',
          'Silahkan lanjutkan pembelian kak, proses instan!',
          'Ada yang ingin kak tanyakan lagi? Kami siap membantu 24/7 🙏',
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        db.addMessage(chatId, 'seller', reply);
      }, 1200);
    }

    return chats[idx];
  },

  getChatById(chatId: string): Chat | null {
    return getChats().find(c => c.id === chatId) || null;
  },
};
