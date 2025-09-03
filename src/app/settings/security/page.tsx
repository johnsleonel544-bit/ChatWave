
'use client';
import Link from "next/link";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

export default function SecurityPage() {
    const [securityNotifications, setSecurityNotifications] = React.useState(false);

  return (
    <section className="chat-area-container glass">
        <div className="chat-header border-b border-glass-border pb-4 mb-0">
            <Link href="/settings" className="action-btn text-white">
                <ArrowLeft />
            </Link>
            <div className="chat-title">
                <div className="chat-name text-xl font-bold">Security</div>
            </div>
        </div>
        <div className="p-4 space-y-8 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
            <div className="text-center p-4">
                <Shield className="mx-auto text-5xl text-primary mb-4 h-20 w-20" strokeWidth={1} />
                <p className="text-gray-300">Your chats and calls are private. End-to-end encryption keeps your personal messages between you and the people you choose. Not even LuminaChat can read or listen to them.</p>
            </div>

            <div className="border-t border-glass-border my-6"></div>

            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <label htmlFor="security-notifications" className="text-base font-medium">Show security notifications</label>
                         <p className="text-xs text-gray-400 mt-1 max-w-md">Get notified when your security code changes for a contact's phone. If you have multiple devices, this setting must be enabled on each device where you want to get notifications.</p>
                    </div>
                    <Switch id="security-notifications" checked={securityNotifications} onCheckedChange={setSecurityNotifications} />
                </div>
            </div>

            <div className="border-t border-glass-border my-6"></div>

            <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Two-Step Verification</h3>
                <p className="text-gray-300 mb-4">For added security, enable two-step verification to require a PIN when registering your phone number with LuminaChat again.</p>
                <Button className="w-full bg-primary hover:bg-primary/90">Enable</Button>
            </div>
        </div>
    </section>
  );
}
