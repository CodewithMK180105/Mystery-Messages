# 🔐 Mystery Message – Anonymous Messaging App

A full stack web application that allows users to send and receive **completely anonymous messages**. Built using **Next.js**, **React**, **TypeScript**, and **NextAuth.js**, this project ensures a smooth, secure, and minimal user experience. The platform uses **email verification via Nodemailer** to maintain authenticity while preserving anonymity.

---

## 📌 Features

- ✅ Completely anonymous message sending  
- 🔒 User authentication using **NextAuth.js**  
- 📧 Email verification via **Nodemailer**  
- 📨 Anonymous message inbox  
- 🚫 No tracking or identity reveal  
- 💡 Clean and modern UI  

---

## 🧱 Tech Stack

| Technology                | Description                        |
|---------------------------|------------------------------------|
| Next.js                   | React framework for full stack     |
| React.js                  | Frontend library                   |
| TypeScript                | Type-safe JavaScript               |
| NextAuth.js               | Authentication solution            |
| Nodemailer                | Email verification system          |
| Tailwind CSS / ShadCN UI  | Styling and UI Components          |
| MongoDB                   | For storing users/messages         |

---

## 🚀 Live Demo

👉 Visit the app here: [https://mystery-messages-one.vercel.app](https://mystery-messages-one.vercel.app)

---

## 🧭 App Flow

1. **User signs up** with their email address.
2. A **verification code** is sent via Nodemailer.
3. After successful verification, the user gets a **unique link** to receive anonymous messages.
5. The user can **view received messages** in their Respective Dashboard.
6. Users can see multiple users and send the messages to each other.

---

## 🔒 Security & Privacy

- No user identity is revealed to message senders
- Email is used only for authentication, not shown publicly
- No IP logging or tracking
- Messages are anonymized by default