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
    .addBooleanOption(option =>
      option.setName('antiraid')
        .setDescription('Enable anti-raid'))
    .addBooleanOption(option =>
      option.setName('antighostping')
        .setDescription('Enable anti-ghost ping'))
    .addBooleanOption(option =>
      option.setName('antinsfw')
        .setDescription('Enable anti-NSFW'))
    .addStringOption(option =>
      option.setName('blacklist')
        .setDescription('Comma-separated list of banned words'))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client, { settings, saveSettings }) {
    const antispam = interaction.options.getBoolean('antispam');
    const antilink = interaction.options.getBoolean('antilink');
    const antiraid = interaction.options.getBoolean('antiraid');
    const antighostping = interaction.options.getBoolean('antighostping');
    const antinsfw = interaction.options.getBoolean('antinsfw');
    const blacklist = interaction.options.getString('blacklist');
    if (!settings.guilds[interaction.guild.id]) settings.guilds[interaction.guild.id] = {};
    if (!settings.guilds[interaction.guild.id].automod) settings.guilds[interaction.guild.id].automod = {};
    if (antispam !== null) settings.guilds[interaction.guild.id].automod.antispam = antispam;
    if (antilink !== null) settings.guilds[interaction.guild.id].automod.antilink = antilink;
    if (antiraid !== null) settings.guilds[interaction.guild.id].automod.antiraid = antiraid;
    if (antighostping !== null) settings.guilds[interaction.guild.id].automod.antighostping = antighostping;
    if (antinsfw !== null) settings.guilds[interaction.guild.id].automod.antinsfw = antinsfw;
    if (blacklist) settings.guilds[interaction.guild.id].automod.blacklist = blacklist.split(',').map(w => w.trim().toLowerCase());
    saveSettings();
    await interaction.reply({
      embeds: [{
        title: '🛡️ Auto-Moderation Settings Updated',
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: interaction.user.displayAvatarURL() },
        fields: [
          { name: 'Anti-spam', value: antispam !== null ? String(antispam) : 'unchanged', inline: true },
          { name: 'Anti-link', value: antilink !== null ? String(antilink) : 'unchanged', inline: true },
          { name: 'Anti-raid', value: antiraid !== null ? String(antiraid) : 'unchanged', inline: true },
          { name: 'Anti-ghost ping', value: antighostping !== null ? String(antighostping) : 'unchanged', inline: true },
          { name: 'Anti-NSFW', value: antinsfw !== null ? String(antinsfw) : 'unchanged', inline: true },
          { name: 'Blacklist', value: blacklist ? blacklist : 'unchanged', inline: false }
        ],
        footer: { text: `Subside Bot • AutoMod • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
