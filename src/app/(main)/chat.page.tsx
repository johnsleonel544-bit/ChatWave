
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Info } from 'lucide-react';

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastSeen: string;
  unread?: number;
}

const initialChatUsers: ChatUser[] = [
    { id: '1', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Hey! Are we still meeting tomorrow?', lastSeen: 'today at 10:23 AM', unread: 3 },
    { id: '2', name: 'Design Team', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: "Michael: I've finished the UI mockups", lastSeen: 'yesterday at 8:15 PM' },
    { id: '3', name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?img=12', lastMessage: 'The project deadline has been moved up', lastSeen: 'Wednesday', unread: 1 },
    { id: '4', name: 'Mom', avatar: 'https://i.pravatar.cc/150?img=8', lastMessage: "Don't forget to call me this weekend", lastSeen: 'Monday' },
    { id: '5', name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?img=47', lastMessage: 'The concert was amazing!', lastSeen: 'Sep 12' },
];


export default function ChatListPage() {
  const appContainerRef = React.useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<ChatUser | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = React.useState(false);

  React.useEffect(() => {
    // This effect is to handle dropdown menus imperatively
    // A more React-idiomatic way would be to use state for dropdown visibility
    const dropdowns =
      appContainerRef.current?.querySelectorAll<HTMLDivElement>('.dropdown');
    const overlay = appContainerRef.current?.querySelector<HTMLDivElement>('.dropdown-overlay');

    const closeAllDropdowns = () => {
        dropdowns?.forEach(d => d.classList.remove('active'));
        overlay?.classList.remove('active');
    };

    dropdowns?.forEach((dropdown) => {
      const button = dropdown.querySelector<HTMLDivElement>('.action-btn, .new-chat-btn');

      const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        const isActive = dropdown.classList.contains('active');
        closeAllDropdowns();
        if (!isActive) {
            dropdown.classList.toggle('active');
            overlay?.classList.add('active');
        }
      };
      button?.addEventListener('click', handleClick);

      return () => {
        button?.removeEventListener('click', handleClick);
      };
    });
    
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    overlay?.addEventListener('click', closeAllDropdowns);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
       overlay?.removeEventListener('click', closeAllDropdowns);
    };
  }, []);
  
  const openProfileDialog = (user: ChatUser, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedUser(user);
      setIsProfileDialogOpen(true);
  }

  return (
      <div ref={appContainerRef}>
        <div className="dropdown-overlay"></div>
        {/* Chat List Section */}
        <section className="chat-list-container glass">
          <div className="app-header">
            <Link href="/admin">
                <div className="logo">
                <i className="fas fa-comment-dots"></i>
                <span>LuminaChat</span>
                </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="dropdown" id="new-chat-dropdown">
                <div className="action-btn new-chat-btn">
                  <i className="fas fa-plus"></i>
                </div>
                <div className="dropdown-menu glass">
                  <div className="dropdown-item">
                    <i className="fas fa-user-plus"></i>
                    <span>New Contact</span>
                  </div>
                  <Link href="/chat/new-group">
                    <div className="dropdown-item">
                      <i className="fas fa-users"></i>
                      <span>New Group</span>
                    </div>
                  </Link>
                   <div className="dropdown-item">
                    <i className="fas fa-bullhorn"></i>
                    <span>New Community</span>
                  </div>
                </div>
              </div>
              <div className="dropdown" id="profile-dropdown">
                <div className="action-btn" id="profile-btn">
                  <i className="fas fa-user"></i>
                </div>
                <div className="dropdown-menu glass">
                  <div className="dropdown-item">
                    <i className="fas fa-user-circle"></i>
                    <span>Profile</span>
                  </div>
                   <Link href="/settings">
                    <div className="dropdown-item">
                      <i className="fas fa-cog"></i>
                      <span>Settings</span>
                    </div>
                  </Link>
                  <div className="dropdown-item">
                    <i className="fas fa-moon"></i>
                    <span>Appearance</span>
                  </div>
                   <div className="dropdown-item">
                    <i className="fas fa-question-circle"></i>
                    <span>Help</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="search-bar glass">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search conversations..." />
          </div>

          <div className="chat-list">
            {initialChatUsers.map((user) => (
              <Link href={`/chat/${user.id}`} key={user.id}>
                <div className={`chat-item ${user.id === '1' ? 'active' : ''}`}>
                  <button onClick={(e) => openProfileDialog(user, e)} className="relative">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="avatar"
                    />
                  </button>
                  <div className="chat-details">
                    <div className="chat-name">{user.name}</div>
                    <div className="last-message">
                      {user.lastMessage}
                    </div>
                  </div>
                  <div className="chat-meta">
                    <div className="timestamp">{user.lastSeen}</div>
                    {user.unread && <div className="unread-count">{user.unread}</div>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {selectedUser && (
            <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                <DialogContent className="glass text-white max-w-sm p-0 border-0">
                    <div className="relative">
                       <Image src={selectedUser.avatar.replace("150", "400")} alt={selectedUser.name} width={400} height={400} className="w-full h-auto object-cover rounded-t-lg" />
                       <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                       </div>
                    </div>
                    <div className="p-4 flex justify-around glass border-t-0 rounded-t-none">
                        <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-white/80 hover:text-white">
                            <MessageSquare />
                            <span>Message</span>
                        </Button>
                        <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-white/80 hover:text-white">
                            <Phone />
                            <span>Call</span>
                        </Button>
                        <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-white/80 hover:text-white">
                            <Info />
                            <span>Info</span>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )}
      </div>
  );
}
