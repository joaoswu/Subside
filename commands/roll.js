const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll a dice (1-6)'),
  async execute(interaction) {
    const roll = Math.floor(Math.random() * 6) + 1;
    await interaction.reply({
      embeds: [{
        title: '🎲 Dice Roll',
        description: `You rolled a **${roll}**!`,
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
        footer: { text: `Subside Bot • Roll • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }]
    });
  }
};
