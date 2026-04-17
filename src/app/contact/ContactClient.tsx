"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface ContactProps {
  email: string;
  phone: string;
  location: string;
}

export default function ContactClient({ email, phone, location }: ContactProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    { id: "email", icon: Mail, label: "Email me", value: email, href: `mailto:${email}` },
    { id: "phone", icon: Phone, label: "Call me", value: phone, href: `tel:${phone}` },
    { id: "location", icon: MapPin, label: "My location", value: location, href: null },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex-1">
      <div className="text-center md:text-left mb-16 relative flex flex-col md:flex-row justify-between items-start md:items-end">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
           className="order-2 md:order-1 mt-8 md:mt-0"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Get in touch
          </h2>
          <p className="text-gray-500 font-medium max-w-sm mx-auto md:mx-0">
            Have questions or ready to build modern, high-performance web applications?
          </p>
        </motion.div>
        
        <h1 className="order-1 md:order-2 text-6xl md:text-[8rem] font-bold text-white/[0.03] uppercase tracking-tighter self-end select-none">
          CONTACT
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left Column - Contact Methods */}
        <div className="lg:col-span-5 space-y-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const CardWrap = method.href ? 'a' : 'div';
            
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <CardWrap 
                  // @ts-ignore
                  href={method.href}
                  className="group flex items-center justify-between p-6 rounded-2xl bg-[#1C1C1A] border border-white/5 hover:border-white/10 hover:bg-[#252522] transition-all duration-300 block"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-black/50 border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-[color:var(--color-lime-accent)] group-hover:border-[color:var(--color-lime-accent)]/30 transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{method.label}</p>
                      <p className="text-sm font-medium text-gray-400">{method.value}</p>
                    </div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 group-hover:text-black group-hover:bg-[color:var(--color-lime-accent)] transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight size={18} />
                  </div>
                </CardWrap>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column - Contact Form */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="bg-[#1C1C1A] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Name" 
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-[#121212] border border-white/5 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[color:var(--color-lime-accent)]/50 focus:ring-1 focus:ring-[color:var(--color-lime-accent)]/50 transition-all font-medium placeholder:text-gray-600"
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  required
                  placeholder="Email" 
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-[#121212] border border-white/5 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[color:var(--color-lime-accent)]/50 focus:ring-1 focus:ring-[color:var(--color-lime-accent)]/50 transition-all font-medium placeholder:text-gray-600"
                />
              </div>

              <div>
                <textarea 
                  required
                  rows={6}
                  placeholder="Message" 
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full bg-[#121212] border border-white/5 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[color:var(--color-lime-accent)]/50 focus:ring-1 focus:ring-[color:var(--color-lime-accent)]/50 transition-all font-medium placeholder:text-gray-600 resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[color:var(--color-lime-accent)] hover:bg-[#b3e600] text-black font-bold text-base py-4 rounded-xl transition-all duration-300 disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
