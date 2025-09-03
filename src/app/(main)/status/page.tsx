
'use client';
import React, { useState, useRef } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface Status {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  timestamp: string;
  caption?: string;
}

export default function StatusPage() {
  const [myStatus, setMyStatus] = useState<{ image: string; caption: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusImage, setStatusImage] = useState<string | null>(null);
  const [statusCaption, setStatusCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const recentUpdates: Status[] = [
    { id: '1', user: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' }, image: 'https://picsum.photos/id/1018/400/700', timestamp: '15 minutes ago' },
    { id: '2', user: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?img=12' }, image: 'https://picsum.photos/id/1025/400/700', timestamp: '2 hours ago' },
    { id: '3', user: { name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?img=47' }, image: 'https://picsum.photos/id/1040/400/700', timestamp: 'Yesterday' },
  ];

  const handleMyStatusClick = () => {
    if (myStatus) {
      // view own status
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStatusImage(reader.result as string);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostStatus = () => {
    if (statusImage) {
      setMyStatus({ image: statusImage, caption: statusCaption });
    }
    setIsDialogOpen(false);
    setStatusImage(null);
    setStatusCaption('');
  };

  return (
    <>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-white">Status</h1>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-primary uppercase">My Status</h2>
          <div className="flex items-center gap-4 cursor-pointer" onClick={handleMyStatusClick}>
            <div className="relative">
              <Avatar className={`h-14 w-14 border-2 ${myStatus ? 'border-primary' : 'border-dashed border-gray-500'}`}>
                <AvatarImage src={myStatus?.image || "https://i.pravatar.cc/150?img=3"} alt="My Status" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              {!myStatus && (
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                  <Plus className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-white">My Status</p>
              <p className="text-sm text-gray-400">{myStatus ? 'View your update' : 'Tap to add status update'}</p>
            </div>
          </div>
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-primary uppercase">Recent Updates</h2>
          <div className="space-y-3">
            {recentUpdates.map((status) => (
              <div key={status.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Avatar className="h-14 w-14 border-2 border-accent">
                  <AvatarImage src={status.user.avatar} alt={status.user.name} />
                  <AvatarFallback>{status.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-white">{status.user.name}</p>
                  <p className="text-sm text-gray-400">{status.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass text-white">
          <DialogHeader>
            <DialogTitle>Post Status</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {statusImage && (
              <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
                <Image src={statusImage} alt="Status preview" layout="fill" objectFit="cover" />
              </div>
            )}
            <Textarea
              placeholder="Add a caption..."
              value={statusCaption}
              onChange={(e) => setStatusCaption(e.target.value)}
              className="bg-transparent border-gray-600 focus:ring-primary"
            />
          </div>
          <DialogFooter>
              <Button onClick={handlePostStatus} className="bg-primary hover:bg-primary/90">Post</Button>
              <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
              </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
