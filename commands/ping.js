const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot\'s latency'),
  async execute(interaction, client) {
    const sent = await interaction.reply({ content: '🏓 Pinging...', fetchReply: true });
    await interaction.editReply({
      embeds: [{
        title: '🏓 Pong!',
        description: `Latency: **${sent.createdTimestamp - interaction.createdTimestamp}ms**\nAPI Latency: **${Math.round(client.ws.ping)}ms**`,
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
        footer: { text: `Subside Bot • Ping • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      content: ''
    });
  }
};
