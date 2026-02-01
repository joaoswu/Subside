const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('About this bot'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [{
        title: '🤖 About This Bot',
        description: 'A multipurpose moderation and fun Discord bot made by Joao!\n\nFeatures moderation, fun, and utility commands. Built with discord.js.',
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png' },
        footer: { text: `Subside Bot • About • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }]
    });
  }
};
