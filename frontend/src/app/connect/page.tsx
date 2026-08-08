"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ConnectGmailPage() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/gmail/status`)
      .then((response) => response.json())
      .then((data) => setConnected(Boolean(data.connected)))
      .catch(() => setMessage("The backend is not running. Start it on port 8000, then reload."))
      .finally(() => setLoading(false));
  }, []);

  async function connectGmail() {
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/auth/google/login`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Could not start Google sign-in.");
      window.location.assign(data.auth_url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not start Google sign-in.");
    }
  }

  async function syncInbox() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/sync/gmail`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Inbox sync failed.");
      setMessage(`Done — imported ${data.synced_transactions} transactions and skipped ${data.skipped_duplicates} duplicates.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Inbox sync failed.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="min-h-screen bg-[#111714] px-6 py-20 text-[#f5f1e8]">
    <section className="mx-auto max-w-2xl rounded-3xl border border-[#304237] bg-[#17211c] p-8 md:p-12">
      <p className="font-mono text-xs tracking-[.2em] text-[#77ffbd]">MONEY LORE / INBOX IMPORT</p>
      <h1 className="mt-5 font-serif text-5xl">Turn receipts into your spending history.</h1>
      <p className="mt-5 leading-7 text-[#b8c2b9]">Google opens its own consent screen. Money Lore never sees or stores your Gmail password; it receives read-only permission only after you approve it.</p>
      <div className="mt-9 rounded-2xl bg-[#0e1410] p-5 text-sm">
        {loading ? "Checking your Gmail connection…" : connected ? "Gmail connected — ready to scan receipts, invoices, and payment notifications." : "No Gmail account connected yet."}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {!connected && <button onClick={connectGmail} disabled={loading} className="rounded-full bg-[#ff4fd8] px-6 py-3 font-mono text-xs font-bold text-black disabled:opacity-50">CONNECT GMAIL</button>}
        {connected && <button onClick={syncInbox} disabled={loading} className="rounded-full bg-[#77ffbd] px-6 py-3 font-mono text-xs font-bold text-black disabled:opacity-50">SYNC TRANSACTION EMAILS</button>}
        <Link href="/dashboard" className="rounded-full border border-[#58705d] px-6 py-3 font-mono text-xs font-bold">OPEN DASHBOARD</Link>
      </div>
      {message && <p className="mt-5 rounded-xl bg-[#26342b] p-4 text-sm text-[#e4eee5]">{message}</p>}
      <Link href="/" className="mt-8 inline-block text-sm text-[#77ffbd] underline">← Back to Money Lore</Link>
    </section>
  </main>;
}
