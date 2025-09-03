
'use client';
import Link from "next/link";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  const [lastSeen, setLastSeen] = React.useState("everyone");
  const [profilePhoto, setProfilePhoto] = React.useState("everyone");
  const [about, setAbout] = React.useState("everyone");
  const [readReceipts, setReadReceipts] = React.useState(true);

  const privacyOptions = [
    {
      id: "lastSeen",
      label: "Last Seen & Online",
      value: lastSeen,
      onValueChange: setLastSeen,
    },
    {
      id: "profilePhoto",
      label: "Profile Photo",
      value: profilePhoto,
      onValueChange: setProfilePhoto,
    },
    {
      id: "about",
      label: "About",
      value: about,
      onValueChange: setAbout,
    }
  ]

  return (
    <section className="chat-area-container glass">
        <div className="chat-header border-b border-glass-border pb-4 mb-0">
            <Link href="/settings" className="action-btn text-white">
                <ArrowLeft />
            </Link>
            <div className="chat-title">
                <div className="chat-name text-xl font-bold">Privacy</div>
            </div>
        </div>
        <div className="p-4 space-y-6 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Who can see my personal info</h3>
                    <p className="text-xs text-gray-400 mb-4">If you don't share your Last Seen & Online, you won't be able to see other people's Last Seen & Online.</p>
                    
                    <div className="divide-y divide-glass-border">
                        {privacyOptions.map(option => (
                             <div key={option.id} className="flex items-center justify-between py-4">
                                <label className="text-base">{option.label}</label>
                                <Select value={option.value} onValueChange={option.onValueChange}>
                                    <SelectTrigger className="w-[180px] glass">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="glass">
                                        <SelectItem value="everyone">Everyone</SelectItem>
                                        <SelectItem value="my-contacts">My Contacts</SelectItem>
                                        <SelectItem value="nobody">Nobody</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-glass-border my-6"></div>

                <div>
                    <div className="flex items-center justify-between">
                        <div>
                            <label htmlFor="read-receipts" className="text-base font-medium">Read Receipts</label>
                             <p className="text-xs text-gray-400 mt-1 max-w-md">If turned off, you won't send or receive Read Receipts. Read receipts are always sent for group chats.</p>
                        </div>
                        <Switch id="read-receipts" checked={readReceipts} onCheckedChange={setReadReceipts} />
                    </div>
                </div>

                 <div className="border-t border-glass-border my-6"></div>

                 <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Advanced</h3>
                     <div className="space-y-2">
                        <div className="setting-item">
                            <i className="fas fa-user-friends"></i>
                            <div>
                                <p>Groups</p>
                                <p className="text-xs text-gray-400">Manage group settings</p>
                            </div>
                        </div>
                        <div className="setting-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <p>Live Location</p>
                                <p className="text-xs text-gray-400">Manage live location settings</p>
                            </div>
                        </div>
                         <div className="setting-item">
                            <i className="fas fa-user-slash"></i>
                            <div>
                                <p>Blocked Contacts</p>
                                <p className="text-xs text-gray-400">3 contacts blocked</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
         <style jsx>{`
            .setting-item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 12px;
                cursor: pointer;
                border-radius: 10px;
                transition: background-color 0.3s ease;
            }
            .setting-item:hover {
                background-color: var(--glass-bg);
            }
            .setting-item i {
                color: var(--accent);
                width: 20px;
                text-align: center;
            }
        `}</style>
    </section>
  );
}
