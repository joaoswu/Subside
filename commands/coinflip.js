const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin!'),
  async execute(interaction) {
    const result = Math.random() < 0.5 ? '🪙 Heads' : '🪙 Tails';
    await interaction.reply({
      embeds: [{
        title: '🪙 Coin Flip',
        description: `The coin landed on **${result}**!`,
        color: 0xFEE75C,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
        footer: { text: `Subside Bot • Coinflip • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }]
    });
  }
};
