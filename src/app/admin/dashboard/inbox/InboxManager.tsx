"use client";

import { useState, useTransition } from "react";
import { markMessageRead, deleteMessage, bulkMarkRead, bulkDelete } from "@/app/actions/messages";
import { Trash2, CheckCircle, Mail, MailOpen } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export default function InboxManager({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const toggleSelect = (id: string) => {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
  };

  const toggleSelectAll = () => {
    if (selected.size === messages.length) setSelected(new Set());
    else setSelected(new Set(messages.map(m => m.id)));
  };

  const handleMarkRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    startTransition(async () => await markMessageRead(id));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this message?")) return;
    setMessages(prev => prev.filter(m => m.id !== id));
    selected.delete(id);
    setSelected(new Set(selected));
    startTransition(async () => await deleteMessage(id));
  };

  const handleBulkMarkRead = () => {
    const ids = Array.from(selected);
    setMessages(prev => prev.map(m => ids.includes(m.id) ? { ...m, isRead: true } : m));
    startTransition(async () => await bulkMarkRead(ids));
    setSelected(new Set());
  };

  const handleBulkDelete = () => {
    if (!confirm(`Delete ${selected.size} messages?`)) return;
    const ids = Array.from(selected);
    setMessages(prev => prev.filter(m => !ids.includes(m.id)));
    setSelected(new Set());
    startTransition(async () => await bulkDelete(ids));
  };

  if (messages.length === 0) {
    return (
      <div className="bg-[#1C1C1A] rounded-3xl border border-white/5 p-12 text-center shadow-sm">
        <Mail className="mx-auto w-12 h-12 text-gray-600 mb-4" />
        <p className="text-gray-500 font-medium text-sm">Your inbox is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1C1C1A] rounded-3xl border border-white/5 overflow-hidden shadow-sm">
      {/* Bulk actions header */}
      <div className="p-4 border-b border-white/5 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input 
            type="checkbox" 
            checked={messages.length > 0 && selected.size === messages.length}
            onChange={toggleSelectAll}
            className="w-4 h-4 rounded bg-[#1b1e16] border-white/10 text-[color:var(--color-lime-accent)] focus:ring-[color:var(--color-lime-accent)]"
          />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {selected.size} Selected
          </span>
        </div>
        
        {selected.size > 0 && (
          <div className="flex gap-2">
            <button 
              onClick={handleBulkMarkRead} disabled={isPending}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Mark Read
            </button>
            <button 
              onClick={handleBulkDelete} disabled={isPending}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Message List */}
      <div className="divide-y divide-white/5">
        {messages.map(msg => (
          <div key={msg.id} className={`p-4 flex gap-4 transition-colors ${msg.isRead ? 'bg-[#1C1C1A]' : 'bg-[color:var(--color-lime-accent)]/5'}`}>
            <input 
              type="checkbox" 
              checked={selected.has(msg.id)}
              onChange={() => toggleSelect(msg.id)}
              className="mt-1 w-4 h-4 rounded bg-[#1b1e16] border-white/10 text-[color:var(--color-lime-accent)] focus:ring-[color:var(--color-lime-accent)]"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className={`text-sm ${msg.isRead ? 'font-medium text-gray-300' : 'font-bold text-white'}`}>
                    {msg.name}
                  </h4>
                  <p className="text-xs text-gray-500">{msg.email}</p>
                </div>
                <span className="text-[10px] text-gray-500 font-medium">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className={`text-sm mt-3 ${msg.isRead ? 'text-gray-400' : 'text-gray-200 font-medium'}`}>
                {msg.message}
              </p>
              
              <div className="flex gap-3 mt-4">
                {!msg.isRead && (
                  <button 
                    onClick={() => handleMarkRead(msg.id)} 
                    disabled={isPending}
                    className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[color:var(--color-lime-accent)] hover:text-[color:var(--color-lime-accent)]/80"
                  >
                    <CheckCircle className="w-3 h-3" /> Mark Read
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(msg.id)} 
                  disabled={isPending}
                  className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
