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
          color: 0x5865F2,
          author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
          thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
          description: `From: [${data.subreddit}](https://reddit.com/r/${data.subreddit}) | 👍 ${data.ups || 0}`,
          image: { url: data.url },
          url: data.postLink || undefined,
          footer: { text: `Subside Bot • Meme • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }]
      });
    } catch {
      await interaction.reply({ content: 'Could not fetch meme.', ephemeral: true });
    }
  }
};
