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
        footer: { text: 'Ping Command' }
      }],
      content: ''
    });
  }
};
