# K.O Dev Chatbot

A modern AI chatbot application built with Next.js that supports multiple language models including Google Gemini, OpenAI GPT, and Groq.

## Features

- 🤖 Multiple AI Model Support
  - Google Gemini (1.5 Pro, 1.5 Flash)
  - OpenAI (GPT-4, GPT-3.5)
  - Groq (LLaMA3, Mixtral)
- 💬 Streaming Responses
- 📱 Responsive Design
- 💾 Local Storage for Conversation History
- ⚡ Built with Next.js and TypeScript

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v18 or higher)
- API keys for the models you want to use:
  - GOOGLE_GEMINI_API_KEY
  - OPENAI_API_KEY
  - GROQ_API_KEY

## Getting Started

1. Clone the repository

```bash
git clone <repository-url>
cd chatbot
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory and add your API keys:

```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components
- `/context` - React context providers
- `/hooks` - Custom React hooks
- `/types` - TypeScript type definitions
- `/utils` - Utility functions
- `/constants` - Application constants

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Ant Design](https://ant.design/) - UI components
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code syntax highlighting

## Deployment

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com/new).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
