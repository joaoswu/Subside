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
          image: { url: data.message },
          color: 0xFEE75C,
          footer: { text: 'Dog API' }
        }]
      });
    } catch {
      await interaction.reply({ content: 'Could not fetch dog image.', ephemeral: true });
    }
  }
};
