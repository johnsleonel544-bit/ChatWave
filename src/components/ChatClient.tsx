
'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, FileText, Mic, Send, Trash2, Play, Pause, Check, CheckCheck } from 'lucide-react';


type MessageStatus = 'sent' | 'delivered' | 'read';

interface Message {
    sender: string;
    content: string;
    time: string;
    type: 'incoming' | 'outgoing';
    status?: MessageStatus;
    messageType?: 'text' | 'image' | 'audio' | 'document';
    fileInfo?: { name: string; size: string; };
}

const initialChatData: { [key: string]: any } = {
  '1': {
    name: 'Sarah Johnson',
    type: 'private',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'last seen today at 10:24 AM',
    messages: [
      { sender: 'Sarah Johnson', content: 'Hey there! How\'s it going?', time: '10:15 AM', type: 'incoming', messageType: 'text' },
      { sender: 'You', content: 'Pretty good! Just finished that project I was working on.', time: '10:18 AM', type: 'outgoing', messageType: 'text', status: 'read' },
      { sender: 'Sarah Johnson', content: 'That\'s great to hear! By the way, are we still meeting tomorrow for coffee?', time: '10:20 AM', type: 'incoming', messageType: 'text' },
      { sender: 'You', content: 'Absolutely! 10 AM at our usual place?', time: '10:21 AM', type: 'outgoing', messageType: 'text', status: 'delivered' },
      { sender: 'Sarah Johnson', content: 'Perfect! I\'ll see you then. I have some exciting news to share with you!', time: '10:23 AM', type: 'incoming', messageType: 'text' },
      { sender: 'You', content: 'Now you\'ve got me curious! Can\'t wait to hear it 😊', time: '10:24 AM', type: 'outgoing', messageType: 'text', status: 'sent' },
    ],
  },
  '2': {
    name: 'Design Team',
    type: 'group',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: '5 members, 3 online',
    messages: [
      { sender: 'Michael', content: 'Hey team, I\'ve finished the UI mockups for the new feature.', time: '8:10 PM', type: 'incoming', messageType: 'text' },
      { sender: 'You', content: 'Great! I\'ll take a look and give some feedback.', time: '8:12 PM', type: 'outgoing', messageType: 'text', status: 'read' },
      { sender: 'Jessica', content: 'Looks awesome, Michael! Great work.', time: '8:15 PM', type: 'incoming', messageType: 'text' },
    ],
  },
    '3': {
    name: 'Alex Rivera',
    type: 'private',
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'last seen Wednesday',
    messages: [
      { sender: 'Alex Rivera', content: 'The project deadline has been moved up', time: 'Wed 3:30 PM', type: 'incoming', messageType: 'text' },
    ]
  },
    '4': {
    name: 'Mom',
    type: 'private',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'last seen Monday',
     messages: [
      { sender: 'Mom', content: 'Don\'t forget to call me this weekend', time: 'Mon 1:00 PM', type: 'incoming', messageType: 'text' },
    ]
  },
    '5': {
    name: 'David Wilson',
    type: 'private',
    avatar: 'https://i.pravatar.cc/150?img=47',
    status: 'last seen Sep 12',
     messages: [
        { sender: 'David Wilson', content: 'The concert was amazing!', time: 'Sep 12 9:00 PM', type: 'incoming', messageType: 'text' },
    ]
  }
};

const MessageStatusIndicator = ({ status }: { status?: MessageStatus }) => {
    if (!status) return null;

    const iconProps = {
        className: `inline-block w-4 h-4 ml-1 ${status === 'read' ? 'text-primary' : 'text-gray-200'}`,
        strokeWidth: 2.5
    };

    if (status === 'sent') {
        return <Check {...iconProps} />;
    }
    if (status === 'delivered' || status === 'read') {
        return <CheckCheck {...iconProps} />;
    }
    return null;
};

export default function ChatClient({ id }: { id: string }) {
  const appContainerRef = useRef<HTMLDivElement>(null);
  const chatInfo = useMemo(() => initialChatData[id] || initialChatData['1'], [id]);
  const [messages, setMessages] = useState<Message[]>(chatInfo.messages);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);


  useEffect(() => {
    setMessages(chatInfo.messages);
  }, [chatInfo]);
  
  useEffect(() => {
    if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (newMessage: Omit<Message, 'time' | 'type' | 'sender'>) => {
    const message: Message = {
      ...newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'outgoing',
      sender: 'You',
      status: 'sent'
    };
    setMessages(prev => [...prev, message]);

    // Simulate status updates
    setTimeout(() => {
        setMessages(prev => prev.map(m => m === message ? { ...m, status: 'delivered' } : m));
    }, 1000);
     setTimeout(() => {
        setMessages(prev => prev.map(m => m === message ? { ...m, status: 'read' } : m));
    }, 2500);
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'document') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'image') {
          addMessage({
            content: reader.result as string,
            messageType: 'image',
            fileInfo: { name: file.name, size: `${(file.size / 1024).toFixed(2)} KB` },
          });
        } else {
          addMessage({
            content: reader.result as string,
            messageType: 'document',
            fileInfo: { name: file.name, size: `${(file.size / 1024).toFixed(2)} KB` },
          });
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };
  
  const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            setAudioBlob(blob);
            setAudioUrl(URL.createObjectURL(blob));
        };
        
        mediaRecorder.start();
        setIsRecording(true);
    } catch (err) {
        console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
  };
  
  const sendVoiceMessage = () => {
    if (audioBlob && audioUrl) {
      addMessage({
          content: audioUrl,
          messageType: 'audio',
          fileInfo: { name: 'Voice message', size: `${(audioBlob.size / 1024).toFixed(2)} KB` },
      });
    }
    resetRecording();
    setIsRecordingDialogOpen(false);
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setIsRecording(false);
    setCurrentTime(0);
    setDuration(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    
    audio.onended = () => setIsPlaying(false);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
  };


  useEffect(() => {
    const appRef = appContainerRef.current;
    if (!appRef) return;
    const dropdowns = appRef.querySelectorAll<HTMLDivElement>('.dropdown');
    dropdowns?.forEach((dropdown) => {
      const button = dropdown.querySelector<HTMLDivElement>('.action-btn');

      const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');

        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });
      };
      button?.addEventListener('click', handleClick);

      return () => {
        button?.removeEventListener('click', handleClick);
      };
    });

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        dropdowns?.forEach((dropdown) => {
          dropdown.classList.remove('active');
        });
      }
    };
    document.addEventListener('click', handleDocumentClick);

    const messageInput = appRef.querySelector<HTMLInputElement>('.message-input');
    const sendButton = appRef.querySelector<HTMLDivElement>('.send-btn');
    
    const sendMessage = () => {
      if (!messageInput) return;
      const message = messageInput.value.trim();
      if (message) {
        addMessage({ content: message, messageType: 'text' });
        messageInput.value = '';
      }
    };

    sendButton?.addEventListener('click', sendMessage);
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };
    messageInput?.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      sendButton?.removeEventListener('click', sendMessage);
      messageInput?.removeEventListener('keypress', handleKeyPress);
    };
  }, [id, chatInfo]);

  const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderMessageContent = (msg: Message) => {
    switch (msg.messageType) {
      case 'image':
        return <Image src={msg.content} alt={msg.fileInfo?.name || 'Sent image'} width={300} height={300} className="rounded-lg max-w-xs cursor-pointer" />;
      case 'audio':
        return (
          <div className="flex items-center gap-2">
            <audio src={msg.content} controls className="hidden" />
            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full"><i className="fas fa-play"></i></Button>
            <div className="flex-1">
                <div className="w-full h-1 bg-gray-500 rounded-full">
                    <div className="h-1 bg-primary rounded-full" style={{ width: '30%' }}></div>
                </div>
            </div>
             <span className="text-xs opacity-70">0:12</span>
          </div>
        );
      case 'document':
        return (
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                    <p className="font-semibold truncate max-w-[150px]">{msg.fileInfo?.name}</p>
                    <p className="text-xs opacity-70">{msg.fileInfo?.size}</p>
                </div>
            </div>
        );
      default:
        return <div className="message-content">{msg.content}</div>;
    }
  };

  return (
    <>
      <div className="liquid-glass-effect lg-1"></div>
      <div className="liquid-glass-effect lg-2"></div>

      <div className="app-container chat-page-container" ref={appContainerRef}>
        <div className="chat-area-container glass">
        <section className="chat-area">
          <div className="chat-header">
            <Link href="/chat" className="action-btn" style={{
                marginRight: '15px',
                color: 'white',
            }}>
                <i className="fas fa-arrow-left"></i>
            </Link>
            <img
              src={chatInfo.avatar}
              alt="Avatar"
              className="avatar"
            />
            <div className="chat-title">
              <div className="chat-name">{chatInfo.name}</div>
              <div className="status">{chatInfo.status}</div>
            </div>
            <div className="chat-actions">
              <div className="action-btn">
                <i className="fas fa-phone"></i>
              </div>
              <div className="action-btn">
                <i className="fas fa-video"></i>
              </div>
              <div className="dropdown" id="chat-dropdown">
                <div className="action-btn" id="chat-menu-btn">
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className="dropdown-menu glass">
                  <div className="dropdown-item">
                    <i className="fas fa-user-circle"></i>
                    <span>View Contact</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-photo-video"></i>
                    <span>Media, Links, and Docs</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-search"></i>
                    <span>Search</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-bell-slash"></i>
                    <span>Mute Notifications</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-magic"></i>
                    <span>Disappearing Messages</span>
                  </div>
                   <div className="dropdown-item">
                    <i className="fas fa-palette"></i>
                    <span>Wallpaper</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-user-plus"></i>
                    <span>Add to Contacts</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-file-export"></i>
                    <span>Export Chat</span>
                  </div>
                   <div className="dropdown-item">
                    <i className="fas fa-thumbtack"></i>
                    <span>Pin Chat</span>
                  </div>
                   <div className="dropdown-item">
                    <i className="fas fa-external-link-square-alt"></i>
                    <span>Add Shortcut</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-trash"></i>
                    <span>Clear Chat</span>
                  </div>
                  <div className="dropdown-item">
                    <i className="fas fa-ban"></i>
                    <span>Block</span>
                  </div>
                   <div className="dropdown-item">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>Report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="messages-container" ref={messagesContainerRef}>
            {messages.map((msg: Message, index: number) => (
              <div key={index} className={`message ${msg.type}`}>
                {chatInfo.type === 'group' && msg.type === 'incoming' && (
                  <div className="message-sender">{msg.sender}</div>
                )}
                <div className="message-bubble">
                  {renderMessageContent(msg)}
                  <div className="message-time">
                    {msg.time}
                    {msg.type === 'outgoing' && <MessageStatusIndicator status={msg.status} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="message-input-container glass">
             <Popover>
                <PopoverTrigger asChild>
                    <div className="attachment-btn">
                      <i className="fas fa-paperclip"></i>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2 glass text-white border-glass-border">
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => imageInputRef.current?.click()}>
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Image/Video
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => docInputRef.current?.click()}>
                            <FileText className="mr-2 h-4 w-4" />
                            Document
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => setIsRecordingDialogOpen(true)}>
                            <Mic className="mr-2 h-4 w-4" />
                            Voice Message
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            <input
              type="text"
              className="message-input"
              placeholder="Type a message..."
            />
            <div className="emoji-btn">
              <i className="far fa-smile"></i>
            </div>
            <div className="send-btn">
              <i className="fas fa-paper-plane"></i>
            </div>
          </div>
        </section>
        </div>
      </div>
      
       <input type="file" ref={imageInputRef} className="hidden" accept="image/*,video/*" onChange={(e) => handleFileSelect(e, 'image')} />
       <input type="file" ref={docInputRef} className="hidden" accept=".pdf,.doc,.docx,.txt,.ppt,.pptx" onChange={(e) => handleFileSelect(e, 'document')} />

        <Dialog open={isRecordingDialogOpen} onOpenChange={setIsRecordingDialogOpen}>
            <DialogContent className="glass text-white">
                <DialogHeader>
                    <DialogTitle>Record Voice Message</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                   {audioUrl && !isRecording && (
                       <div className="w-full flex items-center gap-2">
                           <audio ref={audioRef} src={audioUrl} className="hidden" onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)} />
                           <Button onClick={togglePlayPause} variant="outline" size="icon" className="rounded-full h-12 w-12">
                               {isPlaying ? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>}
                           </Button>
                           <div className="flex-1 bg-white/20 h-1 rounded-full">
                               <div className="bg-primary h-1 rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                           </div>
                           <span className="text-xs">{formatTime(duration - currentTime)}</span>
                       </div>
                   )}

                    {!audioUrl && (
                        <Button
                            size="icon"
                            className={`h-20 w-20 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary'}`}
                            onClick={isRecording ? stopRecording : startRecording}
                        >
                           <Mic className="h-8 w-8" />
                        </Button>
                    )}
                    <p className="text-sm text-gray-400">
                      {isRecording ? "Recording..." : (audioBlob ? "Preview" : "Tap to record")}
                    </p>
                </div>
                <DialogFooter className="flex items-center justify-between w-full">
                    {audioBlob && (
                         <Button variant="ghost" size="icon" onClick={resetRecording}>
                            <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                    )}
                    <div className="flex-grow"></div>
                    <Button variant="outline" onClick={() => setIsRecordingDialogOpen(false)}>Cancel</Button>
                    <Button onClick={sendVoiceMessage} disabled={!audioBlob} className="bg-primary hover:bg-primary/90">
                        <Send className="mr-2 h-4 w-4" /> Send
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
