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
        footer: { text: 'Try your luck!' }
      }]
    });
  }
};
