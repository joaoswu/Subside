
# Node.js Discord Moderation & Fun Bot

A powerful Discord bot built with Node.js and discord.js, featuring advanced moderation, automation, analytics, and fun systems.

## Features

- **Moderation:** ban, kick, mute, warn, tempban, per-command permissions, case history, appeals
- **Fun:** meme, joke, 8ball, coinflip, roll, choose, say, reverse, avatar, cat, dog
- **Starboard:** Highlight starred messages in a dedicated channel
- **Advanced AutoMod:** Anti-spam, anti-link, anti-raid, anti-ghost ping, anti-NSFW, blacklist, logging
- **Scheduled Events:** Schedule announcements and recurring events
- **Welcome Images:** Custom welcome images for new members (with /setwelcomeimage)
- **Giveaways:** Create, manage, and reroll giveaways with automatic winner selection
- **Advanced Logging:** Tracks message edits/deletes, member updates, channel/role/emoji/webhook/integration/voice/presence changes
- **Server Backup/Restore:** Download and restore all bot data (settings, cases, XP, economy, events, giveaways, starboard)
- **Analytics:** Command usage, top users, errors, and more
- **XP/Leveling:** Leveling system with leaderboard
- **Economy:** Balance, daily, gamble, and more
- **Tickets:** Support ticket system
- **Per-Server Settings:** Prefix, modlog, welcome, automod, permissions, and more
- **Command handler structure:** Easily add new commands in the `commands/` folder
- **Environment variable support:** via dotenv
- **ESLint:** for code quality

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
