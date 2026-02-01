const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Get a random joke'),
  async execute(interaction) {
    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await res.json();
      await interaction.reply({
        embeds: [{
          title: '🤣 Here’s a joke:',
          description: `**${data.setup}**\n||${data.punchline}||`,
          color: 0x57F287,
          footer: { text: 'Powered by Official Joke API' }
        }]
      });
    } catch {
      await interaction.reply({ content: 'Could not fetch joke.', ephemeral: true });
    }
  }
};
