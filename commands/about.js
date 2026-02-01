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
        footer: { text: 'Thanks for using the bot!' }
      }]
    });
  }
};
