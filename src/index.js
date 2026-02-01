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
  try {
    await command.execute(interaction, client, { logModeration, settings, saveSettings });
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
