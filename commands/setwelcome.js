const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setwelcome')
    .setDescription('Set the welcome channel and message')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel for welcome messages')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Welcome message, use {user} for mention')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client, { settings, saveSettings }) {
    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message');
    if (!channel || channel.type !== 0) {
      return interaction.reply({ content: 'Please select a valid text channel.', ephemeral: true });
    }
    if (!settings.guilds[interaction.guild.id]) settings.guilds[interaction.guild.id] = {};
    settings.guilds[interaction.guild.id].welcome = { channel: channel.id, message };
    saveSettings();
    await interaction.reply({
      embeds: [{
        title: '👋 Welcome Message Set',
        description: `Welcome messages will be sent in ${channel} with the message:\n> ${message}`,
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: interaction.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Welcome • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
