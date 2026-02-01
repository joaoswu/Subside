const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Get a random dog picture'),
  async execute(interaction) {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      await interaction.reply({
        embeds: [{
          title: '🐶 Woof! Here\'s a dog:',
          color: 0xFEE75C,
          author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
          thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
          image: { url: data.message },
          footer: { text: `Subside Bot • Dog • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }]
      });
    } catch {
      await interaction.reply({ content: 'Could not fetch dog image.', ephemeral: true });
    }
  }
};
