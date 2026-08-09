# 💸 Money Lore

### Where did my money go?

**Money Lore** is an AI-native personal finance analyst that turns messy financial activity into insights you can actually understand.

Instead of manually entering every transaction, Money Lore is designed to connect to your email, extract transaction information from receipts and payment notifications, categorize spending, and use AI to explain your financial habits.

> Your money has lore. Money Lore tells you what it is.

---

## ✨ What is Money Lore?

Most budgeting apps tell you **what you spent**.

Money Lore tries to tell you **why you keep spending it — and what you can do about it.**

It combines automated transaction extraction, spending analytics, visualizations, and AI-powered financial insights into one dashboard.

### Core ideas

- 📩 **Email-powered expense tracking**
  - Extract transactions from payment and purchase notifications.
  - Reduce manual expense entry.

- 🧠 **AI Financial Analyst**
  - Analyze spending patterns.
  - Identify unusual or recurring expenses.
  - Suggest areas where you could save.

- 📊 **Spending Analytics**
  - Weekly and monthly spending breakdowns.
  - Category-wise expense analysis.
  - Budget allocation and spending trends.

- ☕ **Manual Spending Notes**
  - Quickly add expenses that don't arrive through email.
  - Example:
    > `T - ₹120`
    
    Money Lore can interpret this as tea/snacks spending and add it to your financial history.

- 💀 **Financial Lore**
  - Instead of giving you boring financial warnings, Money Lore gives you personality-driven insights.

  > "You spent ₹2,400 on tea this month. At this point, you're not drinking tea. You're funding the tea industry."

- 💡 **Savings Recommendations**
  - AI analyzes your spending and highlights potential savings opportunities.
  - Recommendations are based on your actual spending behavior.

---

## 🧠 AI-Native Architecture

Money Lore isn't designed as a traditional CRUD expense tracker with AI slapped on top.

The AI is part of the product's reasoning layer.

```text
                  ┌─────────────────────┐
                  │       Gmail         │
                  │ Payment / Receipt   │
                  │    Notifications    │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Transaction Parser  │
                  │                     │
                  │ Extract merchant,   │
                  │ amount, date, type   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │    PostgreSQL       │
                  │                     │
                  │ Transactions        │
                  │ Categories          │
                  │ Budgets             │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │    AI Analyst       │
                  │      Gemini         │
                  │                     │
                  │ Pattern detection   │
                  │ Spending analysis   │
                  │ Savings insights    │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Money Lore UI     │
                  │                     │
                  │ Graphs • Budgets    │
                  │ Insights • Lore     │
                  └─────────────────────┘
