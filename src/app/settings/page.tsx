
'use client';
import Link from "next/link";
import React, { useState, useRef } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Bell, Lock, Palette, MessageSquare, Database, Info, LogOut, ChevronRight, Camera, ShieldCheck, Smartphone, Type, Image as ImageIcon, HardDrive, Signal, HelpCircle } from "lucide-react";

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=3");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const settingsGroups = [
    {
      title: "Account",
      icon: <User className="w-5 h-5 text-primary" />,
      items: [
        { href: "/settings/privacy", icon: <Lock className="w-5 h-5" />, title: "Privacy", description: "Manage who can see your information" },
        { href: "/settings/security", icon: <ShieldCheck className="w-5 h-5" />, title: "Security", description: "Manage security notifications" },
        { href: "/settings/change-number", icon: <Smartphone className="w-5 h-5" />, title: "Change Number", description: "Migrate to a new phone number" },
      ]
    },
    {
      title: "Appearance",
      icon: <Palette className="w-5 h-5 text-primary" />,
      items: [
        { href: "/settings/theme", icon: <Palette className="w-5 h-5" />, title: "Theme", description: "Customize the app's look and feel" },
        { href: "/settings/wallpaper", icon: <ImageIcon className="w-5 h-5" />, title: "Wallpaper", description: "Choose your chat background" },
        { href: "/settings/font", icon: <Type className="w-5 h-5" />, title: "Font", description: "Change the application font" },
      ]
    },
    {
        title: "Data and Storage",
        icon: <Database className="w-5 h-5 text-primary" />,
        items: [
          { href: "/settings/storage", icon: <HardDrive className="w-5 h-5" />, title: "Storage Usage", description: "View and manage storage" },
          { href: "/settings/network", icon: <Signal className="w-5 h-5" />, title: "Network Usage", description: "Track your data consumption" },
        ]
    },
    {
        title: "Help",
        icon: <Info className="w-5 h-5 text-primary" />,
        items: [
            { href: "/settings/help-center", icon: <HelpCircle className="w-5 h-5" />, title: "Help Center", description: "Get support and read FAQs" },
            { href: "/settings/app-info", icon: <Info className="w-5 h-5" />, title: "App Info", description: "View app version and licenses" },
        ]
    }
  ];

  return (
    <section className="chat-area-container glass">
        <div className="chat-header border-b border-glass-border pb-4 mb-0">
            <Link href="/chat" className="action-btn text-white">
                <ArrowLeft />
            </Link>
            <div className="chat-title">
                <div className="chat-name text-xl font-bold">Settings</div>
            </div>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
            <div className="flex items-center gap-4 p-4 rounded-lg">
                <div className="relative cursor-pointer" onClick={handleImageClick}>
                  <Image src={profileImage} alt="Profile" width={80} height={80} className="w-20 h-20 rounded-full border-2 border-primary object-cover" />
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-2 border-darker">
                      <Camera className="w-4 h-4 text-white" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <div>
                    <h3 className="font-bold text-2xl">John Doe</h3>
                    <p className="text-sm opacity-80">Your personal motto or status here.</p>
                </div>
            </div>

            {settingsGroups.map((group) => (
            <Card key={group.title} className="glass border-glass-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        {group.icon}
                        <span className="text-lg">{group.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-glass-border">
                        {group.items.map(item => (
                            <Link href={item.href} key={item.title}>
                                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors duration-200">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white/10 rounded-lg">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-sm text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
            ))}

             <div className="pt-4">
                <Button variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    </section>
  );
}
