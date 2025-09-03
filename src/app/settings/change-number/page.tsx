
import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

export default function ChangeNumberPage() {
  return (
    <section className="chat-area-container glass">
        <div className="chat-header border-b border-glass-border pb-4 mb-0">
            <Link href="/settings" className="action-btn text-white">
                <ArrowLeft />
            </Link>
            <div className="chat-title">
                <div className="chat-name text-xl font-bold">Change Number</div>
            </div>
        </div>
        <div className="p-4 space-y-6 overflow-y-auto" style={{maxHeight: 'calc(100vh - 80px)'}}>
            <p>Change number options will be here.</p>
        </div>
    </section>
  );
}
