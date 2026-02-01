const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setautomod')
    .setDescription('Configure auto-moderation settings')
    .addBooleanOption(option =>
      option.setName('antispam')
        .setDescription('Enable anti-spam'))
    .addBooleanOption(option =>
      option.setName('antilink')
        .setDescription('Enable anti-link'))
    .addStringOption(option =>
      option.setName('blacklist')
        .setDescription('Comma-separated list of banned words'))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client, { settings, saveSettings }) {
    const antispam = interaction.options.getBoolean('antispam');
    const antilink = interaction.options.getBoolean('antilink');
    const blacklist = interaction.options.getString('blacklist');
    if (!settings.guilds[interaction.guild.id]) settings.guilds[interaction.guild.id] = {};
    if (!settings.guilds[interaction.guild.id].automod) settings.guilds[interaction.guild.id].automod = {};
    if (antispam !== null) settings.guilds[interaction.guild.id].automod.antispam = antispam;
    if (antilink !== null) settings.guilds[interaction.guild.id].automod.antilink = antilink;
    if (blacklist) settings.guilds[interaction.guild.id].automod.blacklist = blacklist.split(',').map(w => w.trim().toLowerCase());
    saveSettings();
    await interaction.reply({
      embeds: [{
        title: '🛡️ Auto-Moderation Settings Updated',
        description: `Anti-spam: ${antispam !== null ? antispam : 'unchanged'}\nAnti-link: ${antilink !== null ? antilink : 'unchanged'}\nBlacklist: ${blacklist ? blacklist : 'unchanged'}`,
        color: 0x57F287
      }],
      ephemeral: true
    });
  }
};
