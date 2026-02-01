# Node.js Discord Moderation & Fun Bot

A Discord bot built with Node.js using discord.js. Features moderation commands (ban, kick, mute, warn) and fun commands (meme, joke, 8ball).

## Features
- Moderation: ban, kick, mute, warn
- Fun: meme, joke, 8ball
- Command handler structure
- Environment variable support via dotenv
- ESLint for code quality

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in your Discord bot token and other config.
3. **Run the bot:**
   ```sh
   npm start
   ```

## Development
- Use `npm run lint` to check code style.
- Add new commands in the `commands/` folder.

## Requirements
- Node.js 18+
- Discord bot token

---

This project is scaffolded for easy extension. See code comments for guidance.
