# Personal Portfolio v2

Welcome to **Personal Portfolio v2**! This repository contains a modern, interactive portfolio website for **Hitesh Solanki**, built with Next.js, TypeScript, Tailwind CSS, and integrated with an AI-powered Personal Portfolio Agent that lets you ask questions about Hitesh’s background in real time.

---

![Home Screen](./images/home.png) ![Chat Interface](./images/chat.png) ![Agent Architecture](./images/personal_portfolio_agent.png)

---

## 🚀 Live Demo

\:globe_with_meridians: [https://master.d2p4p6tfmpfvri.amplifyapp.com](https://master.d2p4p6tfmpfvri.amplifyapp.com)

[:link: GitHub Repository](https://github.com/Hitesh-s0lanki/personal-portfolio)

---

## ✨ Features

- **Home**: A clean introduction with a hero banner and links to social profiles.
- **Skills**: A detailed breakdown of technical skills, tools, and frameworks.
- **Projects**: Showcases key projects with descriptions, tech stack, and source code links.
- **Experience**: Timeline of professional roles, responsibilities, and achievements.
- **Certificates**: List of certifications and awards with issuing organizations and dates.
- **Ask Me**: An AI-powered chat interface (Personal Portfolio Agent) that answers queries about Hitesh’s experience, skills, projects, and more.

---

## 🛠 Technology Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide Icons](https://lucide.dev)
- **AI Agent**: OpenAI GPT model via REST API
- **Deployment**: AWS Amplify

---

## 💻 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- An OpenAI API key with access to GPT-4 or GPT-3.5

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hitesh-s0lanki/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env.local` file at the project root and add:

   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   RESEND_API_KEY=your_resend_api_key_here
   RESEND_FROM_EMAIL=your_verified_email@yourdomain.com
   RESEND_TO_EMAIL=your_email@yourdomain.com
   ```

   **Note**: 
   - Get your Resend API key from [resend.com](https://resend.com)
   - Verify your domain or use a verified email address for `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL` is where contact form submissions will be sent

4. **Run in development mode**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 Personal Portfolio Agent

Navigate to the **Ask Me** section or click the ✨ icon in the navbar to launch the AI chat interface. The agent:

- **Loads user profile** from a system prompt (`profile.txt`)
- **Responds to queries** about Hitesh’s background, skills, projects, experience, and certificates
- **Built with** React (Client Components), `react-hook-form`, and Axios for API calls

_Example queries:_

> • What projects have you built with Spring Boot?
> • List all certifications you’ve achieved.
> • Tell me about your most challenging AI project.

---

## 📦 Deployment

This app is deployed on AWS Amplify. To update the live site:

1. Push changes to the `main` branch.
2. AWS Amplify automatically builds and deploys your updates.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "feat: add awesome feature"`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Have questions or feedback? Reach out on [LinkedIn](https://www.linkedin.com/in/hitesh-solanki) or open an issue here!
