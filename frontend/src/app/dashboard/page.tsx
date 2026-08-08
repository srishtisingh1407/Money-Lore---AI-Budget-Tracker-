"use client";

import { SignInButton } from "@clerk/nextjs";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Mail,
  MessageSquare,
  PieChart,
  Sparkles,
  TrendingDown,
  Wallet,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#171717] overflow-hidden">

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1D3028] rounded-xl flex items-center justify-center">
            <span className="text-white font-serif text-lg">M</span>
          </div>

          <span className="text-xl font-semibold tracking-tight">
            Money Lore
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#666]">
          <a href="#how-it-works" className="hover:text-black transition">
            How it works
          </a>
          <a href="#features" className="hover:text-black transition">
            Features
          </a>
          <a href="#ai" className="hover:text-black transition">
            Money AI
          </a>
        </div>

        <SignInButton mode="modal">
          <button className="bg-[#1D3028] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#263D33] transition">
            Get started
          </button>
        </SignInButton>
      </nav>


      {/* HERO */}
      <main>

        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28">

          <div className="max-w-4xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E7EEE9] text-[#315344] text-sm mb-7">
              <Sparkles size={15} />
              Your money, finally making sense.
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-[86px] leading-[0.95] tracking-[-0.04em]">
              Where did
              <br />
              <span className="italic text-[#315344]">
                your money go?
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-[#686868] max-w-2xl mx-auto leading-relaxed">
              Connect your email. Let Money Lore find your spending,
              understand your habits, and tell you exactly where you
              can save.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">

              <SignInButton mode="modal">
                <button className="group bg-[#1D3028] text-white px-7 py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-[#263D33] transition">
                  Start tracking for free
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>
              </SignInButton>

              <button className="px-7 py-4 rounded-full border border-[#D8D8D2] bg-white hover:bg-[#F1F1EC] transition font-medium">
                See how it works
              </button>

            </div>

          </div>


          {/* DASHBOARD PREVIEW */}
          <div className="mt-20 md:mt-28 relative">

            <div className="absolute inset-x-20 -top-20 h-64 bg-[#DDE9E1] blur-[100px] opacity-60" />

            <div className="relative rounded-[28px] border border-[#DCDCD6] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden">

              {/* fake browser */}
              <div className="h-12 border-b border-[#EEEEEA] flex items-center px-5 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#DDD]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#DDD]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#DDD]" />

                <div className="mx-auto bg-[#F5F5F1] rounded-full px-6 py-1.5 text-xs text-[#999]">
                  app.moneylore.ai
                </div>
              </div>


              <div className="p-6 md:p-10">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

                  <div>
                    <p className="text-sm text-[#888]">
                      August spending
                    </p>

                    <h2 className="text-4xl md:text-5xl font-semibold mt-2">
                      ₹28,640
                    </h2>

                    <p className="text-sm text-[#777] mt-2">
                      ↓ 12.4% less than last month
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {["Week", "Month", "Year"].map((item, i) => (
                      <button
                        key={item}
                        className={`px-4 py-2 rounded-full text-xs ${i === 1
                          ? "bg-[#1D3028] text-white"
                          : "bg-[#F4F4F0] text-[#777]"
                          }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                </div>


                {/* GRAPH */}
                <div className="mt-10 h-48 flex items-end gap-2 md:gap-4">

                  {[45, 72, 52, 90, 64, 80, 58, 96, 68, 82, 55, 73, 61, 88].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-[#DCE7DF] rounded-t-lg relative group"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute inset-x-0 bottom-0 bg-[#315344] rounded-t-lg h-[35%] opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    )
                  )}

                </div>


                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

                  <div className="bg-[#F6F6F2] rounded-2xl p-5">
                    <div className="flex justify-between">
                      <p className="text-sm text-[#777]">
                        Food & Drinks
                      </p>
                      <PieChart size={18} className="text-[#777]" />
                    </div>

                    <p className="text-2xl font-semibold mt-5">
                      ₹7,240
                    </p>

                    <p className="text-xs text-[#B34C42] mt-2">
                      23% above your budget
                    </p>
                  </div>


                  <div className="bg-[#F6F6F2] rounded-2xl p-5">
                    <div className="flex justify-between">
                      <p className="text-sm text-[#777]">
                        Transport
                      </p>
                      <TrendingDown size={18} className="text-[#777]" />
                    </div>

                    <p className="text-2xl font-semibold mt-5">
                      ₹3,180
                    </p>

                    <p className="text-xs text-[#47725B] mt-2">
                      18% less than last month
                    </p>
                  </div>


                  <div className="bg-[#1D3028] rounded-2xl p-5 text-white">
                    <div className="flex justify-between">
                      <p className="text-sm text-white/60">
                        Money Lore says
                      </p>
                      <Sparkles size={18} />
                    </div>

                    <p className="text-sm leading-relaxed mt-5">
                      You could save around ₹2,400 this month by
                      cutting food delivery by 30%.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* TRUST / INTRO */}
        <section className="max-w-5xl mx-auto px-6 py-28 text-center">

          <p className="text-sm uppercase tracking-[0.2em] text-[#888]">
            Your personal financial story
          </p>

          <h2 className="font-serif text-4xl md:text-6xl leading-tight mt-5">
            Money tracking shouldn't feel
            <span className="italic text-[#315344]"> like homework.</span>
          </h2>

          <p className="mt-7 text-[#707070] max-w-2xl mx-auto text-lg leading-relaxed">
            Money Lore quietly turns your everyday transactions into
            something useful — patterns, budgets, savings opportunities,
            and answers to the questions you've been avoiding.
          </p>

        </section>


        {/* FEATURES */}
        <section id="features" className="bg-[#EAEFE9] py-28">

          <div className="max-w-7xl mx-auto px-6 md:px-10">

            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-[#527061]">
                Less tracking. More understanding.
              </p>

              <h2 className="font-serif text-5xl md:text-6xl mt-5 leading-tight">
                Your finances,
                <br />
                <span className="italic">without the spreadsheet.</span>
              </h2>
            </div>


            <div className="grid md:grid-cols-2 gap-5 mt-16">

              {/* EMAIL */}
              <FeatureCard
                icon={<Mail size={22} />}
                title="Connect your email"
                description="Money Lore finds transaction and purchase emails and turns messy notifications into clean, structured spending data."
                className="md:row-span-2"
              >
                <div className="mt-8 bg-white rounded-2xl p-5 border border-[#DDE4DE]">

                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="w-9 h-9 rounded-full bg-[#E8EEE9] flex items-center justify-center">
                      <Mail size={16} />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Money Lore connected
                      </p>
                      <p className="text-xs text-[#999]">
                        Gmail · synced 2 min ago
                      </p>
                    </div>

                    <div className="ml-auto w-2 h-2 rounded-full bg-[#5C8C70]" />
                  </div>

                  {[
                    ["Uber", "₹384"],
                    ["Zepto", "₹842"],
                    ["Swiggy", "₹519"],
                  ].map(([name, amount]) => (
                    <div
                      key={name}
                      className="flex justify-between py-4 border-b last:border-0 text-sm"
                    >
                      <span>{name}</span>
                      <span className="font-medium">{amount}</span>
                    </div>
                  ))}

                </div>
              </FeatureCard>


              {/* ANALYTICS */}
              <FeatureCard
                icon={<PieChart size={22} />}
                title="See where your money goes"
                description="Understand weekly spending, category trends, recurring expenses, and exactly how your budget is being allocated."
              >
                <div className="mt-8 flex items-center justify-between">

                  <div className="relative w-32 h-32 rounded-full border-[22px] border-[#315344]">
                    <div className="absolute inset-[-22px] rounded-full border-[22px] border-transparent border-t-[#B8CDBE] border-r-[#B8CDBE] rotate-45" />
                  </div>

                  <div className="space-y-3 text-sm">
                    <Legend label="Food" value="32%" />
                    <Legend label="Transport" value="18%" />
                    <Legend label="Shopping" value="15%" />
                    <Legend label="Other" value="35%" />
                  </div>

                </div>
              </FeatureCard>


              {/* BUDGET */}
              <FeatureCard
                icon={<Wallet size={22} />}
                title="Know what you can actually spend"
                description="Set monthly budgets and savings goals. Money Lore tracks progress automatically and warns you before you overspend."
              >
                <div className="mt-8">

                  <div className="flex justify-between text-sm mb-2">
                    <span>Food & Drinks</span>
                    <span>₹7,240 / ₹8,000</span>
                  </div>

                  <div className="h-3 bg-[#E4E8E4] rounded-full overflow-hidden">
                    <div className="w-[90%] h-full bg-[#315344] rounded-full" />
                  </div>

                  <p className="text-xs text-[#777] mt-3">
                    ₹760 left this month
                  </p>

                </div>
              </FeatureCard>

            </div>

          </div>

        </section>


        {/* AI SECTION */}
        <section id="ai" className="max-w-7xl mx-auto px-6 md:px-10 py-32">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <div className="inline-flex items-center gap-2 text-[#315344] text-sm font-medium">
                <Sparkles size={16} />
                MONEY LORE AI
              </div>

              <h2 className="font-serif text-5xl md:text-6xl leading-tight mt-5">
                Don't just know
                <br />
                <span className="italic text-[#315344]">
                  what you spent.
                </span>
                <br />
                Know what to do next.
              </h2>

              <p className="mt-7 text-[#707070] text-lg leading-relaxed max-w-lg">
                Ask questions about your money in plain English.
                Money Lore uses your actual spending history and
                context to give you useful, personalized answers.
              </p>

              <div className="mt-8 space-y-3">

                {[
                  "Where can I save ₹2,000 this month?",
                  "Why did I spend more this week?",
                  "Can I afford a ₹5,000 purchase?",
                  "How much did I spend on food this month?",
                ].map((question) => (
                  <div
                    key={question}
                    className="flex items-center justify-between p-4 bg-[#F5F5F1] rounded-xl text-sm"
                  >
                    <span>{question}</span>
                    <ChevronRight size={17} className="text-[#999]" />
                  </div>
                ))}

              </div>

            </div>


            {/* AI CHAT */}
            <div className="bg-[#1D3028] rounded-[32px] p-7 md:p-10 text-white shadow-2xl">

              <div className="flex items-center gap-3 mb-10">

                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="font-medium">
                    Money Lore AI
                  </p>
                  <p className="text-xs text-white/50">
                    Your financial analyst
                  </p>
                </div>

              </div>


              <div className="bg-white/10 rounded-2xl p-5 ml-8">
                <p className="text-sm">
                  Where can I save money this month?
                </p>
              </div>


              <div className="mt-4 bg-white rounded-2xl p-6 text-[#171717]">

                <div className="flex gap-3">

                  <Sparkles size={18} className="text-[#315344] mt-1" />

                  <div>

                    <p className="text-sm leading-relaxed">
                      I found 3 places where you could potentially
                      save without changing your essentials.
                    </p>

                    <div className="mt-5 space-y-4">

                      <SavingItem
                        title="Food delivery"
                        amount="₹1,240"
                        text="You're ordering 34% more than last month."
                      />

                      <SavingItem
                        title="Subscriptions"
                        amount="₹699"
                        text="You haven't used 2 recurring services recently."
                      />

                      <SavingItem
                        title="Quick commerce"
                        amount="₹860"
                        text="12 small purchases added up this month."
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* FUN TEA SECTION */}
        <section className="bg-[#F0EDE5] py-28">

          <div className="max-w-5xl mx-auto px-6 text-center">

            <div className="text-4xl mb-5">☕</div>

            <p className="text-sm uppercase tracking-[0.2em] text-[#8A806E]">
              And yes, we will judge you.
            </p>

            <h2 className="font-serif text-5xl md:text-7xl mt-5">
              Get the <span className="italic">tea.</span>
            </h2>

            <p className="mt-6 text-lg text-[#777] max-w-xl mx-auto">
              Your weekly financial recap, except Money Lore has
              absolutely no problem calling you out.
            </p>

            <div className="mt-12 max-w-xl mx-auto bg-white rounded-[28px] p-8 text-left shadow-sm">

              <div className="flex gap-4">

                <div className="w-11 h-11 rounded-full bg-[#E8EEE9] flex items-center justify-center text-xl">
                  ☕
                </div>

                <div>

                  <p className="font-medium">
                    This week's tea
                  </p>

                  <p className="mt-3 text-[#666] leading-relaxed">
                    You spent <strong className="text-black">₹1,840</strong>{" "}
                    on tea & snacks this week.
                  </p>

                  <p className="mt-3 text-[#666] leading-relaxed">
                    Babe... at this point you could've opened
                    <strong className="text-black">
                      {" "}a whole tea shop.
                    </strong>{" "}
                    😭
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* HOW IT WORKS */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-6 md:px-10 py-32">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-sm uppercase tracking-[0.2em] text-[#888]">
              How it works
            </p>

            <h2 className="font-serif text-5xl md:text-6xl mt-5">
              From inbox to
              <span className="italic text-[#315344]">
                {" "}money clarity.
              </span>
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-6 mt-16">

            <Step
              number="01"
              icon={<Mail size={22} />}
              title="Connect your email"
              text="Give Money Lore access to transaction notifications and purchase receipts."
            />

            <Step
              number="02"
              icon={<Zap size={22} />}
              title="AI does the boring part"
              text="Money Lore extracts amounts, merchants, dates and categories automatically."
            />

            <Step
              number="03"
              icon={<TrendingDown size={22} />}
              title="Understand & save"
              text="Get spending trends, budgets, personalized recommendations and your weekly tea."
            />

          </div>

        </section>


        {/* FINAL CTA */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-28">

          <div className="bg-[#1D3028] rounded-[36px] text-white px-8 md:px-16 py-20 text-center">

            <p className="text-white/50 uppercase tracking-[0.2em] text-xs">
              Your money has lore.
            </p>

            <h2 className="font-serif text-5xl md:text-7xl mt-5">
              Let's find out what it is.
            </h2>

            <p className="text-white/60 max-w-xl mx-auto mt-6 text-lg">
              Connect your inbox and let Money Lore start making
              sense of your spending.
            </p>

            <div className="mt-9">

              <SignInButton mode="modal">
                <button className="bg-white text-[#1D3028] px-8 py-4 rounded-full font-medium hover:bg-[#F0F0EC] transition inline-flex items-center gap-3">
                  Get started for free
                  <ArrowUpRight size={18} />
                </button>
              </SignInButton>

            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="border-t border-[#DDDDD7]">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-[#888]">

          <span>
            © 2026 Money Lore
          </span>

          <span>
            Your money. Your story. Your lore.
          </span>

        </div>

      </footer>

    </div>
  );
}


/* COMPONENTS */

function FeatureCard({
  icon,
  title,
  description,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-[28px] p-7 md:p-9 border border-[#DDE2DD] ${className}`}
    >
      <div className="w-11 h-11 rounded-xl bg-[#E7EEE9] text-[#315344] flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-2xl font-semibold mt-6 tracking-tight">
        {title}
      </h3>

      <p className="text-[#777] mt-3 leading-relaxed max-w-lg">
        {description}
      </p>

      {children}
    </div>
  );
}


function Legend({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-5 justify-between w-32">
      <span className="text-[#777]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}


function SavingItem({
  title,
  amount,
  text,
}: {
  title: string;
  amount: string;
  text: string;
}) {
  return (
    <div className="border-b border-[#E8E8E4] pb-4 last:border-0">

      <div className="flex justify-between">
        <p className="font-medium text-sm">{title}</p>
        <p className="font-medium text-sm text-[#315344]">
          {amount}
        </p>
      </div>

      <p className="text-xs text-[#888] mt-1">
        {text}
      </p>

    </div>
  );
}


function Step({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#F5F5F1] rounded-[26px] p-7">

      <div className="flex items-center justify-between">

        <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#315344]">
          {icon}
        </div>

        <span className="text-sm text-[#AAA]">
          {number}
        </span>

      </div>

      <h3 className="text-xl font-semibold mt-8">
        {title}
      </h3>

      <p className="text-[#777] mt-3 leading-relaxed">
        {text}
      </p>

    </div>
  );
}