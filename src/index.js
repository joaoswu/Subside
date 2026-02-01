// --- Advanced Logging: Channels, Roles, Emojis, Webhooks, Integrations, Voice, Presence ---
client.on('channelCreate', async channel => {
  const guildSettings = settings.guilds[channel.guild?.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = channel.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '📢 Channel Created',
        description: `Channel: <#${channel.id}> (${channel.name})\nType: ${channel.type}`,
        color: 0x57F287,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('channelDelete', async channel => {
  const guildSettings = settings.guilds[channel.guild?.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = channel.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '🗑️ Channel Deleted',
        description: `Channel: ${channel.name} (${channel.id})\nType: ${channel.type}`,
        color: 0xED4245,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('roleCreate', async role => {
  const guildSettings = settings.guilds[role.guild?.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = role.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '🔑 Role Created',
        description: `Role: <@&${role.id}> (${role.name})`,
        color: 0x57F287,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('roleDelete', async role => {
  const guildSettings = settings.guilds[role.guild?.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = role.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '🗑️ Role Deleted',
        description: `Role: ${role.name} (${role.id})`,
        color: 0xED4245,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('emojiCreate', async emoji => {
  const guildSettings = settings.guilds[emoji.guild?.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = emoji.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '😃 Emoji Created',
        description: `Emoji: <:${emoji.name}:${emoji.id}>`,
        color: 0x57F287,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('emojiDelete', async emoji => {
  const guildSettings = settings.guilds[emoji.guild?.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = emoji.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '🗑️ Emoji Deleted',
        description: `Emoji: ${emoji.name} (${emoji.id})`,
        color: 0xED4245,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('webhookUpdate', async channel => {
  const guildSettings = settings.guilds[channel.guild?.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = channel.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '🔗 Webhook Updated',
        description: `Channel: <#${channel.id}> (${channel.name})`,
        color: 0x5865F2,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('integrationUpdate', async guild => {
  const guildSettings = settings.guilds[guild.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '🔗 Integration Updated',
        description: `Guild: ${guild.name} (${guild.id})`,
        color: 0x5865F2,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('voiceStateUpdate', async (oldState, newState) => {
  const guildSettings = settings.guilds[newState.guild.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = newState.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      let desc = '';
      if (!oldState.channel && newState.channel) desc = `<@${newState.id}> joined <#${newState.channel.id}>`;
      else if (oldState.channel && !newState.channel) desc = `<@${newState.id}> left <#${oldState.channel.id}>`;
      else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) desc = `<@${newState.id}> moved from <#${oldState.channel.id}> to <#${newState.channel.id}>`;
      else return;
      await logChannel.send({ embeds: [{
        title: '🔊 Voice State Update',
        description: desc,
        color: 0x5865F2,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
client.on('presenceUpdate', async (oldPresence, newPresence) => {
  const guildSettings = settings.guilds[newPresence.guild.id];
  if (guildSettings && guildSettings.modlog) {
    const logChannel = newPresence.guild.channels.cache.get(guildSettings.modlog);
    if (logChannel) {
      await logChannel.send({ embeds: [{
        title: '🟢 Presence Update',
        description: `<@${newPresence.userId}> is now ${newPresence.status}`,
        color: 0x5865F2,
        footer: { text: `Subside Bot • Logging • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
    }
  }
});
// --- Giveaways System ---
const giveawayHandler = require('./giveawayHandler');

// ...existing code...

// Start the giveaway handler
giveawayHandler(client);

// ...existing code...
// Welcome image generation
const { createCanvas, loadImage, registerFont } = require('canvas');
// Optionally register a custom font if desired
// registerFont('./src/fonts/YourFont.ttf', { family: 'YourFont' });

// --- Scheduled Events System ---
const eventsPath = './src/events.json';
let eventsData = { events: [] };
if (fs.existsSync(eventsPath)) {
  eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
}

// Helper to save events
function saveEvents() {
  fs.writeFileSync(eventsPath, JSON.stringify(eventsData, null, 2));
}

// Periodic event checker (every 30 seconds)
setInterval(async () => {
  const now = Date.now();
  // Copy to avoid mutation during iteration
  const eventsToRun = eventsData.events.filter(e => new Date(e.time).getTime() <= now);
  if (eventsToRun.length === 0) return;
  for (const event of eventsToRun) {
    try {
      const guild = client.guilds.cache.get(event.guild);
      if (!guild) continue;
      const channel = guild.channels.cache.get(event.channel);
      if (!channel) continue;
      await channel.send({
        embeds: [{
          title: '📅 Scheduled Event',
          description: event.message,
          color: 0x57F287,
          footer: { text: `Subside Bot • Events • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }]
      });
    } catch (err) {
      console.error('Error sending scheduled event:', err);
    }
  }
  // Remove executed events
  eventsData.events = eventsData.events.filter(e => new Date(e.time).getTime() > now);
  saveEvents();
}, 30000);
// --- Starboard Feature ---
const starboardPath = './src/starboard.json';
let starboard = { guilds: {} };
if (fs.existsSync(starboardPath)) {
  starboard = JSON.parse(fs.readFileSync(starboardPath, 'utf8'));
}
let starboardCache = {};

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) try { await reaction.fetch(); } catch { return; }
  if (user.bot || reaction.emoji.name !== '⭐') return;
  const { message } = reaction;
  if (!message.guild) return;
  const config = starboard.guilds[message.guild.id];
  if (!config) return;
  const starboardChannel = message.guild.channels.cache.get(config.channel);
  if (!starboardChannel) return;
  // Only count unique users
  const users = await reaction.users.fetch();
  const count = users.filter(u => !u.bot).size;
  if (count < 3) return; // Threshold: 3 stars
  // Prevent duplicate starboard posts
  starboardCache[message.id] = starboardCache[message.id] || null;
  if (starboardCache[message.id]) return;
  const embed = {
    title: '⭐ Starred Message',
    description: message.content || '[Embed/Attachment]',
    color: 0xFEE75C,
    author: { name: message.author.tag, icon_url: message.author.displayAvatarURL() },
    fields: [
      { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
      { name: 'Jump', value: `[Go to Message](${message.url})`, inline: true },
      { name: 'Stars', value: count.toString(), inline: true }
    ],
    footer: { text: `Subside Bot • Starboard • ${new Date().toLocaleDateString()}` },
    timestamp: new Date().toISOString()
  };
  if (message.attachments.size > 0) {
    const img = message.attachments.find(a => a.contentType && a.contentType.startsWith('image/'));
    if (img) embed.image = { url: img.url };
  }
  const starMsg = await starboardChannel.send({ embeds: [embed] });
  starboardCache[message.id] = starMsg.id;
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.partial) try { await reaction.fetch(); } catch { return; }
  if (user.bot || reaction.emoji.name !== '⭐') return;
  const { message } = reaction;
  if (!message.guild) return;
  const config = starboard.guilds[message.guild.id];
  if (!config) return;
  const starboardChannel = message.guild.channels.cache.get(config.channel);
  if (!starboardChannel) return;
  // Only count unique users
  const users = await reaction.users.fetch();
  const count = users.filter(u => !u.bot).size;
  if (count >= 3) return; // Still meets threshold
  // Remove from starboard if below threshold
  const starMsgId = starboardCache[message.id];
  if (starMsgId) {
    try { const msg = await starboardChannel.messages.fetch(starMsgId); await msg.delete(); } catch {}
    starboardCache[message.id] = null;
  }
});
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
  // --- Advanced AutoMod ---
  if (!message.guild || message.author.bot) return;
  addXP(message.guild.id, message.author.id, 5);
  const guildSettings = settings.guilds[message.guild.id];
  if (!guildSettings || !guildSettings.automod) return;
  const modlog = guildSettings.modlog && message.guild.channels.cache.get(guildSettings.modlog);
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
      if (modlog) await modlog.send({ embeds: [{
        title: '🚨 Spam Detected',
        description: `User: <@${message.author.id}>\nMessage deleted for spam.`,
        color: 0xED4245,
        author: { name: message.author.tag, icon_url: message.author.displayAvatarURL() },
        thumbnail: { url: message.author.displayAvatarURL() },
        footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
      return;
    }
  }
  // Anti-link
  if (guildSettings.automod.antilink && /https?:\/\//i.test(message.content)) {
    await message.delete();
    if (modlog) await modlog.send({ embeds: [{
      title: '🔗 Link Blocked',
      description: `User: <@${message.author.id}>\nMessage deleted for posting a link.`,
      color: 0xED4245,
      author: { name: message.author.tag, icon_url: message.author.displayAvatarURL() },
      thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/25/25284.png' },
      footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
      timestamp: new Date().toISOString()
    }] });
    return;
  }
  // Blacklist word filter
  if (guildSettings.automod.blacklist && guildSettings.automod.blacklist.length) {
    const found = guildSettings.automod.blacklist.find(word => message.content.toLowerCase().includes(word));
    if (found) {
      await message.delete();
      if (modlog) await modlog.send({ embeds: [{
        title: '🚫 Blacklisted Word',
        description: `User: <@${message.author.id}>\nMessage deleted for using: **${found}**`,
        color: 0xED4245,
        author: { name: message.author.tag, icon_url: message.author.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/565/565547.png' },
        footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
      return;
    }
  }
  // Anti-NSFW (basic keyword check)
  if (guildSettings.automod.antinsfw) {
    const nsfwWords = ['nsfw', 'porn', 'sex', 'nude', 'hentai', 'xxx'];
    const found = nsfwWords.find(word => message.content.toLowerCase().includes(word));
    if (found) {
      await message.delete();
      if (modlog) await modlog.send({ embeds: [{
        title: '🔞 NSFW Blocked',
        description: `User: <@${message.author.id}>\nMessage deleted for NSFW content.`,
        color: 0xED4245,
        author: { name: message.author.tag, icon_url: message.author.displayAvatarURL() },
        footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
      return;
    }
  }
  // Anti-ghost ping: log deleted messages that mention users
  if (guildSettings.automod.antighostping && message.mentions.users.size > 0) {
    message._hasMention = true;
  }
});

// Anti-ghost ping: log if a message with mentions is deleted
client.on('messageDelete', async msg => {
  if (!msg.guild || msg.author?.bot) return;
  const guildSettings = settings.guilds[msg.guild.id];
  if (guildSettings && guildSettings.automod && guildSettings.automod.antighostping && msg._hasMention) {
    const modlog = guildSettings.modlog && msg.guild.channels.cache.get(guildSettings.modlog);
    if (modlog) await modlog.send({ embeds: [{
      title: '👻 Ghost Ping Detected',
      description: `Author: <@${msg.author?.id}>\nMentioned: ${[...msg.mentions.users.values()].map(u => `<@${u.id}>`).join(', ')}\nContent: ${msg.content || '(empty)'}`,
      color: 0xED4245,
      author: { name: msg.author?.tag || 'Unknown', icon_url: msg.author?.displayAvatarURL() || '' },
      footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
      timestamp: new Date().toISOString()
    }] });
  }
});

// Anti-raid: detect 5+ joins in 10 seconds
let recentJoins = {};
client.on('guildMemberAdd', async member => {
  const guildSettings = settings.guilds[member.guild.id];
  if (guildSettings && guildSettings.automod && guildSettings.automod.antiraid) {
    const now = Date.now();
    if (!recentJoins[member.guild.id]) recentJoins[member.guild.id] = [];
    recentJoins[member.guild.id] = recentJoins[member.guild.id].filter(t => now - t < 10000);
    recentJoins[member.guild.id].push(now);
    if (recentJoins[member.guild.id].length >= 5) {
      // Take action: alert modlog and kick recent joiners
      const modlog = guildSettings.modlog && member.guild.channels.cache.get(guildSettings.modlog);
      if (modlog) await modlog.send({ embeds: [{
        title: '🚨 Raid Detected',
        description: `5+ members joined in 10 seconds. Kicking recent joiners for safety.`,
        color: 0xED4245,
        footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }] });
      for (const joinTime of recentJoins[member.guild.id]) {
        const joiner = member.guild.members.cache.find(m => m.joinedTimestamp && Math.abs(m.joinedTimestamp - joinTime) < 5000);
        if (joiner && !joiner.user.bot) {
          try { await joiner.kick('Anti-raid: mass join detected'); } catch {}
        }
      }
      recentJoins[member.guild.id] = [];
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
           author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() },
           thumbnail: { url: member.user.displayAvatarURL() },
           footer: { text: `Welcome to ${member.guild.name} • ${new Date().toLocaleDateString()}` },
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
           author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() },
           thumbnail: { url: member.user.displayAvatarURL() },
           footer: { text: `Farewell from ${member.guild.name} • ${new Date().toLocaleDateString()}` },
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
           author: { name: oldMsg.author.tag, icon_url: oldMsg.author.displayAvatarURL() },
           thumbnail: { url: oldMsg.author.displayAvatarURL() },
           footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
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
           author: { name: msg.author?.tag || 'Unknown', icon_url: msg.author?.displayAvatarURL() || '' },
           thumbnail: { url: msg.author?.displayAvatarURL() || '' },
           footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
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
           author: { name: newMember.user.tag, icon_url: newMember.user.displayAvatarURL() },
           thumbnail: { url: newMember.user.displayAvatarURL() },
           footer: { text: `Subside Bot • ${new Date().toLocaleDateString()}` },
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
      let imageBuffer = null;
      if (guildSettings.welcomeImage) {
        // Generate welcome image
        const width = 700, height = 250;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        // Background
        try {
          const bg = await loadImage(guildSettings.welcomeImage);
          ctx.drawImage(bg, 0, 0, width, height);
        } catch {
          ctx.fillStyle = '#23272A';
          ctx.fillRect(0, 0, width, height);
        }
        // Draw avatar
        try {
          const avatar = await loadImage(member.user.displayAvatarURL({ extension: 'png', size: 128 }));
          ctx.save();
          ctx.beginPath();
          ctx.arc(125, 125, 80, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(avatar, 45, 45, 160, 160);
          ctx.restore();
        } catch {}
        // Draw text
        ctx.font = 'bold 36px Sans';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('Welcome', 400, 90);
        ctx.font = '28px Sans';
        ctx.fillText(member.user.tag, 400, 150);
        ctx.font = '22px Sans';
        ctx.fillText(`to ${member.guild.name}!`, 400, 200);
        imageBuffer = canvas.toBuffer();
      }
      await channel.send({
        embeds: [{
           title: '👋 Welcome!',
           description: msg,
           color: 0x57F287,
           author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() },
           thumbnail: { url: member.user.displayAvatarURL() },
           image: guildSettings.welcomeImage ? { url: 'attachment://welcome.png' } : undefined,
           footer: { text: `Welcome to ${member.guild.name} • ${new Date().toLocaleDateString()}` },
           timestamp: new Date().toISOString()
        }],
        files: imageBuffer ? [{ attachment: imageBuffer, name: 'welcome.png' }] : []
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
           color: 0xED4245,
           author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() },
           thumbnail: { url: member.user.displayAvatarURL() },
           footer: { text: `Farewell from ${member.guild.name} • ${new Date().toLocaleDateString()}` },
           timestamp: new Date().toISOString()
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
