const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setwelcomeimage')
    .setDescription('Set a custom welcome image background URL for this server')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('Image URL (must be a direct link to an image)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const url = interaction.options.getString('url');
    if (!url.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i)) {
      return interaction.reply({ content: 'Invalid image URL. Must be a direct link to a .jpg, .jpeg, .png, or .webp file.', ephemeral: true });
    }
    const settingsPath = './src/settings.json';
    let settings = { guilds: {} };
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    }
    if (!settings.guilds[interaction.guild.id]) settings.guilds[interaction.guild.id] = {};
    settings.guilds[interaction.guild.id].welcomeImage = url;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    await interaction.reply({
      embeds: [{
        title: '🖼️ Welcome Image Set',
        description: `Welcome image background set for this server.`,
        image: { url },
        color: 0x57F287,
        footer: { text: `Subside Bot • Welcome Images • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
