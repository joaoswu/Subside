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
          color: 0x57F287,
          author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
          thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
          description: `**${data.setup}**\n||${data.punchline}||`,
          footer: { text: `Subside Bot • Joke • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }]
      });
    } catch {
      await interaction.reply({ content: 'Could not fetch joke.', ephemeral: true });
    }
  }
};
