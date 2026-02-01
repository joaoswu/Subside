const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Get a random cat picture'),
  async execute(interaction) {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await res.json();
      await interaction.reply({
        embeds: [{
          title: '🐱 Meow! Here\'s a cat:',
          color: 0xFEE75C,
          author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
          thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
          image: { url: data[0].url },
          footer: { text: `Subside Bot • Cat • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }]
      });
    } catch {
      await interaction.reply({ content: 'Could not fetch cat image.', ephemeral: true });
    }
  }
};
