// "use client";

// import { SignInButton } from "@clerk/nextjs";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-[#E8F0FE] selection:text-[#2E5245]">
//       {/* Navigation */}
//       <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-[#2E5245] flex items-center justify-center">
//             <span className="text-white font-bold text-lg">M</span>
//           </div>
//           <span className="font-semibold text-xl tracking-tight text-[#1A1A1A]">Money Lore</span>
//         </div>
//         <div>
//           <SignInButton mode="modal">
//             <button className="px-5 py-2.5 bg-[#2E5245] hover:bg-[#234236] text-white rounded-full text-sm font-medium transition-all origin-shadow">
//               Log in / Sign up
//             </button>
//           </SignInButton>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main className="max-w-7xl mx-auto px-8 pt-20 pb-32">
//         <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#2E5245] text-xs font-semibold uppercase tracking-wider mb-8">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E5245] opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E5245]"></span>
//             </span>
//             AI Financial Analyst
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1A1A1A] mb-8 leading-[1.1]">
//             Your entire financial life, <span className="text-[#2E5245]">effortlessly tracked by AI.</span>
//           </h1>

//           <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
//             Connect your Gmail and let Money Lore's AI instantly extract, categorize, and analyze your receipts so you never have to manually track spending again.
//           </p>

//           <SignInButton mode="modal">
//             <button className="px-8 py-4 bg-[#1A1A1A] hover:bg-[#000000] text-white rounded-full text-lg font-medium transition-all origin-shadow flex items-center gap-3">
//               Get Started for Free
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M5 12h14"></path>
//                 <path d="m12 5 7 7-7 7"></path>
//               </svg>
//             </button>
//           </SignInButton>
//         </div>

//         {/* Feature Grid */}
//         <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Feature 1 */}
//           <div className="bg-white p-8 rounded-3xl origin-shadow border border-gray-100 flex flex-col items-start transition-transform hover:-translate-y-1 duration-300">
//             <div className="w-12 h-12 rounded-2xl bg-[#E8F0FE] flex items-center justify-center mb-6 text-[#2E5245]">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
//             </div>
//             <h3 className="text-xl font-bold mb-3 text-[#1A1A1A]">Automated Email Sync</h3>
//             <p className="text-gray-500 leading-relaxed">
//               Forget manual entry. Our AI securely reads your receipts directly from Gmail, understanding even the messiest transaction data.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="bg-white p-8 rounded-3xl origin-shadow border border-gray-100 flex flex-col items-start transition-transform hover:-translate-y-1 duration-300">
//             <div className="w-12 h-12 rounded-2xl bg-[#E8F0FE] flex items-center justify-center mb-6 text-[#2E5245]">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
//             </div>
//             <h3 className="text-xl font-bold mb-3 text-[#1A1A1A]">Proactive Savings AI</h3>
//             <p className="text-gray-500 leading-relaxed">
//               More than just a dashboard. Your personal AI analyst spots trends and tells you exactly where you can cut back and save money.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="bg-white p-8 rounded-3xl origin-shadow border border-gray-100 flex flex-col items-start transition-transform hover:-translate-y-1 duration-300">
//             <div className="w-12 h-12 rounded-2xl bg-[#E8F0FE] flex items-center justify-center mb-6 text-[#2E5245]">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
//             </div>
//             <h3 className="text-xl font-bold mb-3 text-[#1A1A1A]">Privacy & Control</h3>
//             <p className="text-gray-500 leading-relaxed">
//               Your data is yours. We use state-of-the-art encryption and never sell your financial lore. You are always in control.
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { SignInButton } from "@clerk/nextjs";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Coffee,
  CreditCard,
  Github,
  Inbox,
  Lock,
  Mail,
  Menu,
  Play,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const transactions = [
  {
    name: "Uber",
    category: "Transport",
    amount: "-₹384",
    icon: "🚕",
  },
  {
    name: "Zepto",
    category: "Groceries",
    amount: "-₹742",
    icon: "🛒",
  },
  {
    name: "Spotify",
    category: "Subscriptions",
    amount: "-₹119",
    icon: "🎧",
  },
  {
    name: "Chai Point",
    category: "Food & Drinks",
    amount: "-₹180",
    icon: "☕",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#11110f] text-[#f5f1e8] selection:bg-[#ff4fd8] selection:text-black">
      {/* Ambient neon */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[10%] top-[8%] h-[400px] w-[400px] rounded-full bg-[#ff3cac]/10 blur-[130px]" />
        <div className="absolute right-[5%] top-[35%] h-[500px] w-[500px] rounded-full bg-[#77ffbd]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[35%] h-[400px] w-[500px] rounded-full bg-[#7c5cff]/10 blur-[150px]" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 rotate-[-4deg] items-center justify-center rounded-lg border border-[#ff4fd8]/40 bg-[#1c1918] text-xl shadow-[0_0_25px_rgba(255,79,216,.15)]">
            ☕
          </div>

          <div>
            <div className="font-mono text-lg font-bold tracking-tight">
              MONEY LORE
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#77736c]">
              your financial diary
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wider text-[#9d9990] md:flex">
          <a href="#how" className="transition hover:text-white">
            How it works
          </a>
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#ai" className="transition hover:text-white">
            AI Tea
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <SignInButton mode="modal">
            <button className="rounded-full px-5 py-2.5 font-mono text-xs text-[#aaa69e] transition hover:text-white">
              LOG IN
            </button>
          </SignInButton>

          <SignInButton mode="modal">
            <button className="rounded-full border border-[#f5f1e8] bg-[#f5f1e8] px-5 py-2.5 font-mono text-xs font-bold text-black transition hover:bg-[#ff4fd8] hover:text-white hover:border-[#ff4fd8]">
              START TRACKING →
            </button>
          </SignInButton>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/10 p-2 md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="relative z-50 mx-6 rounded-2xl border border-white/10 bg-[#1a1917] p-5 md:hidden">
          <div className="flex flex-col gap-5 font-mono text-sm">
            <a href="#how">HOW IT WORKS</a>
            <a href="#features">FEATURES</a>
            <a href="#ai">AI TEA</a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          {/* Left */}
          <div>
            <div className="mb-7 inline-flex -rotate-1 items-center gap-2 border border-[#77ffbd]/40 bg-[#77ffbd]/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#77ffbd] shadow-[0_0_20px_rgba(119,255,189,.08)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#77ffbd]" />
              AI MONEY NOTEBOOK · 01
            </div>

            <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,7.7rem)] font-black leading-[.88] tracking-[-0.07em]">
              WHERE DID <span className="text-[#ff4fd8] [text-shadow:0_0_35px_rgba(255,79,216,.25)]" >MY</span>
              <br />
              <span className="text-[#ff4fd8] [text-shadow:0_0_35px_rgba(255,79,216,.25)]">
                 MONEY   
              </span>
             
              <br />
              GO?
            </h1>

            <div className="mt-8 max-w-xl">
              <p className="font-mono text-sm leading-7 text-[#a6a199] md:text-base">
                Money Lore connects the dots between your receipts,
                subscriptions, Ubers, random Zepto orders and everything in
                between — then lets AI tell you the story behind your
                spending.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <SignInButton mode="modal">
                  <button className="group flex items-center gap-3 rounded-full bg-[#ff4fd8] px-6 py-3.5 font-mono text-xs font-bold text-black shadow-[0_0_30px_rgba(255,79,216,.25)] transition hover:scale-[1.02] hover:bg-[#ff75e2]">
                    OPEN MY MONEY LORE
                    <ArrowUpRight
                      size={16}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </SignInButton>

                <a
                  href="#how"
                  className="flex items-center gap-2 font-mono text-xs text-[#8f8b83] transition hover:text-white"
                >
                  <Play size={13} />
                  SEE HOW IT WORKS
                </a>
              </div>
            </div>
          </div>

          {/* Notebook */}
          <div className="relative">
            {/* neon line */}
            <div className="absolute -right-10 -top-10 h-[120%] w-[110%] rotate-3 rounded-[50%] border border-[#ff4fd8]/20 blur-[1px]" />

            <div className="relative rotate-[1.5deg] overflow-hidden rounded-[3px] border border-[#35322e] bg-[#ebe5d7] p-5 text-[#171614] shadow-[20px_25px_80px_rgba(0,0,0,.45)] md:p-7">
              {/* notebook lines */}
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(#a5c8d5 1px, transparent 1px)",
                    backgroundSize: "100% 30px",
                  }}
                />
              </div>

              {/* margin */}
              <div className="pointer-events-none absolute bottom-0 left-12 top-0 border-l border-[#e98f9b]/50" />

              <div className="relative ml-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[.3em] text-[#777067]">
                      AUGUST 2026
                    </div>
                    <h2 className="mt-2 font-serif text-4xl italic">
                      My money lore.
                    </h2>
                  </div>

                  <div className="-rotate-6 rounded-full border-2 border-[#ff4f9b] px-3 py-1 font-mono text-[9px] font-bold text-[#ff4f9b]">
                    AI VERIFIED ✦
                  </div>
                </div>

                {/* Total */}
                <div className="mt-10 border-b-2 border-[#25221f] pb-5">
                  <div className="font-mono text-[9px] uppercase text-[#777067]">
                    spent so far
                  </div>

                  <div className="mt-1 flex items-end justify-between">
                    <div className="font-mono text-5xl font-black tracking-tight">
                      ₹18,420
                    </div>

                    <div className="mb-1 flex items-center gap-1 font-mono text-[10px] text-[#e84b78]">
                      <TrendingUp size={13} />
                      +12.4%
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative mt-7 h-36">
                  <div className="absolute left-0 top-0 font-mono text-[8px] uppercase text-[#777067]">
                    weekly burn
                  </div>

                  <svg
                    viewBox="0 0 500 130"
                    className="absolute inset-x-0 bottom-0 h-28 w-full overflow-visible"
                  >
                    <path
                      d="M0 105 C55 98, 60 72, 105 82 S150 110, 195 68 S250 80, 290 50 S350 30, 390 62 S440 25, 500 35"
                      fill="none"
                      stroke="#ff4f9f"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    <path
                      d="M0 105 C55 98, 60 72, 105 82 S150 110, 195 68 S250 80, 290 50 S350 30, 390 62 S440 25, 500 35 L500 130 L0 130Z"
                      fill="url(#pinkFade)"
                      opacity=".12"
                    />

                    <defs>
                      <linearGradient
                        id="pinkFade"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop stopColor="#ff4f9f" />
                        <stop offset="1" stopColor="#ff4f9f" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* AI annotation */}
                <div className="relative mt-7 -rotate-1 border-2 border-[#27231f] bg-[#fff6a8] p-4 shadow-[4px_5px_0_#27231f]">
                  <div className="absolute -right-2 -top-3 rotate-6 font-mono text-lg">
                    ✦
                  </div>

                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest">
                    ☕ MONEY TEA
                  </div>

                  <p className="mt-2 font-serif text-lg leading-6">
                    "Bestie... you spent{" "}
                    <span className="font-bold underline">₹2,840</span> on
                    food this week."
                  </p>

                  <p className="mt-2 font-mono text-[9px] leading-4 text-[#5d574e]">
                    That's 31% above your usual. Maybe Swiggy needs a restraining
                    order.
                  </p>
                </div>

                <div className="mt-7 flex justify-between font-mono text-[8px] uppercase text-[#777067]">
                  <span>page 08</span>
                  <span>✎ written by Money Lore AI</span>
                </div>
              </div>
            </div>

            {/* floating scribbles */}
            <div className="absolute -bottom-8 -left-8 rotate-[-8deg] font-serif text-2xl italic text-[#77ffbd]">
              wait... WHERE? ↑
            </div>

            <div className="absolute -right-6 top-1/2 rotate-90 font-mono text-[9px] tracking-[.3em] text-[#ff4fd8]">
              FOLLOW THE MONEY ✦
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-[#171614] py-4">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-10 font-mono text-[10px] uppercase tracking-[.25em] text-[#77736c]">
          <span>✦ Gmail → transactions</span>
          <span>✦ AI → categorization</span>
          <span>✦ Money → understood</span>
          <span>✦ Spending → analyzed</span>
          <span>✦ Savings → optimized</span>
          <span>✦ Gmail → transactions</span>
          <span>✦ AI → categorization</span>
          <span>✦ Money → understood</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="mb-16 grid gap-8 md:grid-cols-[.7fr_1fr]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[.25em] text-[#ff4fd8]">
              01 / THE RECEIPTS
            </div>
            <h2 className="mt-4 max-w-xl text-5xl font-black tracking-[-.05em] md:text-6xl">
              Your inbox is already keeping receipts.
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl font-mono text-sm leading-7 text-[#88847c]">
              Why manually enter every Uber ride and Zepto order? Connect your
              Gmail and Money Lore turns your transaction emails into
              structured financial data.
            </p>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          <FeatureCard
            number="01"
            icon={<Mail size={20} />}
            title="Connect Gmail"
            text="Your receipts and transaction emails become your automatic spending feed."
            color="pink"
          />

          <FeatureCard
            number="02"
            icon={<Sparkles size={20} />}
            title="AI reads the chaos"
            text="Merchant, amount, category and date are extracted and organized automatically."
            color="green"
          />

          <FeatureCard
            number="03"
            icon={<TrendingDown size={20} />}
            title="Find where to save"
            text="Money Lore spots spending patterns and gives you actual, personalized suggestions."
            color="purple"
          />
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section id="features" className="relative z-10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[.3em] text-[#77ffbd]">
              02 / YOUR MONEY, DECODED
            </div>

            <h2 className="mt-4 text-5xl font-black tracking-[-.06em] md:text-7xl">
              Not another boring
              <br />
              <span className="text-[#77ffbd]">expense tracker.</span>
            </h2>
          </div>

          {/* fake app */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#e9e4d9] p-3 shadow-[0_0_100px_rgba(119,255,189,.07)] md:p-5">
            <div className="rounded-2xl border border-[#c9c2b4] bg-[#f4f0e7] p-5 text-[#171614] md:p-8">
              {/* dashboard header */}
              <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#c9c2b4] pb-6">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[.25em] text-[#858077]">
                    MONEY LORE / AUGUST
                  </div>
                  <h3 className="mt-1 font-serif text-3xl italic">
                    Good morning, money nerd.
                  </h3>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#c9c2b4] bg-white/50 px-4 py-2 font-mono text-[10px]">
                  <span className="h-2 w-2 rounded-full bg-[#44c887]" />
                  GMAIL SYNCED
                </div>
              </div>

              {/* stats */}
              <div className="grid gap-4 py-7 sm:grid-cols-3">
                <DashboardStat
                  label="TOTAL SPENT"
                  value="₹18,420"
                  change="+12.4%"
                  negative
                />

                <DashboardStat
                  label="REMAINING"
                  value="₹31,580"
                  change="62% left"
                />

                <DashboardStat
                  label="POTENTIAL SAVINGS"
                  value="₹4,280"
                  change="AI estimate"
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
                {/* chart */}
                <div className="rounded-xl border border-[#c9c2b4] bg-[#eeeadf] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-[#777168]">
                        spending pulse
                      </div>
                      <div className="mt-1 font-serif text-xl italic">
                        This week
                      </div>
                    </div>

                    <div className="font-mono text-[9px] text-[#e84b78]">
                      ↑ 8.2%
                    </div>
                  </div>

                  <div className="mt-8 flex h-48 items-end gap-3">
                    {[38, 62, 46, 83, 55, 72, 44].map((height, i) => (
                      <div
                        key={i}
                        className="group relative flex h-full flex-1 items-end"
                      >
                        <div
                          className={`w-full rounded-t-sm transition-all group-hover:opacity-70 ${i === 3
                            ? "bg-[#ff4fd8]"
                            : "bg-[#25221f]"
                            }`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex justify-between font-mono text-[8px] text-[#777168]">
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                    <span>SUN</span>
                  </div>
                </div>

                {/* category */}
                <div className="rounded-xl border border-[#c9c2b4] bg-[#eeeadf] p-5">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#777168]">
                    where it went
                  </div>

                  <div className="mt-6 space-y-5">
                    <Category
                      name="Food"
                      amount="₹6,840"
                      width="82%"
                      emoji="🍜"
                    />
                    <Category
                      name="Transport"
                      amount="₹3,280"
                      width="48%"
                      emoji="🚕"
                    />
                    <Category
                      name="Shopping"
                      amount="₹2,940"
                      width="42%"
                      emoji="🛍️"
                    />
                    <Category
                      name="Subscriptions"
                      amount="₹1,180"
                      width="21%"
                      emoji="🎧"
                    />
                  </div>
                </div>
              </div>

              {/* transactions */}
              <div className="mt-5 rounded-xl border border-[#c9c2b4] bg-[#eeeadf] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#777168]">
                    latest lore
                  </div>

                  <button className="font-mono text-[9px] underline">
                    VIEW ALL
                  </button>
                </div>

                <div className="grid gap-2">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.name}
                      className="flex items-center justify-between border-b border-[#d7d0c4] py-3 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ded8cb]">
                          {transaction.icon}
                        </div>

                        <div>
                          <div className="font-mono text-xs font-bold">
                            {transaction.name}
                          </div>
                          <div className="font-mono text-[8px] uppercase text-[#858077]">
                            {transaction.category}
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-xs font-bold">
                        {transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Neon annotation */}
            <div className="absolute -right-4 top-24 hidden rotate-3 rounded-sm border-2 border-[#ff4fd8] bg-[#11110f] px-4 py-3 font-mono text-[10px] text-[#ff4fd8] shadow-[0_0_30px_rgba(255,79,216,.25)] md:block">
              THIS IS WHERE
              <br />
              YOUR MONEY GOES ✦
            </div>
          </div>
        </div>
      </section>

      {/* AI TEA */}
      <section id="ai" className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff4fd8]/30 px-3 py-2 font-mono text-[9px] uppercase tracking-[.2em] text-[#ff4fd8]">
              <Coffee size={13} />
              MONEY TEA™
            </div>

            <h2 className="text-5xl font-black tracking-[-.06em] md:text-7xl">
              Your finances
              <br />
              <span className="text-[#ff4fd8]">have lore.</span>
            </h2>

            <p className="mt-7 max-w-lg font-mono text-sm leading-7 text-[#8f8b83]">
              Money Lore doesn't just tell you that you spent money. It tells
              you what the spending says about you — and what you can do about
              it.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Weekly spending breakdowns",
                "Budget allocation suggestions",
                "Personalized savings opportunities",
                "AI-generated spending summaries",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 font-mono text-xs text-[#b4afa6]"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#77ffbd]/40 text-[#77ffbd]">
                    <Check size={11} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* AI note */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#ff4fd8]/10 blur-[100px]" />

            <div className="relative rotate-[-2deg] border border-[#292723] bg-[#ebe5d7] p-7 text-[#171614] shadow-[15px_20px_60px_rgba(0,0,0,.4)]">
              <div className="absolute right-5 top-5 font-mono text-xs text-[#e84b78]">
                08 / 08 / 26
              </div>

              <div className="font-mono text-[9px] uppercase tracking-[.3em] text-[#777067]">
                dear money diary,
              </div>

              <h3 className="mt-8 font-serif text-4xl italic">
                We need to talk.
              </h3>

              <div className="mt-8 space-y-5 font-serif text-lg leading-7">
                <p>
                  You spent <b>₹2,840</b> on food this week.
                </p>

                <p>
                  That's <span className="underline">31% above</span> your
                  average.
                </p>

                <p>
                  At this rate, you could've opened your own{" "}
                  <span className="font-bold text-[#e84b78]">
                    tea + snack empire.
                  </span>
                </p>
              </div>

              <div className="mt-8 border-2 border-[#25221f] bg-[#fff4a3] p-5 shadow-[4px_4px_0_#25221f]">
                <div className="font-mono text-[9px] font-bold uppercase tracking-widest">
                  ✦ AI SUGGESTION
                </div>

                <p className="mt-2 font-mono text-xs leading-5">
                  Reduce food delivery by 20% → estimated monthly savings:
                  <span className="font-bold"> ₹2,100</span>
                </p>
              </div>

              <div className="mt-8 flex justify-between font-mono text-[8px] uppercase text-[#777067]">
                <span>— Money Lore AI</span>
                <span>✎ noted.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 border-t border-white/10 bg-[#0c0c0b] px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            <MiniFeature
              icon={<Inbox />}
              title="Inbox → Insight"
              text="Transaction emails become structured financial events automatically."
            />

            <MiniFeature
              icon={<Sparkles />}
              title="AI-native analysis"
              text="Ask your financial data questions and get answers grounded in your actual spending."
            />

            <MiniFeature
              icon={<Wallet />}
              title="Budget intelligence"
              text="See where your budget is going, what's overspending, and what needs attention."
            />

            <MiniFeature
              icon={<Lock />}
              title="Your money stays yours"
              text="Authentication, controlled access and secure handling for sensitive financial data."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-32 lg:px-10">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#ff4fd8]/30 bg-[#181416] px-6 py-20 text-center shadow-[0_0_80px_rgba(255,79,216,.08)] md:px-16">
          <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 bg-[#ff4fd8] shadow-[0_0_25px_#ff4fd8]" />

          <div className="font-mono text-[9px] uppercase tracking-[.35em] text-[#77736c]">
            ✦ END OF THE MANUAL SPREADSHEET ERA ✦
          </div>

          <h2 className="mx-auto mt-6 max-w-3xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            Let your money
            <br />
            <span className="text-[#ff4fd8]">tell its story.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-mono text-sm leading-6 text-[#88847c]">
            Connect your inbox. Let AI do the boring part. Finally understand
            where your money disappears every month.
          </p>

          <div className="mt-9">
            <SignInButton mode="modal">
              <button className="rounded-full bg-[#f5f1e8] px-7 py-4 font-mono text-xs font-bold text-black transition hover:bg-[#77ffbd]">
                START MY MONEY LORE →
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 font-mono text-[9px] uppercase tracking-widest text-[#66635d] md:flex-row">
          <div>© 2026 MONEY LORE</div>

          <div className="flex gap-6">
            <span>AI FINANCIAL ANALYST</span>
            <span>BUILT WITH ✦</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function FeatureCard({
  number,
  icon,
  title,
  text,
  color,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  color: "pink" | "green" | "purple";
}) {
  const styles = {
    pink: "text-[#ff4fd8]",
    green: "text-[#77ffbd]",
    purple: "text-[#a994ff]",
  };

  return (
    <div className="group bg-[#171614] p-7 transition hover:bg-[#1d1c1a] md:p-9">
      <div className="flex items-center justify-between">
        <div className={styles[color]}>{icon}</div>
        <span className="font-mono text-[9px] text-[#5e5b55]">{number}</span>
      </div>

      <h3 className="mt-14 text-2xl font-bold tracking-tight">{title}</h3>

      <p className="mt-3 font-mono text-xs leading-6 text-[#77736c]">{text}</p>

      <div className="mt-7 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

function MiniFeature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group bg-[#11110f] p-8 md:p-12">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#ff4fd8] transition group-hover:border-[#ff4fd8]/40 group-hover:shadow-[0_0_25px_rgba(255,79,216,.15)]">
        {icon}
      </div>

      <h3 className="mt-8 text-2xl font-bold">{title}</h3>

      <p className="mt-3 max-w-md font-mono text-xs leading-6 text-[#77736c]">
        {text}
      </p>
    </div>
  );
}

function DashboardStat({
  label,
  value,
  change,
  negative,
}: {
  label: string;
  value: string;
  change: string;
  negative?: boolean;
}) {
  return (
    <div className="border-l-2 border-[#c9c2b4] pl-4">
      <div className="font-mono text-[8px] uppercase tracking-widest text-[#777168]">
        {label}
      </div>

      <div className="mt-2 font-mono text-2xl font-black">{value}</div>

      <div
        className={`mt-1 font-mono text-[8px] ${negative ? "text-[#e84b78]" : "text-[#3a9f70]"
          }`}
      >
        {change}
      </div>
    </div>
  );
}

function Category({
  name,
  amount,
  width,
  emoji,
}: {
  name: string;
  amount: string;
  width: string;
  emoji: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between font-mono text-[9px]">
        <span>
          {emoji} {name}
        </span>
        <span>{amount}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-[#d5cfc3]">
        <div
          className="h-full rounded-full bg-[#25221f]"
          style={{ width }}
        />
      </div>
    </div>
  );
}