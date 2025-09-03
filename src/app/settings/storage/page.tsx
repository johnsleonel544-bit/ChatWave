
'use client';
import Link from "next/link";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StoragePage() {

    const storageData = [
        { name: 'Photos', size: 2.5, color: 'bg-blue-500' },
        { name: 'Videos', size: 5.1, color: 'bg-purple-500' },
        { name: 'Documents', size: 1.2, color: 'bg-green-500' },
        { name: 'Audio', size: 0.8, color: 'bg-yellow-500' },
        { name: 'Other', size: 0.4, color: 'bg-gray-500' },
    ];

    const totalStorage = 10.0;
    const usedStorage = storageData.reduce((acc, item) => acc + item.size, 0);

  return (
    <section className="chat-area-container glass">
        <div className="chat-header border-b border-glass-border pb-4 mb-0">
            <Link href="/settings" className="action-btn text-white">
                <ArrowLeft />
            </Link>
            <div className="chat-title">
                <div className="chat-name text-xl font-bold">Storage Usage</div>
            </div>
        </div>
        <div className="p-4 space-y-6 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
           <div className="space-y-6">
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="text-lg font-bold">{usedStorage.toFixed(1)} GB Used</h3>
                        <p className="text-sm text-gray-400">of {totalStorage.toFixed(1)} GB</p>
                    </div>
                    <Progress value={(usedStorage / totalStorage) * 100} className="h-3" />
                </div>

                <div className="space-y-4">
                    {storageData.map(item => (
                        <div key={item.name}>
                            <div className="flex justify-between text-sm mb-1">
                                <span>{item.name}</span>
                                <span>{item.size} GB</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.size / usedStorage) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-glass-border pt-6">
                    <Button variant="destructive" className="w-full">
                        Clear Cache
                    </Button>
                </div>

                <div>
                    <h4 className="text-base font-semibold mb-2 text-primary">Manage Storage by Chat</h4>
                    <div className="space-y-3">
                        {/* Placeholder for chat list */}
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                            <span>Sarah Johnson</span>
                            <span>1.2 GB</span>
                        </div>
                         <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                            <span>Design Team</span>
                            <span>850 MB</span>
                        </div>
                         <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                            <span>Alex Rivera</span>
                            <span>400 MB</span>
                        </div>
                    </div>
                </div>

           </div>
        </div>
    </section>
  );
}
