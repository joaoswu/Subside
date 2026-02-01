const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vanity')
    .setDescription('Show your Discord tag and ID'),
  async execute(interaction) {
    const user = interaction.user;
    await interaction.reply({
      embeds: [{
        title: '🪪 Your Discord Info',
        description: `Tag: **${user.tag}**\nID: **${user.id}**`,
        color: 0x5865F2,
        footer: { text: 'User Vanity' }
      }]
    });
  }
};
