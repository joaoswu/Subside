// Analytics tracking
const analyticsPath = './src/analytics.json';
let analytics = { commands: {}, messages: 0, users: {}, guilds: {}, channels: {}, errors: {} };
if (fs.existsSync(analyticsPath)) {
  analytics = JSON.parse(fs.readFileSync(analyticsPath, 'utf8'));
}
function saveAnalytics() {
  fs.writeFileSync(analyticsPath, JSON.stringify(analytics, null, 2));
}

client.on('messageCreate', message => {
  if (!message.guild || message.author.bot) return;
  analytics.messages++;
  analytics.users[message.author.id] = (analytics.users[message.author.id] || 0) + 1;
  analytics.guilds[message.guild.id] = (analytics.guilds[message.guild.id] || 0) + 1;
  analytics.channels[message.channel.id] = (analytics.channels[message.channel.id] || 0) + 1;
  saveAnalytics();
});

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return;
  analytics.commands[interaction.commandName] = (analytics.commands[interaction.commandName] || 0) + 1;
  analytics.users[interaction.user.id] = (analytics.users[interaction.user.id] || 0) + 1;
  analytics.guilds[interaction.guild?.id] = (analytics.guilds[interaction.guild?.id] || 0) + 1;
  saveAnalytics();
});

function logCommandError(commandName) {
  analytics.errors[commandName] = (analytics.errors[commandName] || 0) + 1;
  saveAnalytics();
}
// Performance: error handling and caching
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

// Simple member cache for permission checks
client.on('guildMemberAdd', member => {
  if (!client._memberCache) client._memberCache = {};
  client._memberCache[member.guild.id] = client._memberCache[member.guild.id] || {};
  client._memberCache[member.guild.id][member.id] = member;
});
client.on('guildMemberRemove', member => {
  if (client._memberCache && client._memberCache[member.guild.id]) {
    delete client._memberCache[member.guild.id][member.id];
  }
});
// Leveling/XP system
const xpPath = './src/xp.json';
let xpData = { xp: {} };
if (fs.existsSync(xpPath)) {
  xpData = JSON.parse(fs.readFileSync(xpPath, 'utf8'));
}
function addXP(guildId, userId, amount = 1) {
  if (!xpData.xp[guildId]) xpData.xp[guildId] = {};
  if (!xpData.xp[guildId][userId]) xpData.xp[guildId][userId] = { xp: 0, level: 1 };
  xpData.xp[guildId][userId].xp += amount;
  const curLevel = xpData.xp[guildId][userId].level;
  const nextLevelXP = curLevel * 100;
  if (xpData.xp[guildId][userId].xp >= nextLevelXP) {
    xpData.xp[guildId][userId].level++;
  }
  fs.writeFileSync(xpPath, JSON.stringify(xpData, null, 2));
}

client.on('messageCreate', async message => {
  // ...existing auto-moderation code...
  if (!message.guild || message.author.bot) return;
  addXP(message.guild.id, message.author.id, 5);
});
// Auto-moderation: anti-spam, anti-link, blacklist
client.on('messageCreate', async message => {
  if (!message.guild || message.author.bot) return;
  const guildSettings = settings.guilds[message.guild.id];
  if (!guildSettings || !guildSettings.automod) return;
  // Anti-spam: 5+ messages in 5 seconds
  if (guildSettings.automod.antispam) {
    if (!client._spam) client._spam = {};
    const now = Date.now();
    const key = `${message.guild.id}:${message.author.id}`;
    if (!client._spam[key]) client._spam[key] = [];
    client._spam[key] = client._spam[key].filter(t => now - t < 5000);
    client._spam[key].push(now);
    if (client._spam[key].length >= 5) {
      await message.delete();
      const channel = message.guild.channels.cache.get(guildSettings.modlog);
      if (channel) {
        await channel.send({ embeds: [{
          title: '🚨 Spam Detected',
          description: `User: <@${message.author.id}>\nMessage deleted for spam.`,
          color: 0xED4245,
          timestamp: new Date().toISOString()
        }] });
      }
      return;
    }
  }
  // Anti-link
  if (guildSettings.automod.antilink && /https?:\/\//i.test(message.content)) {
    await message.delete();
    const channel = message.guild.channels.cache.get(guildSettings.modlog);
    if (channel) {
      await channel.send({ embeds: [{
        title: '🔗 Link Blocked',
        description: `User: <@${message.author.id}>\nMessage deleted for posting a link.`,
        color: 0xED4245,
        timestamp: new Date().toISOString()
      }] });
    }
    return;
  }
  // Blacklist word filter
  if (guildSettings.automod.blacklist && guildSettings.automod.blacklist.length) {
    const found = guildSettings.automod.blacklist.find(word => message.content.toLowerCase().includes(word));
    if (found) {
      await message.delete();
      const channel = message.guild.channels.cache.get(guildSettings.modlog);
      if (channel) {
        await channel.send({ embeds: [{
          title: '🚫 Blacklisted Word',
          description: `User: <@${message.author.id}>\nMessage deleted for using: **${found}**`,
          color: 0xED4245,
          timestamp: new Date().toISOString()
        }] });
      }
      return;
    }
  }
});
client.on('guildMemberAdd', async member => {
  // ...existing code for welcome message...
  const guildSettings = settings.guilds[member.guild.id];
  if (guildSettings && guildSettings.modlog) {
    const channel = member.guild.channels.cache.get(guildSettings.modlog);
    if (channel) {
      await channel.send({
        embeds: [{
          title: '➕ Member Joined',
          description: `User: <@${member.id}> (${member.user.tag})`,
          color: 0x57F287,
          timestamp: new Date().toISOString()
        }]
      });
    }
  }
});

client.on('guildMemberRemove', async member => {
  // ...existing code for goodbye message...
  const guildSettings = settings.guilds[member.guild.id];
  if (guildSettings && guildSettings.modlog) {
    const channel = member.guild.channels.cache.get(guildSettings.modlog);
    if (channel) {
      await channel.send({
        embeds: [{
          title: '➖ Member Left',
          description: `User: <@${member.id}> (${member.user.tag})`,
          color: 0xED4245,
          timestamp: new Date().toISOString()
        }]
      });
    }
  }
});
// Advanced logging: message edits, deletes, member updates
client.on('messageUpdate', async (oldMsg, newMsg) => {
  if (!oldMsg.guild || oldMsg.author.bot) return;
  const guildSettings = settings.guilds[oldMsg.guild.id];
  if (guildSettings && guildSettings.modlog) {
    const channel = oldMsg.guild.channels.cache.get(guildSettings.modlog);
    if (channel) {
      await channel.send({
        embeds: [{
          title: '✏️ Message Edited',
          description: `Author: <@${oldMsg.author.id}>\nChannel: <#${oldMsg.channel.id}>\nBefore: ${oldMsg.content || '(empty)'}\nAfter: ${newMsg.content || '(empty)'}`,
          color: 0x5865F2,
          timestamp: new Date().toISOString()
        }]
      });
    }
  }
});

client.on('messageDelete', async msg => {
  if (!msg.guild || msg.author?.bot) return;
  const guildSettings = settings.guilds[msg.guild.id];
  if (guildSettings && guildSettings.modlog) {
    const channel = msg.guild.channels.cache.get(guildSettings.modlog);
    if (channel) {
      await channel.send({
        embeds: [{
          title: '🗑️ Message Deleted',
          description: `Author: <@${msg.author?.id}>\nChannel: <#${msg.channel.id}>\nContent: ${msg.content || '(empty)'}`,
          color: 0xED4245,
          timestamp: new Date().toISOString()
        }]
      });
    }
  }
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const guildSettings = settings.guilds[newMember.guild.id];
  if (guildSettings && guildSettings.modlog) {
    const channel = newMember.guild.channels.cache.get(guildSettings.modlog);
    if (channel) {
      await channel.send({
        embeds: [{
          title: '🔄 Member Updated',
          description: `User: <@${newMember.id}>\nOld Nickname: ${oldMember.nickname || '(none)'}\nNew Nickname: ${newMember.nickname || '(none)'}`,
          color: 0x57F287,
          timestamp: new Date().toISOString()
        }]
      });
    }
  }
});
client.addCase = addCase;
// Case history storage
const casesPath = './src/cases.json';
let cases = { cases: [] };
if (fs.existsSync(casesPath)) {
  cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
}
function addCase(caseObj) {
  cases.cases.push(caseObj);
  fs.writeFileSync(casesPath, JSON.stringify(cases, null, 2));
}
// Welcome and goodbye messages
client.on('guildMemberAdd', async member => {
  const guildSettings = settings.guilds[member.guild.id];
  if (guildSettings && guildSettings.welcome && guildSettings.welcome.channel) {
    const channel = member.guild.channels.cache.get(guildSettings.welcome.channel);
    if (channel) {
      const msg = guildSettings.welcome.message.replace('{user}', `<@${member.user.id}>`);
      await channel.send({
        embeds: [{
          title: '👋 Welcome!',
          description: msg,
          color: 0x57F287
        }]
      });
    }
  }
});

client.on('guildMemberRemove', async member => {
  const guildSettings = settings.guilds[member.guild.id];
  if (guildSettings && guildSettings.welcome && guildSettings.welcome.channel) {
    const channel = member.guild.channels.cache.get(guildSettings.welcome.channel);
    if (channel) {
      await channel.send({
        embeds: [{
          title: '👋 Goodbye!',
          description: `${member.user.tag} has left the server.`,
          color: 0xED4245
        }]
      });
    }
  }
});

require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();

// Settings storage
const settingsPath = './src/settings.json';
let settings = { guilds: {} };
if (fs.existsSync(settingsPath)) {
  settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
}
function saveSettings() {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

// Moderation log utility
async function logModeration(guild, embed) {
  const guildSettings = settings.guilds[guild.id];
  if (guildSettings && guildSettings.modlog) {
    const channel = guild.channels.cache.get(guildSettings.modlog);
    if (channel) await channel.send({ embeds: [embed] });
  }
}

// Load slash commands
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  if (command.data) {
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }
}

// Utility: get prefix for a guild
function getPrefix(guildId) {
  return (settings.guilds[guildId] && settings.guilds[guildId].prefix) || '!';
}

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  // Register slash commands
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('Slash commands registered globally.');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  // Advanced customization: per-command permissions
  const guildSettings = settings.guilds[interaction.guild?.id];
  if (guildSettings && guildSettings.permissions && guildSettings.permissions[interaction.commandName]) {
    const requiredRole = guildSettings.permissions[interaction.commandName];
    if (!interaction.member.roles.cache.has(requiredRole)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }
  }
  try {
    await command.execute(interaction, client, { logModeration, settings, saveSettings });
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
