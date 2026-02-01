const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Get a random meme'),
  async execute(interaction) {
    try {
      const res = await fetch('https://meme-api.com/gimme');
      const data = await res.json();
      await interaction.reply({
        embeds: [{
          title: `😂 Meme Time!`,
          description: `From: [${data.subreddit}](https://reddit.com/r/${data.subreddit}) | 👍 ${data.ups || 0}`,
          image: { url: data.url },
          url: data.postLink || undefined,
          color: 0x5865F2,
          footer: { text: 'Enjoy your meme! 😎' }
        }]
      });
    } catch {
      await interaction.reply({ content: 'Could not fetch meme.', ephemeral: true });
    }
  }
};
