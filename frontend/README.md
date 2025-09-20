# Get Listicled - Listicle Search Web App

A modern web application for discovering high-quality listicles across any niche, powered by Perplexity AI.

## Features

- **Smart Search**: Find listicles using Perplexity's Sonar model for real-time web results
- **User Authentication**: Sign up/login system with result access control
- **Result Limiting**: First 5 results free, unlimited access for registered users
- **Responsive Design**: Mobile-first design with clean card layouts
- **Real-time Results**: Powered by Perplexity AI's web search capabilities

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Perplexity API**
   - Get your API key from [Perplexity AI](https://www.perplexity.ai/settings/api)
   - Create a `.env.local` file in the root directory
   - Add your API key:
     ```
     VITE_PERPLEXITY_API_KEY=your_perplexity_api_key_here
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## API Integration

The app uses Perplexity's Sonar model (`llama-3.1-sonar-large-128k-online`) to search for:
- High-quality listicles and rankings
- "Best of" articles and product recommendations
- Numbered lists and comparison articles
- Content from reputable publications

## Environment Variables

- `VITE_PERPLEXITY_API_KEY`: Your Perplexity API key (required for search functionality)

## Demo Credentials

For testing the authentication system:
- Email: `john@example.com`
- Password: `password123`

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Search API**: Perplexity AI Sonar
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API services (Perplexity integration)
└── App.tsx            # Main application component
```

## Deployment

The app is configured for static hosting and can be deployed to:
- Bolt Hosting
- Netlify
- Vercel
- Any static hosting provider

Build for production:
```bash
npm run build
```