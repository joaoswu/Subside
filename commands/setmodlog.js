const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setmodlog')
    .setDescription('Set the moderation log channel')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel for moderation logs')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client, { settings, saveSettings }) {
    const channel = interaction.options.getChannel('channel');
    if (!channel || channel.type !== 0) {
      return interaction.reply({ content: 'Please select a valid text channel.', ephemeral: true });
    }
    if (!settings.guilds[interaction.guild.id]) settings.guilds[interaction.guild.id] = {};
    settings.guilds[interaction.guild.id].modlog = channel.id;
    saveSettings();
    await interaction.reply({
      embeds: [{
        title: '📝 Mod Log Channel Set',
        description: `Moderation actions will be logged in ${channel}.`,
        color: 0x57F287
      }],
      ephemeral: true
    });
  }
};
