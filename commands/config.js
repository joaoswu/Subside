const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Show and update server configuration')
    .addStringOption(option =>
      option.setName('key')
        .setDescription('Config key to update (optional)'))
    .addStringOption(option =>
      option.setName('value')
        .setDescription('New value (optional)'))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client, { settings, saveSettings }) {
    const key = interaction.options.getString('key');
    const value = interaction.options.getString('value');
    const guildId = interaction.guild.id;
    if (!settings.guilds[guildId]) settings.guilds[guildId] = {};
    if (key && value) {
      settings.guilds[guildId][key] = value;
      saveSettings();
      return interaction.reply({
        embeds: [{
          title: '⚙️ Config Updated',
            description: `Set \`${key}\` to \`${value}\` for this server.`,
          color: 0x57F287
        }],
        ephemeral: true
      });
    }
    // Show all config
    await interaction.reply({
      embeds: [{
        title: '⚙️ Server Configuration',
        description: Object.entries(settings.guilds[guildId]).map(([k, v]) => `**${k}:** ${typeof v === 'object' ? JSON.stringify(v) : v}`).join('\n') || 'No config set.',
        color: 0x5865F2
      }],
      ephemeral: true
    });
  }
};
