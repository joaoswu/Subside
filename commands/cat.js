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
          image: { url: data[0].url },
          color: 0xFEE75C,
          footer: { text: 'Cat API' }
        }]
      });
    } catch {
      await interaction.reply({ content: 'Could not fetch cat image.', ephemeral: true });
    }
  }
};
